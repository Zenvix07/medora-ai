from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, LabResult
from .deps import get_current_patient

router = APIRouter(prefix="/lab-results", tags=["Lab Results"])

@router.get("")
def get_all_lab_results(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    results = db.query(LabResult).filter(
        LabResult.patient_id == patient.id
    ).order_by(LabResult.created_at.desc()).all()

    return [
        {
            "id": f"lab-{r.id}",
            "parameter": r.test_name,
            "test_name": r.test_name,
            "value": r.value,
            "value_display": r.value_display or f"{r.value} {r.unit}",
            "unit": r.unit,
            "range": r.reference_range,
            "reference_range": r.reference_range,
            "status": r.status,
            "confidence": int(r.confidence),
            "note": r.note or (
                "Below the reference range shown on the report." if r.status == "low"
                else ("Above the reference range shown on the report." if r.status == "high" else "Within normal baseline limits.")
            ),
            "date": r.test_date or "Recent",
            "source_report_id": r.report_id
        }
        for r in results
    ]

@router.get("/{result_id}")
def get_single_lab_result(
    result_id: int,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    r = db.query(LabResult).filter(
        LabResult.id == result_id,
        LabResult.patient_id == patient.id
    ).first()

    if not r:
        raise HTTPException(status_code=404, detail="Lab result not found")

    return {
        "id": r.id,
        "test_name": r.test_name,
        "value": r.value,
        "unit": r.unit,
        "reference_range": r.reference_range,
        "status": r.status,
        "date": r.test_date,
        "confidence": r.confidence,
        "source_report_id": r.report_id
    }
