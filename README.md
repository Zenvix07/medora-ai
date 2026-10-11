# medora-ai
🩺 Medora — AI-Powered Personal Health Copilot
Your Health History. One Clear Story.
Medora is an AI-powered Personal Health Copilot designed to help people understand, organize, compare, and manage information contained in their healthcare records.

Instead of keeping medical information scattered across prescriptions, laboratory reports, diagnostic records, and discharge summaries, Medora brings everything into one unified health journey.

Upload → Extract → Understand → Compare → Track → Discuss

🌟 Overview
Healthcare information is often fragmented across multiple documents.

Patients may have:

📄 Laboratory reports
💊 Prescriptions
🏥 Discharge summaries
🧪 Diagnostic reports
📋 Medical records
📊 Historical test results
Understanding these documents and identifying changes over time can be difficult.

Medora uses OCR, AI, structured medical data, timelines, charts, and multilingual support to make healthcare information easier to understand.

Medora helps users:
✅ Upload medical documents ✅ Extract information using OCR ✅ Understand medical terminology ✅ View reported values and reference ranges ✅ Compare previous and latest reports ✅ Identify trends over time ✅ Organize medications ✅ Build a unified health timeline ✅ Prepare questions for a doctor ✅ Ask questions about uploaded records ✅ Access the application in multiple Indian languages

🎯 Problem Statement
Healthcare data is fragmented and difficult for patients to understand.

Important information may be distributed across:

Prescription
     +
Lab Report
     +
Diagnostic Report
     +
Discharge Summary
     +
Previous Medical Records
This creates several problems:

Patients struggle to understand medical terminology.
Important values can be difficult to interpret.
Historical changes are difficult to identify.
Medical documents are not organized into one timeline.
Patients may forget important information during doctor visits.
Language can become an additional barrier.
💡 Our Solution
Medora transforms fragmented healthcare documents into an understandable health journey.

Medical Documents
       ↓
      OCR
       ↓
Medical Information Extraction
       ↓
Structured Health Data
       ↓
AI Explanation
       ↓
Comparison + Trends
       ↓
Health Timeline
       ↓
AI Health Copilot
🚀 Key Features
📄 1. Medical Document OCR
Upload:

PDF
JPG
JPEG
PNG
Medora uses PaddleOCR to extract text from medical documents.

Supported document types include:

Prescriptions
Lab reports
Diagnostic reports
Discharge summaries
Medical records
🤖 2. AI Medical Information Extraction
The system converts unstructured medical documents into structured information.

Example:

{
  "document_type": "lab_report",
  "date": "2026-09-28",
  "tests": [
    {
      "name": "Hemoglobin",
      "value": 10.2,
      "unit": "g/dL",
      "reference_range": "12-16",
      "status": "below_range",
      "confidence": 0.97
    }
  ]
}
For prescriptions:

{
  "document_type": "prescription",
  "medications": [
    {
      "name": "Example Medicine",
      "dosage": "500 mg",
      "frequency": "twice daily",
      "duration": "30 days"
    }
  ]
}
🧠 3. AI Health Summary
Medora converts complex healthcare information into simple language.

Example
Instead of presenting only:

Hemoglobin: 10.2 g/dL

Medora can explain:

The reported hemoglobin value is 10.2 g/dL, which is below the reference range shown on this report.

The system avoids unsupported medical conclusions.

📊 4. What Changed?
One of Medora's major features is historical report comparison.

Users can compare:

Previous Report
       ↓
Latest Report
       ↓
Changes
Example:

Test	Previous	Latest	Change
Hemoglobin	11.4 g/dL	10.2 g/dL	-1.2
Vitamin D	22 ng/mL	14 ng/mL	-8
Glucose	102 mg/dL	98 mg/dL	-4
Medora highlights:

New values
Changed values
Values outside provided ranges
Historical changes
📈 5. Health Trends
Medora converts historical health data into interactive charts.

Supported examples:

Hemoglobin
Vitamin D
Glucose
Cholesterol
Blood pressure
Built using:

Recharts

Example:

12.8
  \
   11.4
      \
       10.2
Users can hover over data points to see:

Value
Date
Unit
Source report
🕒 6. Unified Health Timeline
Medora organizes healthcare events chronologically.

Example:

October 2026
│
├── Lab Report
│   Hemoglobin: 10.2 g/dL
│
├── Prescription
│   2 medications
│
September 2026
│
├── Lab Report
│   Vitamin D: 14 ng/mL
│
August 2026
│
└── Doctor Visit
Each timeline event can connect back to its source document.

