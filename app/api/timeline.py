import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, TimelineEvent
from .deps import get_current_patient

router = APIRouter(prefix="/timeline", tags=["Health Timeline"])

@router.get("")
def get_health_timeline(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    events = db.query(TimelineEvent).filter(
        TimelineEvent.patient_id == patient.id
    ).order_by(TimelineEvent.created_at.desc()).all()

    result = []
    for e in events:
        try:
            highlights = json.loads(e.highlights_json) if e.highlights_json else []
        except Exception:
            highlights = []

        result.append({
            "id": f"tl-{e.id}",
            "date": e.event_date,
            "category": e.category,
            "title": e.title,
            "facility": e.facility,
            "badge": e.badge,
            "highlights": highlights,
            "documentId": f"rep-{e.report_id}" if e.report_id else "rep-1"
        })
    return result
