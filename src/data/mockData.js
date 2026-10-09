// Realistic mock healthcare data for MedJourney AI Demo Patient

export const mockPatient = {
  id: "pat-10492",
  name: "Rajesh V. Sharma",
  age: 52,
  gender: "Male",
  bloodGroup: "B+",
  abhaId: "91-4523-8891-2304",
  abhaAddress: "rajesh.sharma@abdm",
  abhaStatus: "Demo Sandbox Active",
  emergencyContact: "Anita Sharma (Spouse) - +91 98201 44521",
  primaryPhysician: "Dr. Ananya Sen, MD (Endocrinology & Internal Medicine)",
  allergies: ["Penicillin", "Sulfa drugs"],
  stats: {
    recordsCount: 12,
    recordsChange: "+2 this month",
    medicationsCount: 4,
    medicationsActive: 2,
    labResultsCount: 27,
    labResultsAttention: 3,
    healthTrendsCount: 5,
    healthTrendsRecent: 2,
  }
};

export const mockReports = [
  {
    id: "rep-001",
    title: "Comprehensive Metabolic & CBC Panel",
    type: "Lab Report",
    date: "08 Oct 2026",
    isoDate: "2026-10-08",
    facility: "Dr. Lal PathLabs & Diagnostics, Bangalore",
    doctor: "Dr. Ananya Sen, MD",
    scannedUrl: "/images/medical_report_scan.jpg",
    ocrConfidence: 97,
    extractionConfidence: 95,
    testResults: [
      { id: "t1", parameter: "Hemoglobin", value: 10.2, unit: "g/dL", range: "13.0 - 17.0", status: "low", confidence: 97, note: "Below reference range" },
      { id: "t2", parameter: "Vitamin D (25-OH)", value: 14.0, unit: "ng/mL", range: "30.0 - 100.0", status: "low", confidence: 94, note: "Deficient level" },
      { id: "t3", parameter: "Fasting Blood Glucose", value: 126, unit: "mg/dL", range: "70 - 99", status: "high", confidence: 96, note: "Elevated fasting level" },
      { id: "t4", parameter: "Total Cholesterol", value: 188, unit: "mg/dL", range: "125 - 200", status: "normal", confidence: 98, note: "Desirable range" },
      { id: "t5", parameter: "LDL Cholesterol", value: 112, unit: "mg/dL", range: "< 100", status: "attention", confidence: 95, note: "Mildly above target" },
      { id: "t6", parameter: "HDL Cholesterol", value: 42, unit: "mg/dL", range: "> 40", status: "normal", confidence: 97, note: "Normal protective bound" },
      { id: "t7", parameter: "HbA1c", value: 6.8, unit: "%", range: "< 5.7", status: "high", confidence: 98, note: "Reflects 3-month glycemic state" },
      { id: "t8", parameter: "Serum Creatinine", value: 0.95, unit: "mg/dL", range: "0.7 - 1.2", status: "normal", confidence: 99, note: "Kidney marker stable" },
    ],
    summary: "Your latest report contains 3 notable observations. Two values appear outside the reference ranges shown on the report.",
    keyFindings: [
      { id: "f1", icon: "Droplet", title: "Hemoglobin", badge: "Below report reference range", value: "10.2 g/dL", desc: "Reported value is 10.2 g/dL, which sits below the laboratory's standard 13.0–17.0 g/dL reference range." },
      { id: "f2", icon: "Sun", title: "Vitamin D", badge: "Below report reference range", value: "14 ng/mL", desc: "Reported value of 14 ng/mL falls into the insufficient bracket according to clinical benchmarks." },
      { id: "f3", icon: "Activity", title: "Fasting Glucose", badge: "Review with healthcare professional", value: "126 mg/dL", desc: "Reported fasting value sits above the standard 99 mg/dL morning fasting baseline." }
    ],
    whatThisMeans: "Your blood test indicates that the oxygen-carrying protein in red blood cells (Hemoglobin) is currently lower than normal baseline values. Vitamin D levels also reflect reduced stores. Fasting blood sugar appears above standard morning targets. These findings may be worth discussing with your doctor to review dietary iron intake, sunlight exposure, and routine glycemic follow-up."
  },
  {
    id: "rep-002",
    title: "Prescription Slip — Endocrinology & General Review",
    type: "Prescription",
    date: "15 Sep 2026",
    isoDate: "2026-09-15",
    facility: "Apollo Spectra Hospitals, Bangalore",
    doctor: "Dr. Ananya Sen, MD (Endocrinology)",
    scannedUrl: "/images/medical_report_scan.jpg",
    ocrConfidence: 99,
    extractionConfidence: 98,
    medicationsPrescribed: [
      { name: "Metformin", dosage: "500 mg", frequency: "Twice daily (with food)", duration: "90 days", active: true },
      { name: "Vitamin D3 (Cholecalciferol)", dosage: "60,000 IU", frequency: "Weekly (Sunday)", duration: "8 weeks", active: true },
      { name: "Telmisartan", dosage: "40 mg", frequency: "Once daily (morning)", duration: "90 days", active: true }
    ],
    summary: "Active prescription issued following blood pressure & blood sugar follow-up consultation.",
    notes: "Review fasting blood sugar and CBC in 4 weeks. Continue low sodium diet."
  },
  {
    id: "rep-003",
    title: "Mid-Year Routine Lipid & Glycemic Panel",
    type: "Lab Report",
    date: "20 Jun 2026",
    isoDate: "2026-06-20",
    facility: "Metropolis Healthcare, Bangalore",
    doctor: "Dr. Ramesh Patel, MBBS",
    scannedUrl: "/images/medical_report_scan.jpg",
    ocrConfidence: 98,
    extractionConfidence: 97,
    testResults: [
      { id: "t31", parameter: "Hemoglobin", value: 11.4, unit: "g/dL", range: "13.0 - 17.0", status: "attention", confidence: 98 },
      { id: "t32", parameter: "Vitamin D (25-OH)", value: 22.0, unit: "ng/mL", range: "30.0 - 100.0", status: "attention", confidence: 95 },
      { id: "t33", parameter: "Fasting Blood Glucose", value: 108, unit: "mg/dL", range: "70 - 99", status: "attention", confidence: 97 },
      { id: "t34", parameter: "Total Cholesterol", value: 215, unit: "mg/dL", range: "125 - 200", status: "high", confidence: 99 },
      { id: "t35", parameter: "HbA1c", value: 6.2, unit: "%", range: "< 5.7", status: "attention", confidence: 98 },
    ],
    summary: "Mid-year checkup showing borderline fasting glucose and elevated total cholesterol.",
    whatThisMeans: "Values indicate mild lipid elevation and borderline glucose levels that prompted lifestyle and dietary counseling."
  },
  {
    id: "rep-004",
    title: "Annual Comprehensive Health Assessment",
    type: "Lab Report",
    date: "12 Jan 2026",
    isoDate: "2026-01-12",
    facility: "Manipal Hospital Diagnostics, Bangalore",
    doctor: "Dr. Ananya Sen, MD",
    scannedUrl: "/images/medical_report_scan.jpg",
    ocrConfidence: 99,
    extractionConfidence: 98,
    testResults: [
      { id: "t41", parameter: "Hemoglobin", value: 12.8, unit: "g/dL", range: "13.0 - 17.0", status: "normal", confidence: 99 },
      { id: "t42", parameter: "Vitamin D (25-OH)", value: 29.0, unit: "ng/mL", range: "30.0 - 100.0", status: "normal", confidence: 96 },
      { id: "t43", parameter: "Fasting Blood Glucose", value: 96, unit: "mg/dL", range: "70 - 99", status: "normal", confidence: 99 },
      { id: "t44", parameter: "Total Cholesterol", value: 228, unit: "mg/dL", range: "125 - 200", status: "high", confidence: 99 },
      { id: "t45", parameter: "Serum Creatinine", value: 0.92, unit: "mg/dL", range: "0.7 - 1.2", status: "normal", confidence: 99 },
    ],
    summary: "Baseline annual health check. Stable hemoglobin and kidney markers.",
    whatThisMeans: "Baseline check established in January with optimal blood count and fasting sugar."
  },
  {
    id: "rep-005",
    title: "Ultrasound Abdomen & Pelvis (Normal Study)",
    type: "Diagnostic Scan",
    date: "10 Jan 2026",
    isoDate: "2026-01-10",
    facility: "Manipal Hospital Imaging, Bangalore",
    doctor: "Dr. K. Srinivas, Consultant Radiologist",
    scannedUrl: "/images/medical_report_scan.jpg",
    ocrConfidence: 96,
    extractionConfidence: 94,
    testResults: [
      { id: "t51", parameter: "Liver Parenchyma", value: "Grade I Steatosis", unit: "Echogenicity", range: "Normal", status: "attention", confidence: 95 },
      { id: "t52", parameter: "Gallbladder & CBD", value: "Normal", unit: "Acoustic", range: "Normal", status: "normal", confidence: 98 },
      { id: "t53", parameter: "Kidneys & Bladder", value: "Unremarkable", unit: "Parenchyma", range: "Normal", status: "normal", confidence: 99 },
    ],
    summary: "Mild diffuse hepatic steatosis (Grade I Fatty Liver). No focal lesions or calculi.",
    whatThisMeans: "Ultrasound findings suggest mild fatty infiltration in liver tissue, very common and managed through balanced diet and physical activity."
  }
];