💊 7. Medication Summary
Medora extracts prescription information and organizes it into a structured view.

Displays:

Medicine name
Dosage
Frequency
Duration
Prescription date
Source document
Important
Medora does not recommend medication changes.

🔎 8. Evidence-Linked AI
AI-generated insights should be connected to the underlying evidence.

Example:

AI Insight

Vitamin D is below the reference range
shown on the latest report.

Confidence: 96%

Source:
Lab Report — 28 Sep 2026

[View Evidence]
Users can inspect:

Original document
Extracted value
Reference range
Date
OCR confidence
This helps improve transparency and trust.

🧑‍⚕️ 9. Doctor Visit Copilot
Medora helps users prepare for conversations with healthcare professionals.

It can generate neutral questions such as:

What could be contributing to this change in the reported value?

Should this result be reviewed alongside my previous results?

Is any follow-up recommended for this result?

The system does not prescribe treatment.

💬 10. AI Health Chat
Medora includes an interactive AI chat assistant.

Users can ask:

"Explain my latest lab report."

"What changed between my last two reports?"

"Which values are outside the provided range?"

"Summarize my prescription."

"Explain this medical term."

"What questions should I ask my doctor?"

"Show my Vitamin D trend."
The AI uses uploaded health records as context.

When possible, responses include:

Source:
Lab Report — 28 Sep 2026

[View Evidence]
🌐 11. Indian Regional Language Support
Medora is designed for multilingual healthcare access in India.

Supported languages:

Language	Support
🇬🇧 English	✅
🇮🇳 Tamil	✅
🇮🇳 Hindi	✅
🇮🇳 Telugu	✅
🇮🇳 Kannada	✅
🇮🇳 Malayalam	✅
🇮🇳 Bengali	✅
🇮🇳 Marathi	✅
🇮🇳 Gujarati	✅
🇮🇳 Punjabi	✅
Users can change language without reloading the application.

The language system can translate:

Dashboard
Navigation
AI summaries
Timeline
Doctor Visit Copilot
Chat interface
Error messages
Original medical values, medicine names, and units remain preserved.

📱 12. Responsive Design
Medora is designed for:

📱 Mobile
Touch-friendly interface
Bottom navigation
Full-screen AI chat
Responsive cards
📲 Tablet
Adaptive layouts
Collapsible navigation
💻 Laptop
Sidebar navigation
Dashboard grids
Interactive charts
🖥️ Desktop
Multi-column dashboard
Large charts
Spacious layouts
The design system remains consistent across devices.

🎨 UI/UX
Medora uses a professional healthcare SaaS design.

Design principles
Clean
Minimal
Trustworthy
Accessible
Modern
Patient-friendly
Color direction
Primary:

White
Off-white
Soft blue
Teal
Green
Supporting:

Soft amber for attention
Soft red for abnormal/out-of-range states
The website is not designed as a full dark website.

Optional dark mode may be supported, but the primary experience is light.

✨ Animations
Medora uses subtle professional animations using Framer Motion.

Examples:

Page transitions
Fade-in sections
Card hover effects
Upload progress
OCR processing
Timeline reveal
Chart animation
AI typing indicator
Chat message animation
Modal transitions
Language switching
Animations are intentionally subtle to maintain a professional healthcare experience.

🏗️ System Architecture
                       ┌─────────────────────┐
                       │        USER         │
                       │ Mobile / Tablet / PC│
                       └──────────┬──────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │    React + Vite     │
                       │    Tailwind CSS     │
                       │      Recharts       │
                       └──────────┬──────────┘
                                  │
                              REST API
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │       FastAPI       │
                       │    Backend Layer    │
                       └──────────┬──────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      ┌─────────────┐      ┌─────────────┐     ┌─────────────┐
      │  PaddleOCR  │      │  LLM / AI   │     │  Database   │
      │ OCR Engine  │      │   Service   │     │SQLite/Postgres│
      └──────┬──────┘      └──────┬──────┘     └─────────────┘
             │                    │
             └──────────┬─────────┘
                        ▼
                ┌──────────────────┐
                │ Structured Health│
                │      Data        │
                └────────┬─────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐  ┌────────────┐
     │ Timeline │   │  Trends  │  │ AI Copilot │
     └──────────┘   └──────────┘  └─────┬──────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │ Doctor Visit    │
                              │    Copilot      │
                              └─────────────────┘
🔄 AI + OCR Pipeline
Medical Document
       │
       ▼
File Validation
       │
       ▼
Document Classification
       │
       ▼
Image/PDF Preprocessing
       │
       ▼
