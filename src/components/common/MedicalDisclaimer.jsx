import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const MedicalDisclaimer = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        padding: '8px 12px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <Info size={13} style={{ flexShrink: 0, color: 'var(--primary)' }} />
        <span>{t.trust?.disclaimer || "MedJourney AI provides informational support and does not replace professional medical advice, diagnosis, or treatment."}</span>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.8rem',
      color: 'var(--text-secondary)'
    }}>
      <ShieldAlert size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
      <span>{t.trust?.disclaimer || "MedJourney AI provides informational support and does not replace professional medical advice, diagnosis, or treatment."}</span>
    </div>
  );
};