export const mockMedications = [
  {
    id: "med-1",
    name: "Metformin",
    dosage: "500 mg",
    frequency: "Twice daily",
    timing: "After breakfast & dinner",
    duration: "Ongoing (90-day cycle)",
    status: "Active",
    sourcePrescription: "Apollo Spectra Prescription Slip",
    date: "15 Sep 2026",
    doctor: "Dr. Ananya Sen, MD",
    indication: "Blood sugar support",
    color: "#0284c7"
  },
  {
    id: "med-2",
    name: "Vitamin D3",
    dosage: "60,000 IU",
    frequency: "Weekly",
    timing: "Every Sunday morning",
    duration: "8 weeks total (3 weeks completed)",
    status: "Active",
    sourcePrescription: "Apollo Spectra Prescription Slip",
    date: "15 Sep 2026",
    doctor: "Dr. Ananya Sen, MD",
    indication: "Deficiency replenishment",
    color: "#f59e0b"
  },
  {
    id: "med-3",
    name: "Telmisartan",
    dosage: "40 mg",
    frequency: "Once daily",
    timing: "Morning after breakfast",
    duration: "Maintenance",
    status: "Active",
    sourcePrescription: "Manipal Hospital Prescription",
    date: "12 Jan 2026",
    doctor: "Dr. Ananya Sen, MD",
    indication: "Blood pressure regulation",
    color: "#10b981"
  },
  {
    id: "med-4",
    name: "Atorvastatin",
    dosage: "10 mg",
    frequency: "Once daily",
    timing: "Bedtime",
    duration: "Completed (3-month cycle)",
    status: "Past",
    sourcePrescription: "Metropolis Consultation",
    date: "20 Jun 2026",
    doctor: "Dr. Ramesh Patel",
    indication: "Lipid management",
    color: "#6b7280"
  }
];

