import React from 'react';
import { Bot, CheckCircle2, Loader2, Sparkles, Shield, Cpu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ProcessingAnimation = ({ currentStep = 'reading', progressPercent = 50, fileName = "Medical_Report.pdf" }) => {
  const { t } = useLanguage();

  const stepList = [
    { key: 'uploading', label: t.upload?.steps?.uploading || "Uploading document securely", percent: 25 },
    { key: 'reading', label: t.upload?.steps?.reading || "Reading document via OCR", percent: 50 },
    { key: 'extracting', label: t.upload?.steps?.extracting || "Extracting clinical parameters & dosages", percent: 75 },
    { key: 'generating', label: t.upload?.steps?.generating || "Generating plain-language summary", percent: 100 },
  ];

  const getStepStatus = (stepKey) => {
    const order = ['uploading', 'reading', 'extracting', 'generating'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="ai-processing-box animate-fade-in">
      {/* Pulse Orbit AI Core Indicator */}
      <div className="ai-orbit-container">
        <div className="orbit-ring" />
        <div className="orbit-core animate-pulse-glow">
          <Bot size={28} />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {t.upload?.processingTitle || "Analyzing your health record..."}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Processing <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fileName}</span> through clinical OCR & NLP engine
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', maxWidth: '420px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', height: '6px', overflow: 'hidden' }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #0284c7 0%, #0d9488 100%)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.4s ease-in-out'
        }} />
      </div>

      {/* Sequential 4-Step Progress List */}
      <div className="progress-steps-list">
        {stepList.map((s, idx) => {
          const status = getStepStatus(s.key);
          return (
            <div
              key={s.key}
              className="step-status-row"
              style={{
                background: status === 'active' ? 'var(--primary-light)' : 'var(--bg-subtle)',
                border: status === 'active' ? '1px solid var(--primary-border)' : '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: status === 'completed' ? 'var(--success)' : (status === 'active' ? 'var(--primary)' : 'var(--text-light)'),
                  color: '#fff'
                }}>
                  {status === 'completed' ? '✓' : idx + 1}
                </span>
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: status === 'active' ? 700 : 500,
                  color: status === 'active' ? 'var(--primary)' : 'var(--text-primary)'
                }}>
                  {s.label}
                </span>
              </div>

              <div>
                {status === 'completed' && <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />}
                {status === 'active' && <Loader2 size={16} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />}
                {status === 'pending' && <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Waiting</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