PaddleOCR
       │
       ▼
Raw OCR Text
       │
       ▼
Medical Entity Extraction
       │
       ▼
Structured JSON
       │
       ▼
Validation
       │
       ▼
AI Summary
       │
       ├──────────────► Timeline
       │
       ├──────────────► Trends
       │
       ├──────────────► Comparison
       │
       ├──────────────► Evidence
       │
       └──────────────► AI Chat
🧰 Technology Stack
Layer	Technology
Frontend	React + Vite
UI	Tailwind CSS
Animations	Framer Motion
Icons	Lucide React
Charts	Recharts
Backend	FastAPI
Language	Python
OCR	PaddleOCR
OCR Fallback	Tesseract
AI	LLM API
Database	SQLite / PostgreSQL
ORM	SQLAlchemy
Validation	Pydantic
Authentication	Firebase/Auth.js / Demo Auth
API Communication	Axios / REST
Deployment	Vercel + Render/Railway
Version Control	GitHub
📁 Project Structure
medora/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── i18n/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── main.py
│   │   ├── database.py
│   │   └── config.py
│   │
│   ├── uploads/
│   └── requirements.txt
│
├── demo-data/
│
├── .env.example
├── .gitignore
└── README.md
🔌 API Endpoints
POST /api/auth/login

POST /api/upload

GET /api/reports

GET /api/reports/{id}

GET /api/lab-results

GET /api/medications

GET /api/timeline

GET /api/insights

POST /api/compare

GET /api/trends/{test_name}

POST /api/chat

POST /api/doctor-summary

GET /api/patient

PUT /api/patient

GET /api/health
🗃️ Database Model
Core entities:

User
 │
 └── Patient
       │
       ├── Reports
       │     ├── Observations
       │     └── Medications
       │
       └── Timeline Events
🏥 FHIR-Style Data Model
Medora follows a FHIR-style/aligned data architecture for future healthcare interoperability.

Supported concepts include:

Patient
Observation
MedicationRequest
DiagnosticReport
DocumentReference
Encounter
Example:

{
  "resourceType": "Observation",
  "id": "obs-001",
  "subject": {
    "reference": "Patient/001"
  },
  "code": {
    "text": "Hemoglobin"
  },
  "valueQuantity": {
    "value": 10.2,
    "unit": "g/dL"
  },
  "effectiveDateTime": "2026-10-08",
  "interpretation": "below_range"
}
ABHA/ABDM integration is represented as a demo/mock architecture unless a real integration is explicitly implemented.

🔐 Safety & Responsible AI
Medora is designed around responsible health-information assistance.

Medora CAN
✅ Explain terminology ✅ Compare reported values ✅ Highlight values outside provided ranges ✅ Summarize prescriptions ✅ Identify trends ✅ Explain changes ✅ Suggest questions for a doctor ✅ Link insights to source records

Medora CANNOT
❌ Diagnose diseases ❌ Recommend prescription changes ❌ Tell users to stop medication ❌ Replace a doctor ❌ Predict serious outcomes without evidence ❌ Invent medical information

Safety Disclaimer
Medora provides informational support and does not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions.

🔒 Privacy & Security
Medora follows basic application security practices:

Environment variables for secrets
API-key protection
File validation
File size restrictions
Input validation
CORS configuration
Authentication-aware API design
Sensitive data handling
No API keys in frontend code
This hackathon prototype should undergo appropriate security, privacy, regulatory, and clinical review before use with real patient data.

🧪 Demo Mode
Medora includes fictional demo records so judges can immediately experience the platform.

Demo includes:

3 laboratory reports
2 prescriptions
1 diagnostic report
4 medication records
Multiple historical lab values
Timeline events
AI-generated demo insights
Demo Account
Email: demo@medora.ai
Password: demo123
Demo credentials are intended only for local/hackathon demonstration.

🎬 Hackathon Demo Flow
The recommended 3–5 minute presentation:

1. Problem
   ↓
2. Upload medical report
   ↓
3. OCR processing
   ↓
4. Structured extraction
   ↓
5. AI health summary
   ↓
6. Show out-of-range values
   ↓
7. Open previous report
   ↓
8. "What Changed?"
   ↓
9. Health Timeline
   ↓
10. AI Health Chat
   ↓
11. Switch to Tamil
   ↓
12. Doctor Visit Copilot
🏆 Hackathon Judging Alignment
Medora is designed around the judging criteria.