export const mockInsights = [
  {
    id: "ins-001",
    type: "warning",
    badge: "Trend Detected",
    title: "Hemoglobin Trend Decrease",
    text: "Your hemoglobin values decreased across the available reports.",
    sourceDocument: "Lab Reports: Jan, Jun, Oct 2026",
    date: "08 Oct 2026",
    confidence: 97,
    actionText: "View Evidence",
    actionType: "evidence",
    evidenceData: {
      parameter: "Hemoglobin",
      insightText: "Your hemoglobin decreased across the available reports.",
      timeline: [
        { date: "January 2026", value: "12.8 g/dL", status: "Within normal limits (13.0 - 17.0 standard)" },
        { date: "June 2026", value: "11.4 g/dL", status: "Mild decline noted" },
        { date: "October 2026", value: "10.2 g/dL", status: "Below standard reference bounds" }
      ],
      ocrConfidence: "97%",
      extractionConfidence: "95%",
      sourceDocTitle: "Comprehensive Metabolic & CBC Panel (08 Oct 2026)",
      sourceDocUrl: "/images/medical_report_scan.jpg",
      disclaimer: "AI observation based on OCR data from 3 verified laboratory documents."
    }
  },
  {
    id: "ins-002",
    type: "alert",
    badge: "Change Detected",
    title: "Fasting Glucose Elevation",
    text: "Your latest glucose result is higher than the previous recorded value.",
    sourceDocument: "Lab Report: Oct 2026 vs Jun 2026",
    date: "08 Oct 2026",
    confidence: 96,
    actionText: "Compare Reports",
    actionType: "compare",
    evidenceData: {
      parameter: "Fasting Blood Glucose",
      insightText: "Fasting glucose shifted upward from 108 mg/dL to 126 mg/dL between June and October 2026.",
      timeline: [
        { date: "January 2026", value: "96 mg/dL", status: "Optimal fasting range (< 100 mg/dL)" },
        { date: "June 2026", value: "108 mg/dL", status: "Borderline fasting elevation" },
        { date: "October 2026", value: "126 mg/dL", status: "Elevated fasting level" }
      ],
      ocrConfidence: "98%",
      extractionConfidence: "96%",
      sourceDocTitle: "Laboratory Comparison: Metropolis vs Dr. Lal PathLabs",
      sourceDocUrl: "/images/medical_report_scan.jpg",
      disclaimer: "Correlate with HbA1c test (6.8%) and consult your attending physician."
    }
  },
  {
    id: "ins-003",
    type: "info",
    badge: "Medication Found",
    title: "Metformin 500 mg Detected",
    text: "Metformin 500 mg appears in your latest prescription.",
    sourceDocument: "Apollo Spectra Prescription (15 Sep 2026)",
    date: "15 Sep 2026",
    confidence: 99,
    actionText: "View Medication",
    actionType: "medication",
    evidenceData: {
      parameter: "Medication Extraction",
      insightText: "Metformin 500 mg was identified with 99% optical and clinical NLP confidence.",
      timeline: [
        { date: "September 15, 2026", value: "Metformin 500 mg (Twice daily)", status: "Prescribed by Dr. Ananya Sen" }
      ],
      ocrConfidence: "99%",
      extractionConfidence: "99%",
      sourceDocTitle: "Prescription Slip — Apollo Spectra",
      sourceDocUrl: "/images/medical_report_scan.jpg",
      disclaimer: "Extracted from handwritten doctor note with signature verification."
    }
  }
];

