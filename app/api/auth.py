from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import hash_password, verify_password, create_access_token
from ..models.models import User, PatientProfile
from ..schemas.schemas import UserRegister, UserLogin, TokenResponse
from .deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register_user(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    user = User(
        email=data.email,
        hashed_password=hash_password(data.password),
        is_active=True
    )
    db.add(user)
    db.flush()

    patient = PatientProfile(
        user_id=user.id,
        name=data.name or "Patient",
        abha_id=f"ABHA-{user.id:04d}-DEMO",
        abha_address=f"{data.email.split('@')[0]}@abdm",
        abha_status="Demo / Mock ABHA ID"
    )
    db.add(patient)
    db.commit()

    token = create_access_token(user.id)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": patient.name
        }
    }

@router.post("/login", response_model=TokenResponse)
def login_user(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_access_token(user.id)
    patient = user.patient_profile
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": patient.name if patient else "Patient"
        }
    }

@router.get("/me")
def get_current_user_profile(user: User = Depends(get_current_user)):
    patient = user.patient_profile
    return {
        "id": user.id,
        "email": user.email,
        "name": patient.name if patient else "Patient",
        "abha_id": patient.abha_id if patient else None
    }
