from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field
import datetime

# --- Auth Schemas ---
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    name: Optional[str] = "Patient"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# --- Patient Profile Schemas ---
class PatientProfileBase(BaseModel):
    name: str
    age: Optional[int] = 52
    gender: Optional[str] = "Male"
    blood_group: Optional[str] = "B+"
    abha_id: Optional[str] = "DEMO-ABHA-001"
    abha_address: Optional[str] = "demo.patient@abdm"
    abha_status: Optional[str] = "Demo / Mock ABHA ID"
    emergency_contact: Optional[str] = None
    primary_physician: Optional[str] = None
    allergies: Optional[str] = None

class PatientProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    emergency_contact: Optional[str] = None
    primary_physician: Optional[str] = None
    allergies: Optional[str] = None

class PatientProfileResponse(PatientProfileBase):
    id: int
    email: Optional[str] = None
    
    class Config:
        from_attributes = True

# --- Lab Result Schemas ---
class LabResultBase(BaseModel):
    test_name: str
    value: float
    value_display: Optional[str] = None
    unit: str
    reference_range: str
    status: str = "normal"
    confidence: float = 95.0
    note: Optional[str] = None
    test_date: Optional[str] = None

class LabResultResponse(LabResultBase):
    id: int
    source_report_id: Optional[int] = None
    
    class Config:
        from_attributes = True

# --- Medication Schemas ---
class MedicationBase(BaseModel):
    name: str
    dosage: str
    frequency: str
    timing: Optional[str] = "With food"
    duration: Optional[str] = "Ongoing"
    indication: Optional[str] = None
    status: str = "Active"
    prescribed_date: Optional[str] = None
    doctor_name: Optional[str] = None
    confidence: float = 98.0

class MedicationResponse(MedicationBase):
    id: int
    source_report_id: Optional[int] = None
    
    class Config:
        from_attributes = True

# --- Medical Report Schemas ---
class MedicalReportResponse(BaseModel):
    id: int
    file_name: str
    document_type: str
    facility: str
    doctor_name: Optional[str] = None
    report_date: Optional[str] = None
    upload_date: datetime.datetime
    ocr_confidence: float
    extraction_confidence: float
    summary: Optional[str] = None
    what_this_means: Optional[str] = None
    processing_status: str
    test_results: List[LabResultResponse] = []
    medications: List[MedicationResponse] = []
    
    class Config:
        from_attributes = True

# --- Timeline Event Schemas ---
class TimelineEventResponse(BaseModel):
    id: int
    title: str
    category: str
    event_date: str
    facility: str
    badge: str
    highlights: List[str] = []
    report_id: Optional[int] = None

# --- Dashboard Response Schema ---
class DashboardResponse(BaseModel):
    patient: dict
    greeting: str
    total_reports: int
    total_lab_results: int
    lab_results_attention: int
    total_medications: int
    active_medications: int
    timeline_events: int
    health_trends_count: int
    latest_report: Optional[dict] = None
    latest_lab_results: List[dict] = []
    insights: List[dict] = []

# --- What Changed (Compare) Request & Response ---
class CompareRequest(BaseModel):
    previous_report_id: int
    latest_report_id: int

class CompareItem(BaseModel):
    parameter: str
    unit: str
    prev: Any
    latest: Any
    change: str
    direction: str
    severity: str
    detail: str

class CompareResponse(BaseModel):
    previous_report: dict
    latest_report: dict
    items: List[CompareItem]
    disclaimer: str

# --- AI Chat Request & Response ---
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    reply: str
    sources: List[dict] = []
    can_view_evidence: bool = False
    evidence_param: Optional[str] = None
    language: str = "en"

# --- Doctor Visit Preparation Response ---
class DoctorSummaryResponse(BaseModel):
    patient_name: str
    generated_date: str
    recent_changes: List[dict]
    current_medications: List[dict]
    questions_to_discuss: List[str]
    relevant_records: List[dict]
    disclaimer: str