export const mockTrendsData = {
  hemoglobin: {
    name: "Hemoglobin",
    unit: "g/dL",
    refRange: "13.0 - 17.0 g/dL",
    minSafe: 13.0,
    maxSafe: 17.0,
    description: "Oxygen-carrying protein in red blood cells",
    data: [
      { month: "Jan 2026", value: 12.8, fullDate: "12 Jan 2026", status: "Normal" },
      { month: "Jun 2026", value: 11.4, fullDate: "20 Jun 2026", status: "Attention" },
      { month: "Oct 2026", value: 10.2, fullDate: "08 Oct 2026", status: "Low" },
    ]
  },
  glucose: {
    name: "Fasting Blood Glucose",
    unit: "mg/dL",
    refRange: "70 - 99 mg/dL",
    minSafe: 70,
    maxSafe: 99,
    description: "Blood sugar level after an overnight fast",
    data: [
      { month: "Jan 2026", value: 96, fullDate: "12 Jan 2026", status: "Optimal" },
      { month: "Jun 2026", value: 108, fullDate: "20 Jun 2026", status: "Borderline" },
      { month: "Oct 2026", value: 126, fullDate: "08 Oct 2026", status: "Elevated" },
    ]
  },
  vitaminD: {
    name: "Vitamin D (25-OH)",
    unit: "ng/mL",
    refRange: "30.0 - 100.0 ng/mL",
    minSafe: 30.0,
    maxSafe: 100.0,
    description: "Fat-soluble vitamin vital for bone and immune health",
    data: [
      { month: "Jan 2026", value: 29.0, fullDate: "12 Jan 2026", status: "Adequate" },
      { month: "Jun 2026", value: 22.0, fullDate: "20 Jun 2026", status: "Mild Insufficiency" },
      { month: "Oct 2026", value: 14.0, fullDate: "08 Oct 2026", status: "Deficient" },
    ]
  },
  cholesterol: {
    name: "Total Cholesterol",
    unit: "mg/dL",
    refRange: "125 - 200 mg/dL",
    minSafe: 125,
    maxSafe: 200,
    description: "Total circulating cholesterol in serum",
    data: [
      { month: "Jan 2026", value: 228, fullDate: "12 Jan 2026", status: "Elevated" },
      { month: "Jun 2026", value: 215, fullDate: "20 Jun 2026", status: "Borderline High" },
      { month: "Oct 2026", value: 188, fullDate: "08 Oct 2026", status: "Target Met" },
    ]
  },
  bloodPressure: {
    name: "Systolic Blood Pressure",
    unit: "mmHg",
    refRange: "90 - 120 mmHg",
    minSafe: 90,
    maxSafe: 120,
    description: "Arterial pressure during heart contraction",
    data: [
      { month: "Jan 2026", value: 138, fullDate: "12 Jan 2026", status: "Stage 1 Elevated" },
      { month: "Jun 2026", value: 132, fullDate: "20 Jun 2026", status: "Improving" },
      { month: "Oct 2026", value: 124, fullDate: "08 Oct 2026", status: "Controlled" },
    ]
  }
};

