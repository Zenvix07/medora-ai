import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from ..core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    patient_profile = relationship("PatientProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

class PatientProfile(Base):
    __tablename__ = "patient_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    name = Column(String(255), default="Demo Patient")
    age = Column(Integer, default=52)
    gender = Column(String(50), default="Male")
    blood_group = Column(String(20), default="B+")
    abha_id = Column(String(100), default="DEMO-ABHA-001")
    abha_address = Column(String(100), default="demo.patient@abdm")
    abha_status = Column(String(100), default="Demo / Mock ABHA ID")
    emergency_contact = Column(String(255), default="Emergency Contact - +91 98201 XXXXX")
    primary_physician = Column(String(255), default="Dr. Ananya Sen, MD")
    allergies = Column(Text, default="Penicillin, Sulfa drugs")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="patient_profile")
    reports = relationship("MedicalReport", back_populates="patient", cascade="all, delete-orphan", order_by="desc(MedicalReport.created_at)")
    lab_results = relationship("LabResult", back_populates="patient", cascade="all, delete-orphan")
    medications = relationship("Medication", back_populates="patient", cascade="all, delete-orphan")
    timeline_events = relationship("TimelineEvent", back_populates="patient", cascade="all, delete-orphan", order_by="desc(TimelineEvent.event_date)")
    chat_messages = relationship("ChatMessage", back_populates="patient", cascade="all, delete-orphan", order_by="ChatMessage.timestamp")

class MedicalReport(Base):
    __tablename__ = "medical_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_size = Column(Integer, default=0)
    mime_type = Column(String(100), default="application/pdf")
    document_type = Column(String(100), default="Lab Report")
    facility = Column(String(255), default="Medical Diagnostic Laboratory")
    doctor_name = Column(String(255), nullable=True)
    report_date = Column(String(50), nullable=True)
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)
    raw_ocr_text = Column(Text, nullable=True)
    ocr_confidence = Column(Float, default=95.0)
    extraction_confidence = Column(Float, default=95.0)
    summary = Column(Text, nullable=True)
    what_this_means = Column(Text, nullable=True)
    processing_status = Column(String(50), default="completed")  # pending, processing, completed, error
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    patient = relationship("PatientProfile", back_populates="reports")
    lab_results = relationship("LabResult", back_populates="report", cascade="all, delete-orphan")
    medications = relationship("Medication", back_populates="report", cascade="all, delete-orphan")
    timeline_events = relationship("TimelineEvent", back_populates="report")

class LabResult(Base):
    __tablename__ = "lab_results"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("medical_reports.id", ondelete="CASCADE"), nullable=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False)
    test_name = Column(String(255), index=True, nullable=False)
    value = Column(Float, nullable=False)
    value_display = Column(String(100), nullable=True)
    unit = Column(String(50), default="")
    reference_range = Column(String(100), default="")
    min_safe = Column(Float, nullable=True)
    max_safe = Column(Float, nullable=True)
    status = Column(String(50), default="normal")  # normal, low, high, attention
    confidence = Column(Float, default=95.0)
    note = Column(String(255), nullable=True)
    test_date = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    report = relationship("MedicalReport", back_populates="lab_results")
    patient = relationship("PatientProfile", back_populates="lab_results")

class Medication(Base):
    __tablename__ = "medications"
    
    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(Integer, ForeignKey("medical_reports.id", ondelete="CASCADE"), nullable=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    dosage = Column(String(100), default="")
    frequency = Column(String(100), default="Once daily")
    timing = Column(String(100), default="With food")
    duration = Column(String(100), default="Ongoing")
    indication = Column(String(255), default="General maintenance")
    status = Column(String(50), default="Active")  # Active, Completed, Past
    prescribed_date = Column(String(50), nullable=True)
    doctor_name = Column(String(255), nullable=True)
    confidence = Column(Float, default=98.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    report = relationship("MedicalReport", back_populates="medications")
    patient = relationship("PatientProfile", back_populates="medications")

class TimelineEvent(Base):
    __tablename__ = "timeline_events"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False)
    report_id = Column(Integer, ForeignKey("medical_reports.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Lab Report")  # Lab Report, Prescription, Diagnostic Scan
    event_date = Column(String(50), nullable=False)
    facility = Column(String(255), default="")
    badge = Column(String(100), default="")
    highlights_json = Column(Text, default="[]")  # JSON encoded list of strings
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    patient = relationship("PatientProfile", back_populates="timeline_events")
    report = relationship("MedicalReport", back_populates="timeline_events")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patient_profiles.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(50), nullable=False)  # user, assistant
    message_text = Column(Text, nullable=False)
    language = Column(String(20), default="en")
    sources_json = Column(Text, default="[]")  # JSON encoded list of source objects
    can_view_evidence = Column(Boolean, default=False)
    evidence_param = Column(String(100), nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    patient = relationship("PatientProfile", back_populates="chat_messages")
