import React from 'react';
import { Upload, FileSearch, BrainCircuit, LineChart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const HowItWorks = ({ onStartUpload }) => {
  const { t } = useLanguage();

  const stepIcons = [Upload, FileSearch, BrainCircuit, LineChart];

  const steps = t.howItWorks?.steps || [
    { num: "01", title: "Upload", desc: "Upload a prescription, lab report, diagnostic report, or medical document." },
    { num: "02", title: "Extract", desc: "OCR and AI extract relevant information from your document." },
    { num: "03", title: "Understand", desc: "AI converts complex medical information into simple language." },
    { num: "04", title: "Connect", desc: "See your health history, trends, and important changes in one place." }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-badge-center">
          <span className="badge badge-teal">
            <Sparkles size={14} />
            <span>{t.howItWorks?.badge || "Simple 4-Step Process"}</span>
          </span>
        </div>

        <div className="section-heading-center">
          <h2 className="section-title">
            {t.howItWorks?.title || "How MedJourney AI Works"}
          </h2>
          <p className="section-sub">
            {t.howItWorks?.subtitle || "Turn paper prescriptions and complex lab sheets into an organized digital health continuum."}
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Upload;
            return (
              <div key={idx} className="step-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="step-icon-wrap">
                    <Icon size={24} />
                  </div>
                  <span className="step-number">{step.num}</span>
                </div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onStartUpload}
            style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: 'var(--radius-lg)' }}
          >
            <Upload size={18} />
            <span>Upload Your Health Record Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
