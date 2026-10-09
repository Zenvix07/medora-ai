from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, MedicalReport, LabResult, Medication
from ..schemas.schemas import CompareRequest
from .deps import get_current_patient

router = APIRouter(prefix="/compare", tags=["Comparison"])

@router.post("")
def compare_reports(
    payload: CompareRequest,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    prev_id = payload.previous_report_id
    latest_id = payload.latest_report_id

    rep_prev = db.query(MedicalReport).filter(
        MedicalReport.id == prev_id,
        MedicalReport.patient_id == patient.id
    ).first()

    rep_latest = db.query(MedicalReport).filter(
        MedicalReport.id == latest_id,
        MedicalReport.patient_id == patient.id
    ).first()

    if not rep_prev or not rep_latest:
        # Fallback to the two most recent reports if specific IDs not found
        reports = db.query(MedicalReport).filter(
            MedicalReport.patient_id == patient.id
        ).order_by(MedicalReport.created_at.desc()).limit(2).all()
        if len(reports) >= 2:
            rep_latest, rep_prev = reports[0], reports[1]
        elif len(reports) == 1:
            rep_latest, rep_prev = reports[0], reports[0]
        else:
            raise HTTPException(status_code=404, detail="Insufficient reports for comparison.")

    labs_prev = db.query(LabResult).filter(LabResult.report_id == rep_prev.id).all()
    labs_latest = db.query(LabResult).filter(LabResult.report_id == rep_latest.id).all()

    prev_map = {l.test_name.lower(): l for l in labs_prev}
    items = []

    for l_new in labs_latest:
        key = l_new.test_name.lower()
        if key in prev_map:
            l_old = prev_map[key]
            diff = round(l_new.value - l_old.value, 2)
            if diff < 0:
                direction = "down"
                change_text = "Decreased"
                severity = "warning" if "hemo" in key or "vit" in key else "positive"
            elif diff > 0:
                direction = "up"
                change_text = "Increased"
                severity = "alert" if "gluc" in key or "chol" in key else "positive"
            else:
                direction = "stable"
                change_text = "Stable"
                severity = "neutral"

            diff_str = f"+{diff}" if diff > 0 else f"{diff}"
            items.append({
                "parameter": l_new.test_name,
                "unit": l_new.unit,
                "prev": l_old.value,
                "latest": l_new.value,
                "change": change_text,
                "direction": direction,
                "severity": severity,
                "icon": "Droplet" if "hemo" in key else ("Sun" if "vit" in key else ("Activity" if "gluc" in key else "Heart")),
                "detail": f"Shift of {diff_str} {l_new.unit} between reports."
            })

    # Check medications present in both
    meds_prev = db.query(Medication).filter(Medication.report_id == rep_prev.id).all()
    meds_latest = db.query(Medication).filter(Medication.report_id == rep_latest.id).all()
    latest_med_names = {m.name.lower() for m in meds_latest}

    for m in meds_prev:
        if m.name.lower() in latest_med_names:
            items.append({
                "parameter": f"{m.name} {m.dosage}",
                "unit": "Prescription",
                "prev": "Present",
                "latest": "Present",
                "change": "Present in both records",
                "direction": "stable",
                "severity": "neutral",
                "icon": "Pill",
                "detail": f"Active medication continuing across cycles."
            })

    return {
        "previous_report": {
            "id": f"rep-{rep_prev.id}",
            "title": f"{rep_prev.report_date or 'Previous'} ({rep_prev.facility})",
            "date": rep_prev.report_date
        },
        "latest_report": {
            "id": f"rep-{rep_latest.id}",
            "title": f"{rep_latest.report_date or 'Latest'} ({rep_latest.facility})",
            "date": rep_latest.report_date
        },
        "items": items,
        "disclaimer": "AI comparison is based only on the information available in your uploaded records."
    }
