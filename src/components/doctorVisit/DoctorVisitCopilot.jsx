import React, { useState } from 'react';
import { Stethoscope, Printer, Sparkles, CheckCircle2, HelpCircle, FileText, Pill, TrendingDown, ShieldAlert, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockDoctorVisitSummary, mockPatient } from '../../data/mockData';
import { apiService } from '../../services/api';

export const DoctorVisitCopilot = ({ onOpenDocument }) => {
  const { t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryData, setSummaryData] = useState(mockDoctorVisitSummary);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await apiService.generateDoctorVisitSummary();
      if (data) {
        setSummaryData({
          patientName: data.patientName || data.patient_name || mockDoctorVisitSummary.patientName,
          generatedDate: data.generatedDate || data.generated_date || mockDoctorVisitSummary.generatedDate,
          recentChanges: data.recentChanges || data.recent_changes || mockDoctorVisitSummary.recentChanges,
          currentMedications: data.currentMedications || data.current_medications || mockDoctorVisitSummary.currentMedications,
          questionsToDiscuss: data.questionsToDiscuss || data.questions_to_discuss || mockDoctorVisitSummary.questionsToDiscuss,
          relevantRecords: data.relevantRecords || data.relevant_records || mockDoctorVisitSummary.relevantRecords
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t.doctor?.title || "Prepare for My Doctor Visit"}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {t.doctor?.subtitle || "Generate an executive health summary and relevant discussion topics before your consultation."}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrint}
            style={{ fontSize: '0.86rem' }}
          >
            <Printer size={16} />
            <span>{t.doctor?.printBtn || "Print / Export Summary"}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRegenerate}
            disabled={isGenerating}
            style={{ fontSize: '0.86rem' }}
          >
            <Sparkles size={16} />
            <span>{isGenerating ? "Synthesizing Records..." : (t.doctor?.generateBtn || "Generate Visit Summary")}</span>
          </button>
        </div>
      </div>

      {/* Main Briefing Sheet Card */}
      <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Header Metadata */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CLINICAL BRIEFING DOCUMENT</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{summaryData.patientName}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Age: {mockPatient.age} Yrs • Gender: {mockPatient.gender} • Attending: {mockPatient.primaryPhysician}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-teal">Date: {summaryData.generatedDate}</span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {t.doctor?.generatedFrom || "Generated from your uploaded records."}
            </div>
          </div>
        </div>

        {/* 1. Recent Changes */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingDown size={18} className="text-primary" />
            <span>{t.doctor?.recentChanges || "Recent Changes"}</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {summaryData.recentChanges.map((item, idx) => (
              <div key={idx} style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Current Medications Records */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Pill size={18} style={{ color: 'var(--teal)' }} />
            <span>{t.doctor?.currentMeds || "Current Medication Records"}</span>
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px'
          }}>
            {summaryData.currentMedications.map((med, idx) => (
              <div key={idx} style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {med.name} <span style={{ color: 'var(--teal)', fontFamily: 'var(--font-mono)' }}>{med.dose}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {med.freq}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Active since: {med.since}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Questions to Discuss With Your Doctor */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} style={{ color: 'var(--warning)' }} />
            <span>{t.doctor?.questionsToDiscuss || "Questions to Discuss with Your Doctor"}</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summaryData.questionsToDiscuss.map((q, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px'
              }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  "{q}"
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Relevant Source Records */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--primary)' }} />
            <span>{t.doctor?.relevantRecords || "Relevant Source Records"}</span>
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {summaryData.relevantRecords.map((rec, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-secondary"
                onClick={() => onOpenDocument && onOpenDocument('/images/medical_report_scan.jpg')}
                style={{ fontSize: '0.82rem', padding: '8px 14px' }}
              >
                <FileText size={14} className="text-primary" />
                <span>{rec.name} ({rec.date})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Safety Note */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <ShieldAlert size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <span>{t.doctor?.safetyNote || "Does not provide medical diagnosis or treatment instructions. Use as a talking guide for your qualified physician."}</span>
        </div>
      </div>
    </div>
  );
};
