import os
from typing import Dict, Any, List, Optional
import httpx
from ..core.config import settings

def generate_plain_language_summary(test_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Synthesizes a safe, non-diagnostic plain-language summary strictly from stored database records.
    Uses cautious phrasing: "appears", "reported value", "below reference range shown on report".
    """
    key_findings = []
    out_of_range = []

    for item in test_results:
        status = item.get("status", "normal")
        name = item.get("test_name", "")
        val = item.get("value", "")
        unit = item.get("unit", "")
        ref = item.get("reference_range", "")

        if status == "low":
            finding = {
                "title": name,
                "badge": "Below report reference range",
                "value": f"{val} {unit}".strip(),
                "desc": f"The reported value of {val} {unit} is below the {ref} reference range shown on the report."
            }
            key_findings.append(finding)
            out_of_range.append(name)
        elif status == "high":
            finding = {
                "title": name,
                "badge": "Review with healthcare professional",
                "value": f"{val} {unit}".strip(),
                "desc": f"The reported value of {val} {unit} sits above the {ref} reference range shown on the report."
            }
            key_findings.append(finding)
            out_of_range.append(name)

    if out_of_range:
        summary_text = (
            f"Your latest report contains {len(test_results)} notable observations. "
            f"{len(out_of_range)} values appear outside the reference ranges shown on the report: "
            f"{', '.join(out_of_range)}."
        )
    else:
        summary_text = "All observed parameters fall within standard laboratory reference ranges."

    what_this_means = (
        "Your blood test reflects values documented at the time of specimen collection. "
        "Observable variations from laboratory reference bounds are common and may be influenced by hydration, "
        "diet, or routine metabolic factors. Consider discussing these findings with your doctor."
    )

    questions_for_doctor = [
        "What factors might explain the observed variations in my test values?",
        "Is follow-up testing recommended to monitor these parameters over time?",
        "Are any dietary or lifestyle adjustments advised based on these results?"
    ]

    return {
        "summary": summary_text,
        "key_findings": key_findings,
        "out_of_range_values": out_of_range,
        "what_this_means": what_this_means,
        "questions_for_doctor": questions_for_doctor
    }

def answer_copilot_chat(
    message: str,
    patient_name: str,
    stored_reports: List[Dict[str, Any]],
    stored_labs: List[Dict[str, Any]],
    stored_meds: List[Dict[str, Any]],
    language: str = "en"
) -> Dict[str, Any]:
    """
    Answers user queries grounded strictly in the authenticated patient's stored SQLite database records.
    Never invents unverified data.
    """
    q_lower = (message or "").lower()

    # Document citations collected from actual stored reports
    sources = []
    for r in stored_reports[:3]:
        sources.append({
            "name": f"{r.get('document_type', 'Report')} ({r.get('report_date', 'Recent')}) - {r.get('facility', 'Diagnostics')}",
            "docId": r.get("id")
        })

    # Language-aware responses grounded in actual database values
    if language == "ta" or "மாற்றம்" in q_lower or "அறிக்கை" in q_lower:
        # Tamil response grounded in actual database records
        hem_lab = next((l for l in stored_labs if "hemo" in l.get("test_name", "").lower()), None)
        glu_lab = next((l for l in stored_labs if "glucose" in l.get("test_name", "").lower()), None)
        vit_lab = next((l for l in stored_labs if "vitamin" in l.get("test_name", "").lower()), None)

        lines = [f"உங்கள் பதிவேற்றப்பட்ட மருத்துவ ஆவணங்களின்படி ({patient_name}):\n"]
        if hem_lab:
            lines.append(f"• **ஹீமோகுளோபின் (Hemoglobin):** சமீபத்திய முடிவு **{hem_lab.get('value')} {hem_lab.get('unit')}** ({hem_lab.get('reference_range')} வரம்பிற்குள் கவனிக்கப்பட்டது).")
        if glu_lab:
            lines.append(f"• **இரத்த சர்க்கரை (Fasting Glucose):** **{glu_lab.get('value')} {glu_lab.get('unit')}** ஆக பதிவாகியுள்ளது.")
        if vit_lab:
            lines.append(f"• **வைட்டமின் D:** **{vit_lab.get('value')} {vit_lab.get('unit')}** ஆக பதிவாகியுள்ளது.")
        
        if stored_meds:
            med_names = [m.get("name") for m in stored_meds if m.get("status") == "Active"]
            lines.append(f"• **தற்போதைய மருந்துகள்:** {', '.join(med_names)}.")

        reply = "\n".join(lines)
        return {
            "reply": reply,
            "sources": sources,
            "can_view_evidence": True,
            "evidence_param": "Hemoglobin",
            "language": "ta"
        }

    if language == "hi" or "बदला" in q_lower or "दवा" in q_lower:
        # Hindi response grounded in actual database records
        hem_lab = next((l for l in stored_labs if "hemo" in l.get("test_name", "").lower()), None)
        glu_lab = next((l for l in stored_labs if "glucose" in l.get("test_name", "").lower()), None)

        lines = [f"आपके अपलोड किए गए रिकॉर्ड्स के अनुसार ({patient_name}):\n"]
        if hem_lab:
            lines.append(f"• **हीमोग्लोबिन (Hemoglobin):** नवीनतम मान **{hem_lab.get('value')} {hem_lab.get('unit')}** दर्ज है।")
        if glu_lab:
            lines.append(f"• **फास्टिंग ग्लूकोज (Glucose):** **{glu_lab.get('value')} {glu_lab.get('unit')}** दर्ज है।")
        if stored_meds:
            med_list = [f"{m.get('name')} {m.get('dosage')}" for m in stored_meds if m.get('status') == 'Active']
            lines.append(f"• **सक्रिय दवाएं:** {', '.join(med_list)}।")

        reply = "\n".join(lines)
        return {
            "reply": reply,
            "sources": sources,
            "can_view_evidence": True,
            "evidence_param": "Hemoglobin",
            "language": "hi"
        }

    # English query handling
    if "change" in q_lower or "latest report" in q_lower or "what changed" in q_lower:
        reply_lines = [
            f"Based on stored records for **{patient_name}**:\n"
        ]
        for lab in stored_labs[:5]:
            status_desc = "outside normal range" if lab.get("status") in ["low", "high"] else "normal"
            reply_lines.append(f"• **{lab.get('test_name')}:** Reported at **{lab.get('value')} {lab.get('unit')}** ({status_desc}, ref: {lab.get('reference_range')}).")

        if stored_meds:
            active_m = [f"{m.get('name')} {m.get('dosage')}" for m in stored_meds if m.get('status') == 'Active']
            reply_lines.append(f"\n• **Recorded Active Medications:** {', '.join(active_m)}.")

        return {
            "reply": "\n".join(reply_lines),
            "sources": sources,
            "can_view_evidence": True,
            "evidence_param": "Hemoglobin",
            "language": "en"
        }

    if "medication" in q_lower or "medicine" in q_lower or "prescription" in q_lower:
        if not stored_meds:
            return {
                "reply": "No medications are currently recorded in your uploaded files.",
                "sources": sources,
                "can_view_evidence": False,
                "language": "en"
            }
        med_lines = ["Your current prescription records show:\n"]
        for m in stored_meds:
            med_lines.append(f"• **{m.get('name')} ({m.get('dosage')}):** {m.get('frequency')}, {m.get('timing', 'with meals')}. Status: {m.get('status')}.")
        med_lines.append("\n*Reminder: MedJourney.ai tracks records only. Never stop or modify medication without physician consultation.*")
        return {
            "reply": "\n".join(med_lines),
            "sources": sources,
            "can_view_evidence": False,
            "language": "en"
        }

    if "doctor" in q_lower or "discuss" in q_lower or "question" in q_lower:
        out_of_range = [l.get("test_name") for l in stored_labs if l.get("status") in ["low", "high"]]
        recs = [f"What could explain the variations observed in my {name} levels?" for name in out_of_range]
        if not recs:
            recs = ["Are my routine baseline markers adequate, and when is my next panel recommended?"]

        return {
            "reply": (
                f"Here are key questions prepared from your uploaded records for your doctor consultation:\n\n"
                + "\n".join([f"{i+1}. \"{q}\"" for i, q in enumerate(recs)])
                + "\n\n*Note: Use these points as discussion starters with your physician.*"
            ),
            "sources": sources,
            "can_view_evidence": True,
            "evidence_param": "Hemoglobin",
            "language": "en"
        }

    # Fallback if no records found or query unrelated
    if not stored_reports and not stored_labs:
        return {
            "reply": "I couldn't find that information in your uploaded records. Please upload a report to begin analysis.",
            "sources": [],
            "can_view_evidence": False,
            "language": "en"
        }

    # General overview response grounded in patient data
    return {
        "reply": (
            f"Based on your stored records for patient **{patient_name}**:\n\n"
            f"• You have **{len(stored_reports)} medical records** and **{len(stored_labs)} lab results** catalogued.\n"
            f"• Key parameters include: {', '.join([l.get('test_name') for l in stored_labs[:4]])}.\n"
            f"• You have **{len(stored_meds)} medications** recorded in your history.\n\n"
            "Ask me specific questions such as *'What changed in my latest report?'* or *'Show my medications.'*"
        ),
        "sources": sources,
        "can_view_evidence": True,
        "evidence_param": "Hemoglobin",
        "language": "en"
    }