export const mockTimelineEvents = [
  {
    id: "tl-1",
    date: "08 Oct 2026",
    category: "Lab Report",
    title: "Comprehensive Metabolic & CBC Panel",
    facility: "Dr. Lal PathLabs",
    badge: "3 Attention Items",
    highlights: ["Hemoglobin: 10.2 g/dL", "Vitamin D: 14 ng/mL", "Glucose: 126 mg/dL"],
    documentId: "rep-001"
  },
  {
    id: "tl-2",
    date: "15 Sep 2026",
    category: "Prescription",
    title: "Prescription Update — Dr. Ananya Sen",
    facility: "Apollo Spectra Hospitals",
    badge: "3 Prescriptions Active",
    highlights: ["Metformin 500 mg (Twice daily)", "Vitamin D3 60,000 IU (Weekly)", "Telmisartan 40 mg"],
    documentId: "rep-002"
  },
  {
    id: "tl-3",
    date: "20 Jun 2026",
    category: "Lab Report",
    title: "Mid-Year Routine Lipid & Glycemic Panel",
    facility: "Metropolis Healthcare",
    badge: "Lipid Evaluation",
    highlights: ["Hemoglobin: 11.4 g/dL", "Total Cholesterol: 215 mg/dL", "Glucose: 108 mg/dL"],
    documentId: "rep-003"
  },
  {
    id: "tl-4",
    date: "12 Jan 2026",
    category: "Lab Report",
    title: "Annual Comprehensive Health Assessment",
    facility: "Manipal Hospital Diagnostics",
    badge: "Baseline 2026",
    highlights: ["Hemoglobin: 12.8 g/dL", "Total Cholesterol: 228 mg/dL", "Creatinine: 0.92 mg/dL"],
    documentId: "rep-004"
  },
  {
    id: "tl-5",
    date: "10 Jan 2026",
    category: "Diagnostic Scan",
    title: "Ultrasound Abdomen & Pelvis",
    facility: "Manipal Hospital Imaging",
    badge: "Grade I Steatosis",
    highlights: ["Liver: Grade I Fatty Infiltration", "Gallbladder & Kidneys: Normal"],
    documentId: "rep-005"
  }
];

