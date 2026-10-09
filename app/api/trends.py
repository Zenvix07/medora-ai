from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, LabResult
from .deps import get_current_patient

router = APIRouter(prefix="/trends", tags=["Health Trends"])

@router.get("/{test_name}")
def get_biomarker_trend(
    test_name: str,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    # Lookup by test_name (case-insensitive fuzzy match)
    query_term = test_name.strip()
    results = db.query(LabResult).filter(
        LabResult.patient_id == patient.id,
        LabResult.test_name.ilike(f"%{query_term}%")
    ).order_by(LabResult.id.asc()).all()

    if not results:
        # Check standard common aliases
        aliases = {
            "glucose": "Fasting Blood Glucose",
            "vitamind": "Vitamin D (25-OH)",
            "cholesterol": "Total Cholesterol",
            "bloodpressure": "Blood Pressure",
            "bp": "Blood Pressure"
        }
        alt = aliases.get(query_term.lower().replace(" ", "").replace("-", ""))
        if alt:
            results = db.query(LabResult).filter(
                LabResult.patient_id == patient.id,
                LabResult.test_name.ilike(f"%{alt}%")
            ).order_by(LabResult.id.asc()).all()

    if not results:
        raise HTTPException(
            status_code=404,
            detail=f"No recorded historical values found for '{test_name}'."
        )

    first_item = results[0]
    data_points = []
    for r in results:
        data_points.append({
            "month": r.test_date or "Recorded",
            "value": r.value,
            "fullDate": r.test_date or "Recorded Date",
            "status": "Within Normal Bounds" if r.status == "normal" else ("Below Reference Range" if r.status == "low" else "Above Reference Range")
        })

    return {
        "name": first_item.test_name,
        "test_name": first_item.test_name,
        "unit": first_item.unit,
        "refRange": first_item.reference_range,
        "minSafe": first_item.min_safe,
        "maxSafe": first_item.max_safe,
        "description": first_item.note or f"Chronological tracking for {first_item.test_name}",
        "data": data_points
    }