Criterion	Weight	Medora Implementation
🤖 AI Utilization	35%	OCR + AI extraction + summaries + comparison + trends + chat
🏗️ Technical Architecture	25%	React + FastAPI + PaddleOCR + AI + DB + FHIR-style model
🎨 UX	20%	Responsive dashboard + simple upload + timeline + charts
🏥 Healthcare Impact	10%	Safe explanations + evidence + disclaimers
🎤 Presentation	10%	Strong 3–5 minute end-to-end demo
💡 What Makes Medora Different?
Medora is not simply an OCR tool.

The core idea is:

Connect the patient's healthcare records into one understandable story.

Traditional workflow:

Report 1 → Read
Report 2 → Read
Report 3 → Read
Medora:

Report 1
   ↓
Report 2
   ↓
Report 3
   ↓
Compare
   ↓
Identify Trends
   ↓
Build Timeline
   ↓
Explain
   ↓
Prepare for Doctor
Core Differentiator
"Medora doesn't just read a medical document. It connects healthcare records over time into one understandable health story."

📌 Future Enhancements
Potential future versions can include:

🏥 Real ABDM/ABHA integration
📱 Native mobile application
✍️ Advanced handwritten OCR
🎙️ Voice-based health copilot
🗣️ Voice interaction in Indian languages
🧬 More advanced health-data visualization
⌚ Wearable health data integration
🔐 Advanced encryption
👨‍⚕️ Doctor portal
🏥 Hospital integration
📄 FHIR interoperability
🔔 Appointment/reminder systems
📊 Long-term health analytics
🚀 Getting Started
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/medora.git

cd medora
2. Frontend Setup
cd frontend

npm install

npm run dev
Frontend:

http://localhost:5173
3. Backend Setup
Open another terminal:

cd backend

python -m venv venv
Windows
venv\Scripts\activate
Linux / macOS
source venv/bin/activate
Install dependencies:

pip install -r requirements.txt
Run FastAPI:

uvicorn app.main:app --reload
Backend:

http://localhost:8000
API documentation:

http://localhost:8000/docs
🔑 Environment Variables
Create:

.env
Example:

DATABASE_URL=sqlite:///./medora.db

LLM_API_KEY=your_api_key_here

SECRET_KEY=your_secret_key

FRONTEND_URL=http://localhost:5173
Never commit .env to GitHub.

Use:

.env.example
instead.

🌍 Deployment
Frontend
Recommended:

Vercel

Build command:

npm run build
Output:

dist
Backend
Recommended:

Render
Railway
Start command:

uvicorn app.main:app --host 0.0.0.0 --port $PORT
🧑‍💻 Development Workflow
Developer
   ↓
GitHub
   ↓
Frontend
   ↓
FastAPI Backend
   ↓
OCR
   ↓
AI
   ↓
Database
   ↓
Testing
   ↓
Deployment
🧪 Testing Checklist
Before the hackathon demo, verify:

 Landing page works
 Login works
 Demo login works
 Upload works
 PDF processing works
 Image processing works
 OCR works
 Medical extraction works
 AI summary works
 Reference ranges display correctly
 Comparison works
 Trends work
 Timeline works
 Medication page works
 Doctor Visit Copilot works
 AI chat works
 Tamil language works
 Mobile UI works
 Tablet UI works
 Desktop UI works
 Error states work
 Safety disclaimer appears
 API keys are not exposed
📸 Suggested Screenshots
Add screenshots to the repository:

docs/
├── landing-page.png
├── dashboard.png
├── upload.png
├── ocr-processing.png
├── ai-summary.png
├── health-timeline.png
├── trends.png
├── what-changed.png
├── doctor-copilot.png
├── ai-chat.png
└── tamil-interface.png
Then add them to this README.

🌟 Project Vision
Healthcare information should not be difficult to understand simply because it is spread across multiple documents.

Medora aims to create a simpler experience:

Upload your records. Understand your information. See what changed. Prepare for your next conversation with your doctor.

👥 Team
Medora — AI-Powered Personal Health Copilot
Built for:

AI / Healthcare Hackathon

Team Members:

Add team member 1
Add team member 2
Add team member 3
Add team member 4
📄 License
This project is currently intended as a hackathon/prototype project.

Add an appropriate open-source license if the project will be publicly distributed.

⚠️ Medical Disclaimer
Medora is an AI-powered informational prototype. It is not a medical device and does not provide medical diagnosis, treatment, or professional medical advice. Information generated by the system may contain errors. Users should verify important information with their healthcare professional before making medical decisions.

⭐ Medora
Your Health History. One Clear Story.
Upload → Understand → Compare → Track → Discuss