export const mockDoctorVisitSummary = {
  patientName: "Rajesh V. Sharma",
  generatedDate: "08 Oct 2026",
  recentChanges: [
    { title: "Hemoglobin Trend", desc: "Decreased from 12.8 g/dL (Jan) to 11.4 g/dL (Jun) and currently 10.2 g/dL (Oct)." },
    { title: "Vitamin D Result", desc: "Values measured at 14 ng/mL (insufficient), currently on 60,000 IU weekly protocol." },
    { title: "Fasting Glucose", desc: "Upward progression to 126 mg/dL (fasting) with HbA1c at 6.8%." },
    { title: "Lipid Profile Response", desc: "Total Cholesterol improved from 228 mg/dL to 188 mg/dL on lifestyle and statin protocol." }
  ],
  currentMedications: [
    { name: "Metformin", dose: "500 mg", freq: "Twice daily after meals", since: "15 Sep 2026" },
    { name: "Vitamin D3", dose: "60,000 IU", freq: "Weekly (Sunday)", since: "15 Sep 2026" },
    { name: "Telmisartan", dose: "40 mg", freq: "Once daily (Morning)", since: "12 Jan 2026" }
  ],
  questionsToDiscuss: [
    "What could explain the continuous decrease observed in my hemoglobin levels across the last three reports?",
    "Should my current Metformin 500 mg dosage or timing be re-evaluated given the recent 126 mg/dL fasting glucose and 6.8% HbA1c?",
    "Is additional iron profile testing (Ferritin, TIBC) recommended alongside the Vitamin D supplementation?",
    "When should the next follow-up CBC and lipid panel be scheduled?"
  ],
  relevantRecords: [
    { name: "Comprehensive Metabolic & CBC Panel", date: "08 Oct 2026", facility: "Dr. Lal PathLabs" },
    { name: "Apollo Spectra Prescription Slip", date: "15 Sep 2026", facility: "Dr. Ananya Sen" },
    { name: "Mid-Year Routine Lipid Panel", date: "20 Jun 2026", facility: "Metropolis Healthcare" }
  ]
};

export const sampleComparisonData = {
  previousReport: { id: "rep-003", title: "June 2026 (Metropolis Healthcare)", date: "20 Jun 2026" },
  latestReport: { id: "rep-001", title: "October 2026 (Dr. Lal PathLabs)", date: "08 Oct 2026" },
  items: [
    {
      parameter: "Hemoglobin",
      unit: "g/dL",
      prev: 11.4,
      latest: 10.2,
      change: "Decreased",
      direction: "down",
      severity: "warning",
      icon: "Droplet",
      detail: "Drop of 1.2 g/dL over 3.5 months"
    },
    {
      parameter: "Vitamin D (25-OH)",
      unit: "ng/mL",
      prev: 22.0,
      latest: 14.0,
      change: "Decreased",
      direction: "down",
      severity: "warning",
      icon: "Sun",
      detail: "Decreased by 8.0 ng/mL into deficiency bracket"
    },
    {
      parameter: "Fasting Glucose",
      unit: "mg/dL",
      prev: 108,
      latest: 126,
      change: "Increased",
      direction: "up",
      severity: "alert",
      icon: "Activity",
      detail: "Increased by 18 mg/dL above standard fasting limit"
    },
    {
      parameter: "Total Cholesterol",
      unit: "mg/dL",
      prev: 215,
      latest: 188,
      change: "Improved / Decreased",
      direction: "down-positive",
      severity: "positive",
      icon: "Heart",
      detail: "Decreased by 27 mg/dL into desirable range (< 200 mg/dL)"
    },
    {
      parameter: "Metformin 500 mg",
      unit: "Prescription",
      prev: "Present",
      latest: "Present",
      change: "Present in both records",
      direction: "stable",
      severity: "neutral",
      icon: "Pill",
      detail: "Continued twice-daily medication"
    }
  ]
};
