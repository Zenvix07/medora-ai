from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import decode_access_token
from ..models.models import User, PatientProfile

security = HTTPBearer(auto_error=False)

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Extracts authenticated user from Bearer JWT token.
    If no token is supplied, falls back to the default demo user for seamless hackathon convenience.
    """
    if credentials:
        token = credentials.credentials
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            user_id = payload["sub"]
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user:
                return user

    # Fallback to demo user if unauthenticated
    demo_user = db.query(User).filter(User.email == "demo@medjourney.ai").first()
    if demo_user:
        return demo_user

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

def get_current_patient(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> PatientProfile:
    patient = db.query(PatientProfile).filter(PatientProfile.user_id == current_user.id).first()
    if not patient:
        patient = PatientProfile(user_id=current_user.id, name="Patient")
        db.add(patient)
        db.commit()
        db.refresh(patient)
    return patient
