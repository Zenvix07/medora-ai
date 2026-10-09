import React from 'react';
import { Upload, ArrowRight, FileCheck, TrendingUp, Pill, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection = ({ onUploadClick, onHowItWorksClick, onExploreDashboard }) => {
  const { t } = useLanguage();

  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-glow" />

      <div className="container hero-grid">
        {/* Left Column: Text & CTA */}
        <div className="hero-content animate-fade-in">
          <div style={{ display: 'inline-flex' }}>
            <span className="badge badge-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
              <Sparkles size={14} />
              <span>{t.hero?.badge || "AI-Powered Personal Health Copilot"}</span>
            </span>
          </div>

          <h1 className="hero-title">
            Your Health History.<br />
            <span className="hero-title-highlight">One Clear Story.</span>
          </h1>

          <p className="hero-subtitle">
            {t.hero?.subheading || "MedJourney AI turns complex medical records into simple, understandable insights — helping you stay informed throughout your healthcare journey."}
          </p>

          <div className="hero-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onUploadClick}
              style={{ padding: '14px 26px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}
            >
              <Upload size={18} />
              <span>{t.hero?.uploadCta || "Upload Your Health Record"}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHowItWorksClick}
              style={{ padding: '14px 22px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}
            >
              <span>{t.hero?.howItWorksCta || "See How It Works"}</span>
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={onExploreDashboard}
              style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--primary)' }}
            >
              <span>Live Patient Demo →</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Shield size={16} style={{ color: 'var(--teal)' }} />
              <span>No Medical Jargon</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <FileCheck size={16} style={{ color: 'var(--primary)' }} />
              <span>Evidence-Linked OCR</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>🇮🇳 10 Indian Languages</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Authentic Photo + Floating Medical UI Cards */}
        <div className="hero-visual-wrapper">
          <div className="hero-image-frame animate-fade-in">
            <img
              src="/images/hero_doctor_patient.jpg"
              alt="Doctor and patient reviewing digital medical report insights on tablet"
              loading="eager"
            />
          </div>

          {/* Floating Card 1: 12 Reports Organized */}
          <div className="hero-floating-card hero-floating-1 animate-float">
            <div className="floating-icon-box" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <FileCheck size={20} />
            </div>
            <div>
              <div className="floating-card-text">{t.hero?.cards?.reports || "12 Reports Organized"}</div>
              <div className="floating-card-sub">CBC, Prescriptions & Labs</div>
            </div>
          </div>

          {/* Floating Card 2: 3 Health Trends Detected */}
          <div className="hero-floating-card hero-floating-2 animate-float-reverse">
            <div className="floating-icon-box" style={{ background: 'var(--warning-light)', color: 'var(--warning)' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="floating-card-text">{t.hero?.cards?.trends || "3 Health Trends Detected"}</div>
              <div className="floating-card-sub">Hemoglobin & Glucose shifts</div>
            </div>
          </div>

          {/* Floating Card 3: 5 Medications Tracked */}
          <div className="hero-floating-card hero-floating-3 animate-float">
            <div className="floating-icon-box" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
              <Pill size={20} />
            </div>
            <div>
              <div className="floating-card-text">{t.hero?.cards?.meds || "5 Medications Tracked"}</div>
              <div className="floating-card-sub">Active: Metformin, Vitamin D3</div>
            </div>
          </div>

          {/* Floating Card 4: AI Summary Ready */}
          <div className="hero-floating-card hero-floating-4 animate-float-reverse">
            <div className="floating-icon-box" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div className="floating-card-text">{t.hero?.cards?.summary || "AI Summary Ready"}</div>
              <div className="floating-card-sub">Simple plain-language notes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
