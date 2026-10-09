import React from 'react';
import { Stethoscope, Shield, Heart, Globe, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = ({ onOpenPrivacy, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '56px 0 28px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {/* Col 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
                <Stethoscope size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                MedJourney<span style={{ color: 'var(--primary)' }}>.ai</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '320px' }}>
              An AI-powered personal health copilot bridging clinical records and human clarity across India's regional languages.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Lock size={14} style={{ color: 'var(--teal)' }} />
              <span>AES-256 Encrypted • ABHA Ready Architecture</span>
            </div>
          </div>

          {/* Col 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Product</div>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={() => onNavigate('dashboard')}>
              Health Dashboard
            </button>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={() => onNavigate('timeline')}>
              Health Timeline
            </button>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={() => onNavigate('trends')}>
              Trend Analysis
            </button>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={() => onNavigate('doctorVisit')}>
              Doctor Visit Briefing
            </button>
          </div>

          {/* Col 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Regional Support</div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🇮🇳 தமிழ் (Tamil)</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🇮🇳 हिन्दी (Hindi)</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🇮🇳 తెలుగు (Telugu)</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>+ 7 Other Indian Languages</span>
          </div>

          {/* Col 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Trust & Ethics</div>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={onOpenPrivacy}>
              Privacy & Security
            </button>
            <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start', padding: 0, fontSize: '0.85rem' }} onClick={onOpenPrivacy}>
              Medical AI Guidelines
            </button>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ISO 27001 Preparedness</span>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div style={{
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '780px', lineHeight: 1.5 }}>
            <strong>Medical Disclaimer:</strong> MedJourney AI provides informational synthesis and personal document management. It does NOT provide medical advice, diagnosis, or treatment plans. Always consult your qualified healthcare practitioner regarding any medical condition or before making changes to medication.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} MedJourney AI Technologies. Built for India & Beyond.
          </div>
        </div>
      </div>
    </footer>
  );
};
