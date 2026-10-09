import React from 'react';
import { X, CheckCircle2, FileText, ArrowRight, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const EvidenceModal = ({ evidenceData, onClose, onOpenDocument }) => {
  const { t } = useLanguage();

  if (!evidenceData) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {t.evidence?.modalTitle || "Evidence-Linked Insight"}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Verifiable clinical provenance from your uploaded files
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            aria-label="Close"
            style={{ padding: '6px', borderRadius: 'var(--radius-sm)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Visual Sequence Flow Badge */}
          <div className="evidence-flow-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} />
              <span>{t.evidence?.flowBadge || "AI Insight → Evidence → Original Record"}</span>
            </div>
            <span className="badge badge-primary">Clinical Audit Trail</span>
          </div>

          {/* 1. AI Insight Section */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
              Synthesized Clinical Insight
            </div>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              "{evidenceData.insightText || evidenceData.text}"
            </p>
          </div>

          {/* 2. Verifiable Evidence Progression */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Historical Biomarker Evidence</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{evidenceData.parameter || "Tracked Values"}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {evidenceData.timeline?.map((item, idx) => (
                <div key={idx} className="evidence-timeline-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}>
                      0{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.date}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.status}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. OCR & Extraction Confidence Badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.evidence?.ocrConf || "OCR Confidence"}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {evidenceData.ocrConfidence || "97%"}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.evidence?.extractConf || "Extraction Confidence"}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {evidenceData.extractionConfidence || "95%"}
                </div>
              </div>
            </div>
          </div>

          {/* Action: View Original Document */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              {t.evidence?.close || "Close"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (onOpenDocument) onOpenDocument(evidenceData.sourceDocUrl || '/images/medical_report_scan.jpg');
                onClose();
              }}
            >
              <FileText size={16} />
              <span>{t.evidence?.viewOriginal || "View Original Document"}</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
