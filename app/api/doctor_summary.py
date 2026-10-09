from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, MedicalReport, LabResult, Medication, TimelineEvent
from .deps import get_current_patient

router = APIRouter(prefix="/doctor-summary", tags=["Doctor Visit Copilot"])

@router.post("")
def generate_doctor_visit_summary(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    # 1. Fetch recent reports
    reports = db.query(MedicalReport).filter(
        MedicalReport.patient_id == patient.id
    ).order_by(MedicalReport.created_at.desc()).limit(3).all()

    # 2. Fetch current medications
    meds = db.query(Medication).filter(
        Medication.patient_id == patient.id,
        Medication.status == "Active"
    ).all()

    # 3. Detect recent changes across latest labs
    labs_attention = db.query(LabResult).filter(
        LabResult.patient_id == patient.id,
        LabResult.status.in_(["low", "high", "below_range", "above_range", "attention"])
    ).order_by(LabResult.created_at.desc()).limit(4).all()

    recent_changes = []
    for l in labs_attention:
        status_wording = "below standard reference bounds" if l.status in ["low", "below_range"] else "above standard fasting limit"
        recent_changes.append({
            "title": f"{l.test_name} Variation",
            "desc": f"Measured at {l.value} {l.unit} ({status_wording}, standard: {l.reference_range})."
        })

    if not recent_changes:
        recent_changes.append({
            "title": "Baseline Stability",
            "desc": "All observed laboratory indicators remain within standard physiological benchmarks."
        })

    current_med_records = [
        {
            "name": m.name,
            "dose": m.dosage,
            "freq": m.frequency,
            "since": m.prescribed_date or "Recorded"
        }
        for m in meds
    ]

    # 4. Formulate Doctor Questions
    questions = [
        f"What could explain the recent values observed in my {l.test_name} levels ({l.value} {l.unit})?"
        for l in labs_attention[:2]
    ]
    if meds:
        questions.append(f"Should my current dosage of {meds[0].name} ({meds[0].dosage}) be reviewed alongside my latest results?")
    questions.append("When should my next routine follow-up diagnostic panel be scheduled?")

    relevant_records = [
        {
            "name": r.file_name,
            "date": r.report_date or "Recent",
            "facility": r.facility
        }
        for r in reports
    ]

    return {
        "patient_name": patient.name,
        "generated_date": datetime.now().strftime("%d %b %Y"),
        "recent_changes": recent_changes,
        "current_medications": current_med_records,
        "questions_to_discuss": questions,
        "relevant_records": relevant_records,
        "disclaimer": "Informational preparation guide synthesized from your uploaded records. Does not provide medical diagnoses or treatment instructions."
    }
