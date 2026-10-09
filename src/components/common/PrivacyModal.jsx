import React from 'react';
import { X, Lock, ShieldCheck, Cpu, UserCheck, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PrivacyModal = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog">
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lock size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {t.privacy?.title || "Privacy & Data Safety"}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {t.privacy?.subtitle || "Your health information is sensitive."}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            style={{ padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ gap: '18px' }}>
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            lineHeight: 1.5
          }}>
            <strong>Our Commitment:</strong> Your health records belong exclusively to you. MedJourney AI is architected with strict confidentiality, verifiable provenance, and zero third-party monetization.
          </div>

          {/* Core Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-sm)' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Data Transparency & Secure Document Handling
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Documents are processed via isolated OCR pipelines with AES-256 standard encryption at rest and in transit. No unencrypted copies are ever cached publicly.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', background: 'var(--teal-light)', color: 'var(--teal)', borderRadius: 'var(--radius-sm)' }}>
                <Cpu size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  AI Limitations & Safety Guardrails
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Our AI models only extract and organize user-uploaded information into plain language. They NEVER diagnose diseases, adjust prescriptions, or replace clinical consultations.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', background: 'var(--warning-light)', color: 'var(--warning)', borderRadius: 'var(--radius-sm)' }}>
                <UserCheck size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  User Sovereignty & Control
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  You have full rights to export your structured JSON health timeline or completely purge all uploaded records from the application anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Persistent Legal Disclaimer */}
          <div style={{
            background: 'var(--warning-light)',
            border: '1px solid var(--warning-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: 'var(--warning-text)'
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>
              <strong>Medical Disclaimer:</strong> MedJourney AI provides informational support and does not replace professional medical advice, diagnosis, or treatment.
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            style={{ width: '100%', marginTop: '6px' }}
          >
            {t.privacy?.close || "Got it, back to app"}
          </button>
        </div>
      </div>
    </div>
  );
};
