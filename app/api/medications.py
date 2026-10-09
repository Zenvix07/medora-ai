from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, Medication
from .deps import get_current_patient

router = APIRouter(prefix="/medications", tags=["Medications"])

@router.get("")
def get_medications_list(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    meds = db.query(Medication).filter(
        Medication.patient_id == patient.id
    ).order_by(Medication.created_at.desc()).all()

    color_palette = ["#0284c7", "#f59e0b", "#10b981", "#6b7280", "#8b5cf6"]

    result = []
    for idx, m in enumerate(meds):
        result.append({
            "id": f"med-{m.id}",
            "name": m.name,
            "dosage": m.dosage,
            "frequency": m.frequency,
            "timing": m.timing,
            "duration": m.duration,
            "status": m.status,
            "sourcePrescription": f"Prescription Slip (Report #{m.report_id})" if m.report_id else "Doctor Consultation",
            "date": m.prescribed_date or "Recent",
            "doctor": m.doctor_name or "Prescribing Physician",
            "indication": m.indication or "Prescribed therapy",
            "confidence": int(m.confidence),
            "color": color_palette[idx % len(color_palette)]
        })
    return result
