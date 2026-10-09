import React from 'react';
import {
  Sparkles,
  Droplet,
  Sun,
  Activity,
  ArrowRight,
  ShieldAlert,
  Share2,
  Calendar,
  FileText,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AISummaryView = ({
  extractedPayload,
  onGoDashboard,
  onPrepareDoctorVisit,
  onOpenEvidence
}) => {
  const { t } = useLanguage();
  const data = extractedPayload?.extractedData || {};

  const findings = data.keyFindings || [
    { id: 'f1', title: 'Hemoglobin', badge: 'Below report reference range', value: '10.2 g/dL', icon: Droplet, desc: 'Reported value is 10.2 g/dL, which is below the normal 13.0–17.0 g/dL range.' },
    { id: 'f2', title: 'Vitamin D', badge: 'Below report reference range', value: '14 ng/mL', icon: Sun, desc: 'Reported value of 14 ng/mL indicates clinical insufficiency.' },
    { id: 'f3', title: 'Glucose', badge: 'Review with healthcare professional', value: '126 mg/dL', icon: Activity, desc: 'Reported value of 126 mg/dL is higher than the standard morning fasting limit.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade-in">
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
            <span className="badge badge-teal">
              <Sparkles size={14} />
              <span>AI Synthesized Overview</span>
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t.summary?.title || "Your Report, Explained"}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {t.summary?.subtitle || "Simplified breakdown generated using safe, non-diagnostic healthcare AI guidelines."}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrepareDoctorVisit}
            style={{ fontSize: '0.86rem' }}
          >
            <Stethoscope size={16} />
            <span>Prepare Doctor Visit</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onGoDashboard}
            style={{ fontSize: '0.86rem' }}
          >
            <span>Go to Health Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Section 1: Simple Summary */}
      <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {t.summary?.simpleSummary || "Simple Summary"}
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
          {data.summary || "Your latest report contains 3 notable observations. Two values appear outside the reference ranges shown on the report."}
        </p>
      </div>

      {/* Section 2: Key Findings Cards */}
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          {t.summary?.keyFindings || "Key Findings"}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {findings.map((item, idx) => {
            const isWarning = item.badge.includes('Below') || item.badge.includes('range');
            return (
              <div
                key={item.id || idx}
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  borderTop: isWarning ? '3px solid var(--warning)' : '3px solid var(--primary)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {item.title === 'Hemoglobin' ? '🩸' : (item.title.includes('Vitamin') ? '☀️' : '🧪')}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                    </div>

                    <span className={`badge ${isWarning ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: '0.72rem' }}>
                      {item.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {item.value}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => onOpenEvidence && onOpenEvidence(item)}
                    style={{ padding: 0, fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}
                  >
                    <span>View Longitudinal Evidence →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: What This Means (Safe Non-diagnostic Language) */}
      <div className="card" style={{ padding: '24px', background: 'var(--bg-subtle)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
          {t.summary?.whatThisMeans || "What This Means"}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
          {data.whatThisMeans || "Your blood test indicates that the oxygen-carrying protein in red blood cells (Hemoglobin) is currently lower than normal baseline values. Vitamin D levels also reflect reduced stores. Fasting blood sugar appears above standard morning targets. These findings may be worth discussing with your doctor to review dietary iron intake, sunlight exposure, and routine glycemic follow-up."}
        </p>

        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <ShieldAlert size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
          <span>
            {t.summary?.disclaimerNote || "This explanation uses observational language only (e.g. 'appears', 'may', 'reported value') and does not constitute a medical diagnosis. Please review with your doctor."}
          </span>
        </div>
      </div>
    </div>
  );
};
