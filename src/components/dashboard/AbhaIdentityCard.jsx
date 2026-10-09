import React, { useState } from 'react';
import { CreditCard, Download, ShieldCheck, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPatient } from '../../data/mockData';
import { apiService } from '../../services/api';

export const AbhaIdentityCard = ({ patient: propPatient, onImportSuccess }) => {
  const { t } = useLanguage();
  const [patient, setPatient] = useState(propPatient || mockPatient);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  React.useEffect(() => {
    if (propPatient) {
      setPatient(propPatient);
    } else {
      apiService.getPatient().then(data => {
        if (data && data.name) setPatient(data);
      }).catch(() => {});
    }
  }, [propPatient]);

  const handleImport = () => {
    setIsImporting(true);
    setImportStatus(null);
    setTimeout(() => {
      setIsImporting(false);
      setImportStatus('Demo record linked: Metropolis Lab Panel synced.');
      if (onImportSuccess) onImportSuccess();
    }, 1200);
  };

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--teal-light)',
            color: 'var(--teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CreditCard size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.abha?.title || "Health Identity (ABHA / ABDM)"}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Ayushman Bharat Digital Mission Sandbox Integration
            </p>
          </div>
        </div>

        <span className="badge badge-warning">
          <span>{t.abha?.badge || "Demo / Mock Interface"}</span>
        </span>
      </div>

      {/* Mock ABHA Card Visual */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>ABHA HEALTH ID CARD</span>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
            {t.abha?.statusValue || "Sandbox Mock Mode"}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Patient Name</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{patient.name}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Gender / Age</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{patient.gender} • {patient.age} Yrs</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '12px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{t.abha?.mockId || "Mock ABHA ID"}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
              {patient.abhaId || patient.abha_id}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{patient.abhaAddress || patient.abha_address}</div>
          </div>
          <QrCode size={36} style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Import Action & Notification */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          className="btn btn-teal"
          onClick={handleImport}
          disabled={isImporting}
          style={{ padding: '9px 18px', fontSize: '0.88rem' }}
        >
          <Download size={16} />
          <span>{isImporting ? "Querying ABDM Gateway..." : (t.abha?.importBtn || "Import Health Record via ABHA")}</span>
        </button>

        {importStatus && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--success)' }}>
            <CheckCircle2 size={16} />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <AlertCircle size={14} style={{ color: 'var(--warning)', flexShrink: 0 }} />
        <span>{t.abha?.disclaimer || "Demo interface — no live ABDM connection. Simulates how Ayushman Bharat Digital Mission records link into MedJourney AI."}</span>
      </div>
    </div>
  );
};
