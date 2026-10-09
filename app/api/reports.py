from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import PatientProfile, MedicalReport, LabResult
from .deps import get_current_patient

router = APIRouter(prefix="/reports", tags=["Medical Reports"])

@router.get("")
def list_reports(
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    reports = db.query(MedicalReport).filter(
        MedicalReport.patient_id == patient.id
    ).order_by(MedicalReport.created_at.desc()).all()

    result = []
    for r in reports:
        tests = db.query(LabResult).filter(LabResult.report_id == r.id).all()
        result.append({
            "id": f"rep-{r.id}",
            "raw_id": r.id,
            "title": r.file_name,
            "type": r.document_type,
            "date": r.report_date or "Recent",
            "facility": r.facility,
            "doctor": r.doctor_name,
            "ocrConfidence": int(r.ocr_confidence),
            "extractionConfidence": int(r.extraction_confidence),
            "summary": r.summary,
            "whatThisMeans": r.what_this_means,
            "scannedUrl": "/images/medical_report_scan.jpg",
            "testResults": [
                {
                    "id": f"t-{t.id}",
                    "parameter": t.test_name,
                    "value": t.value,
                    "unit": t.unit,
                    "range": t.reference_range,
                    "status": t.status,
                    "confidence": int(t.confidence),
                    "note": t.note
                } for t in tests
            ]
        })
    return result

@router.get("/{report_id}")
def get_report_detail(
    report_id: str,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    clean_id = report_id.replace("rep-", "")
    try:
        numeric_id = int(clean_id)
    except ValueError:
        numeric_id = 1

    r = db.query(MedicalReport).filter(
        MedicalReport.id == numeric_id,
        MedicalReport.patient_id == patient.id
    ).first()

    if not r:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")

    tests = db.query(LabResult).filter(LabResult.report_id == r.id).all()
    return {
        "id": f"rep-{r.id}",
        "title": r.file_name,
        "type": r.document_type,
        "date": r.report_date or "Recent",
        "facility": r.facility,
        "doctor": r.doctor_name,
        "ocrConfidence": int(r.ocr_confidence),
        "extractionConfidence": int(r.extraction_confidence),
        "summary": r.summary,
        "whatThisMeans": r.what_this_means,
        "scannedUrl": "/images/medical_report_scan.jpg",
        "testResults": [
            {
                "id": f"t-{t.id}",
                "parameter": t.test_name,
                "value": t.value,
                "unit": t.unit,
                "range": t.reference_range,
                "status": t.status,
                "confidence": int(t.confidence),
                "note": t.note
            } for t in tests
        ]
    }

@router.delete("/{report_id}")
def delete_report(
    report_id: str,
    patient: PatientProfile = Depends(get_current_patient),
    db: Session = Depends(get_db)
):
    clean_id = report_id.replace("rep-", "")
    try:
        numeric_id = int(clean_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid report ID format")

    r = db.query(MedicalReport).filter(
        MedicalReport.id == numeric_id,
        MedicalReport.patient_id == patient.id
    ).first()

    if not r:
        raise HTTPException(status_code=404, detail="Report not found")

    db.delete(r)
    db.commit()
    return {"status": "success", "message": "Report deleted successfully"}
