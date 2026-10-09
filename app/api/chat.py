import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, MedicalReport, LabResult, Medication, ChatMessage
from ..schemas.schemas import ChatRequest
from ..services.ai_service import answer_copilot_chat
from .deps import get_current_patient

router = APIRouter(prefix="/chat", tags=["AI Copilot Chat"])

@router.post("")
def chat_with_copilot(
    payload: ChatRequest,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    # 1. Fetch patient's actual stored database records
    reports = db.query(MedicalReport).filter(
        MedicalReport.patient_id == patient.id
    ).order_by(MedicalReport.created_at.desc()).all()

    labs = db.query(LabResult).filter(
        LabResult.patient_id == patient.id
    ).order_by(LabResult.created_at.desc()).all()

    meds = db.query(Medication).filter(
        Medication.patient_id == patient.id
    ).all()

    reports_data = [
        {"id": r.id, "document_type": r.document_type, "report_date": r.report_date, "facility": r.facility}
        for r in reports
    ]
    labs_data = [
        {"test_name": l.test_name, "value": l.value, "unit": l.unit, "reference_range": l.reference_range, "status": l.status}
        for l in labs
    ]
    meds_data = [
        {"name": m.name, "dosage": m.dosage, "frequency": m.frequency, "status": m.status, "timing": m.timing}
        for m in meds
    ]

    # 2. Record User Message
    user_msg = ChatMessage(
        patient_id=patient.id,
        sender="user",
        message_text=payload.message,
        language=payload.language or "en"
    )
    db.add(user_msg)
    db.flush()

    # 3. Generate grounded answer
    res = answer_copilot_chat(
        message=payload.message,
        patient_name=patient.name,
        stored_reports=reports_data,
        stored_labs=labs_data,
        stored_meds=meds_data,
        language=payload.language or "en"
    )

    # 4. Record Assistant Response
    bot_msg = ChatMessage(
        patient_id=patient.id,
        sender="assistant",
        message_text=res.get("reply", ""),
        language=res.get("language", "en"),
        sources_json=json.dumps(res.get("sources", [])),
        can_view_evidence=res.get("can_view_evidence", False),
        evidence_param=res.get("evidence_param")
    )
    db.add(bot_msg)
    db.commit()

    return res
