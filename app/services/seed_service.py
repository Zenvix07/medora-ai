import json
from sqlalchemy.orm import Session
from ..models.models import User, PatientProfile, MedicalReport, LabResult, Medication, TimelineEvent
from ..core.security import hash_password

def seed_demo_data_if_empty(db: Session):
    """
    Seeds realistic demo patient records into SQLite if no demo user exists.
    All data is stored in the database, allowing dynamic queries across all endpoints.
    """
    existing_user = db.query(User).filter(User.email == "demo@medjourney.ai").first()
    if existing_user:
        return existing_user

    print("Seeding initial demo data into SQLite...")

    # 1. Create Demo User
    demo_user = User(
        email="demo@medjourney.ai",
        hashed_password=hash_password("Demo@123"),
        is_active=True
    )
    db.add(demo_user)
    db.flush()

    # 2. Create Patient Profile
    profile = PatientProfile(
        user_id=demo_user.id,
        name="Rajesh V. Sharma (Demo Patient)",
        age=52,
        gender="Male",
        blood_group="B+",
        abha_id="91-4523-8891-2304",
        abha_address="rajesh.sharma@abdm",
        abha_status="Demo / Mock ABHA ID",
        emergency_contact="Anita Sharma (Spouse) - +91 98201 44521",
        primary_physician="Dr. Ananya Sen, MD (Endocrinology & Internal Medicine)",
        allergies="Penicillin, Sulfa drugs"
    )
    db.add(profile)
    db.flush()

    # 3. Create Medical Reports
    rep1 = MedicalReport(
        patient_id=profile.id,
        file_name="Dr_Lal_PathLabs_Comprehensive_Panel_Oct2026.pdf",
        file_path="uploads/demo_lab_oct2026.pdf",
        file_size=1420500,
        mime_type="application/pdf",
        document_type="Lab Report",
        facility="Dr. Lal PathLabs & Diagnostics, Bangalore",
        doctor_name="Dr. Ananya Sen, MD",
        report_date="08 Oct 2026",
        raw_ocr_text="Dr. Lal PathLabs. Patient: Rajesh V. Sharma. Hemoglobin: 10.2 g/dL (13.0-17.0). Fasting Blood Glucose: 126 mg/dL (70-99). Vitamin D (25-OH): 14.0 ng/mL (30-100). Total Cholesterol: 188 mg/dL. Serum Creatinine: 0.95 mg/dL.",
        ocr_confidence=97.0,
        extraction_confidence=95.0,
        summary="Your latest report contains 3 notable observations. Two values appear outside the reference ranges shown on the report.",
        what_this_means="Your blood test indicates that the oxygen-carrying protein in red blood cells (Hemoglobin) is currently lower than normal baseline values. Vitamin D levels also reflect reduced stores. Fasting blood sugar appears above standard morning targets.",
        processing_status="completed"
    )

    rep2 = MedicalReport(
        patient_id=profile.id,
        file_name="Apollo_Spectra_Prescription_Sep2026.pdf",
        file_path="uploads/demo_rx_sep2026.pdf",
        file_size=865000,
        mime_type="application/pdf",
        document_type="Prescription",
        facility="Apollo Spectra Hospitals, Bangalore",
        doctor_name="Dr. Ananya Sen, MD (Endocrinology)",
        report_date="15 Sep 2026",
        raw_ocr_text="Apollo Spectra Hospitals. Rx: Tab. Metformin 500 mg BD with food. Cap. Vitamin D3 60,000 IU weekly x 8 weeks. Tab. Telmisartan 40 mg OD morning.",
        ocr_confidence=99.0,
        extraction_confidence=98.0,
        summary="Active prescription issued following blood pressure & blood sugar follow-up consultation.",
        what_this_means="Prescription provides continued support for blood sugar maintenance and vitamin replenishment.",
        processing_status="completed"
    )

    rep3 = MedicalReport(
        patient_id=profile.id,
        file_name="Metropolis_Routine_Panel_Jun2026.pdf",
        file_path="uploads/demo_lab_jun2026.pdf",
        file_size=1120000,
        mime_type="application/pdf",
        document_type="Lab Report",
        facility="Metropolis Healthcare, Bangalore",
        doctor_name="Dr. Ramesh Patel, MBBS",
        report_date="20 Jun 2026",
        raw_ocr_text="Metropolis Healthcare. Hemoglobin: 11.4 g/dL. Fasting Glucose: 108 mg/dL. Vitamin D: 22.0 ng/mL. Total Cholesterol: 215 mg/dL. HbA1c: 6.2%.",
        ocr_confidence=98.0,
        extraction_confidence=97.0,
        summary="Mid-year checkup showing borderline fasting glucose and elevated total cholesterol.",
        what_this_means="Values indicated mild lipid elevation and borderline glucose levels that prompted dietary counseling.",
        processing_status="completed"
    )

    rep4 = MedicalReport(
        patient_id=profile.id,
        file_name="Manipal_Annual_Health_Assessment_Jan2026.pdf",
        file_path="uploads/demo_lab_jan2026.pdf",
        file_size=1650000,
        mime_type="application/pdf",
        document_type="Lab Report",
        facility="Manipal Hospital Diagnostics, Bangalore",
        doctor_name="Dr. Ananya Sen, MD",
        report_date="12 Jan 2026",
        raw_ocr_text="Manipal Hospitals. Annual Health Check. Hemoglobin: 12.8 g/dL. Fasting Glucose: 96 mg/dL. Vitamin D: 29.0 ng/mL. Total Cholesterol: 228 mg/dL. Creatinine: 0.92 mg/dL.",
        ocr_confidence=99.0,
        extraction_confidence=98.0,
        summary="Baseline annual health check. Optimal blood count and fasting sugar.",
        what_this_means="Baseline check established in January with optimal blood count and fasting sugar.",
        processing_status="completed"
    )

    rep5 = MedicalReport(
        patient_id=profile.id,
        file_name="Manipal_Ultrasound_Abdomen_Jan2026.pdf",
        file_path="uploads/demo_scan_jan2026.pdf",
        file_size=2300000,
        mime_type="application/pdf",
        document_type="Diagnostic Scan",
        facility="Manipal Hospital Imaging, Bangalore",
        doctor_name="Dr. K. Srinivas, Consultant Radiologist",
        report_date="10 Jan 2026",
        raw_ocr_text="Ultrasound Abdomen & Pelvis. Mild diffuse hepatic steatosis (Grade I Fatty Liver). Gallbladder and kidneys normal.",
        ocr_confidence=96.0,
        extraction_confidence=94.0,
        summary="Mild diffuse hepatic steatosis (Grade I Fatty Liver). No focal lesions.",
        what_this_means="Ultrasound findings suggest mild fatty infiltration in liver tissue, managed through balanced diet and physical activity.",
        processing_status="completed"
    )

    db.add_all([rep1, rep2, rep3, rep4, rep5])
    db.flush()

    # 4. Create Lab Results (Chronological trends across Jan, Jun, Oct 2026)
    lab_records = [
        # Oct 2026 (rep1)
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Hemoglobin", value=10.2, value_display="10.2 g/dL", unit="g/dL", reference_range="13.0 - 17.0 g/dL", min_safe=13.0, max_safe=17.0, status="low", confidence=97.0, note="Below report reference range", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Vitamin D (25-OH)", value=14.0, value_display="14.0 ng/mL", unit="ng/mL", reference_range="30.0 - 100.0 ng/mL", min_safe=30.0, max_safe=100.0, status="low", confidence=94.0, note="Deficient level", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Fasting Blood Glucose", value=126.0, value_display="126 mg/dL", unit="mg/dL", reference_range="70 - 99 mg/dL", min_safe=70.0, max_safe=99.0, status="high", confidence=96.0, note="Elevated fasting level", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Total Cholesterol", value=188.0, value_display="188 mg/dL", unit="mg/dL", reference_range="125 - 200 mg/dL", min_safe=125.0, max_safe=200.0, status="normal", confidence=98.0, note="Target met", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Serum Creatinine", value=0.95, value_display="0.95 mg/dL", unit="mg/dL", reference_range="0.7 - 1.2 mg/dL", min_safe=0.7, max_safe=1.2, status="normal", confidence=99.0, note="Kidney marker stable", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="HbA1c", value=6.8, value_display="6.8 %", unit="%", reference_range="< 5.7 %", min_safe=4.0, max_safe=5.7, status="high", confidence=98.0, note="Reflects 3-month glycemic state", test_date="08 Oct 2026"),
        LabResult(report_id=rep1.id, patient_id=profile.id, test_name="Blood Pressure", value=124.0, value_display="124 mmHg", unit="mmHg", reference_range="90 - 120 mmHg", min_safe=90.0, max_safe=120.0, status="normal", confidence=97.0, note="Systolic pressure controlled", test_date="08 Oct 2026"),

        # Jun 2026 (rep3)
        LabResult(report_id=rep3.id, patient_id=profile.id, test_name="Hemoglobin", value=11.4, value_display="11.4 g/dL", unit="g/dL", reference_range="13.0 - 17.0 g/dL", min_safe=13.0, max_safe=17.0, status="low", confidence=98.0, note="Mild drop noted", test_date="20 Jun 2026"),
        LabResult(report_id=rep3.id, patient_id=profile.id, test_name="Vitamin D (25-OH)", value=22.0, value_display="22.0 ng/mL", unit="ng/mL", reference_range="30.0 - 100.0 ng/mL", min_safe=30.0, max_safe=100.0, status="low", confidence=95.0, note="Mild insufficiency", test_date="20 Jun 2026"),
        LabResult(report_id=rep3.id, patient_id=profile.id, test_name="Fasting Blood Glucose", value=108.0, value_display="108 mg/dL", unit="mg/dL", reference_range="70 - 99 mg/dL", min_safe=70.0, max_safe=99.0, status="high", confidence=97.0, note="Borderline fasting", test_date="20 Jun 2026"),
        LabResult(report_id=rep3.id, patient_id=profile.id, test_name="Total Cholesterol", value=215.0, value_display="215 mg/dL", unit="mg/dL", reference_range="125 - 200 mg/dL", min_safe=125.0, max_safe=200.0, status="high", confidence=99.0, note="Borderline high", test_date="20 Jun 2026"),
        LabResult(report_id=rep3.id, patient_id=profile.id, test_name="Blood Pressure", value=132.0, value_display="132 mmHg", unit="mmHg", reference_range="90 - 120 mmHg", min_safe=90.0, max_safe=120.0, status="attention", confidence=96.0, note="Mildly elevated", test_date="20 Jun 2026"),

        # Jan 2026 (rep4)
        LabResult(report_id=rep4.id, patient_id=profile.id, test_name="Hemoglobin", value=12.8, value_display="12.8 g/dL", unit="g/dL", reference_range="13.0 - 17.0 g/dL", min_safe=13.0, max_safe=17.0, status="normal", confidence=99.0, note="Baseline normal", test_date="12 Jan 2026"),
        LabResult(report_id=rep4.id, patient_id=profile.id, test_name="Vitamin D (25-OH)", value=29.0, value_display="29.0 ng/mL", unit="ng/mL", reference_range="30.0 - 100.0 ng/mL", min_safe=30.0, max_safe=100.0, status="normal", confidence=96.0, note="Adequate baseline", test_date="12 Jan 2026"),
        LabResult(report_id=rep4.id, patient_id=profile.id, test_name="Fasting Blood Glucose", value=96.0, value_display="96 mg/dL", unit="mg/dL", reference_range="70 - 99 mg/dL", min_safe=70.0, max_safe=99.0, status="normal", confidence=98.0, note="Optimal baseline", test_date="12 Jan 2026"),
        LabResult(report_id=rep4.id, patient_id=profile.id, test_name="Total Cholesterol", value=228.0, value_display="228 mg/dL", unit="mg/dL", reference_range="125 - 200 mg/dL", min_safe=125.0, max_safe=200.0, status="high", confidence=99.0, note="Baseline elevated", test_date="12 Jan 2026"),
        LabResult(report_id=rep4.id, patient_id=profile.id, test_name="Blood Pressure", value=138.0, value_display="138 mmHg", unit="mmHg", reference_range="90 - 120 mmHg", min_safe=90.0, max_safe=120.0, status="attention", confidence=98.0, note="Stage 1 baseline", test_date="12 Jan 2026"),
    ]
    db.add_all(lab_records)

    # 5. Create Medications
    meds = [
        Medication(report_id=rep2.id, patient_id=profile.id, name="Metformin", dosage="500 mg", frequency="Twice daily", timing="After meals", duration="90 days", indication="Blood sugar management", status="Active", prescribed_date="15 Sep 2026", doctor_name="Dr. Ananya Sen, MD"),
        Medication(report_id=rep2.id, patient_id=profile.id, name="Vitamin D3", dosage="60,000 IU", frequency="Weekly", timing="Every Sunday", duration="8 weeks", indication="Deficiency replenishment", status="Active", prescribed_date="15 Sep 2026", doctor_name="Dr. Ananya Sen, MD"),
        Medication(report_id=rep4.id, patient_id=profile.id, name="Telmisartan", dosage="40 mg", frequency="Once daily", timing="Morning", duration="Maintenance", indication="Blood pressure regulation", status="Active", prescribed_date="12 Jan 2026", doctor_name="Dr. Ananya Sen, MD"),
        Medication(report_id=rep3.id, patient_id=profile.id, name="Atorvastatin", dosage="10 mg", frequency="Once daily", timing="Bedtime", duration="3 months", indication="Lipid management", status="Completed", prescribed_date="20 Jun 2026", doctor_name="Dr. Ramesh Patel"),
    ]
    db.add_all(meds)

    # 6. Create Timeline Events
    timeline_events = [
        TimelineEvent(patient_id=profile.id, report_id=rep1.id, title="Comprehensive Metabolic & CBC Panel", category="Lab Report", event_date="08 Oct 2026", facility="Dr. Lal PathLabs", badge="3 Attention Items", highlights_json=json.dumps(["Hemoglobin: 10.2 g/dL", "Vitamin D: 14 ng/mL", "Glucose: 126 mg/dL"])),
        TimelineEvent(patient_id=profile.id, report_id=rep2.id, title="Prescription Update — Dr. Ananya Sen", category="Prescription", event_date="15 Sep 2026", facility="Apollo Spectra Hospitals", badge="3 Prescriptions Active", highlights_json=json.dumps(["Metformin 500 mg", "Vitamin D3 60,000 IU", "Telmisartan 40 mg"])),
        TimelineEvent(patient_id=profile.id, report_id=rep3.id, title="Mid-Year Routine Lipid & Glycemic Panel", category="Lab Report", event_date="20 Jun 2026", facility="Metropolis Healthcare", badge="Lipid Evaluation", highlights_json=json.dumps(["Hemoglobin: 11.4 g/dL", "Total Cholesterol: 215 mg/dL", "Glucose: 108 mg/dL"])),
        TimelineEvent(patient_id=profile.id, report_id=rep4.id, title="Annual Comprehensive Health Assessment", category="Lab Report", event_date="12 Jan 2026", facility="Manipal Hospital Diagnostics", badge="Baseline 2026", highlights_json=json.dumps(["Hemoglobin: 12.8 g/dL", "Cholesterol: 228 mg/dL", "Creatinine: 0.92 mg/dL"])),
        TimelineEvent(patient_id=profile.id, report_id=rep5.id, title="Ultrasound Abdomen & Pelvis", category="Diagnostic Scan", event_date="10 Jan 2026", facility="Manipal Hospital Imaging", badge="Grade I Steatosis", highlights_json=json.dumps(["Liver: Grade I Steatosis", "Kidneys & Bladder: Normal"])),
    ]
    db.add_all(timeline_events)

    db.commit()
    print("Demo data seeded successfully into SQLite!")
    return demo_user
