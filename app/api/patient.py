from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile
from ..schemas.schemas import PatientProfileUpdate
from .deps import get_current_patient

router = APIRouter(prefix="/patient", tags=["Patient Profile"])

@router.get("")
def get_patient_profile(patient: PatientProfile = Depends(get_current_patient)):
    allergies_list = [a.strip() for a in (patient.allergies or "").split(",") if a.strip()]
    return {
        "id": patient.id,
        "name": patient.name,
        "email": patient.user.email if patient.user else "demo@medjourney.ai",
        "age": patient.age,
        "gender": patient.gender,
        "blood_group": patient.blood_group,
        "abha_id": patient.abha_id,
        "abha_address": patient.abha_address,
        "abha_status": patient.abha_status or "Demo / Mock ABHA ID",
        "emergency_contact": patient.emergency_contact,
        "primary_physician": patient.primary_physician,
        "allergies": allergies_list
    }

@router.put("")
def update_patient_profile(
    data: PatientProfileUpdate,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    if data.name is not None:
        patient.name = data.name
    if data.age is not None:
        patient.age = data.age
    if data.gender is not None:
        patient.gender = data.gender
    if data.blood_group is not None:
        patient.blood_group = data.blood_group
    if data.emergency_contact is not None:
        patient.emergency_contact = data.emergency_contact
    if data.primary_physician is not None:
        patient.primary_physician = data.primary_physician
    if data.allergies is not None:
        patient.allergies = data.allergies

    db.commit()
    db.refresh(patient)
    return {
        "status": "success",
        "message": "Patient profile updated successfully.",
        "patient": {
            "id": patient.id,
            "name": patient.name,
            "age": patient.age,
            "gender": patient.gender
        }
    }
