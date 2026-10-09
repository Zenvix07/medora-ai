import React from 'react';
import { Lock, Bot, FileText, Globe, Stethoscope, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TrustSection = () => {
  const { t } = useLanguage();

  const trustCards = [
    {
      icon: Lock,
      title: t.trust?.cards?.privacy?.title || "Privacy-focused",
      desc: t.trust?.cards?.privacy?.desc || "Client-level data safety with verifiable encryption.",
      accent: "var(--primary)"
    },
    {
      icon: Bot,
      title: t.trust?.cards?.ai?.title || "AI-assisted",
      desc: t.trust?.cards?.ai?.desc || "Transparent clinical summarization with factual provenance.",
      accent: "var(--teal)"
    },
    {
      icon: FileText,
      title: t.trust?.cards?.doc?.title || "Document intelligence",
      desc: t.trust?.cards?.doc?.desc || "Advanced OCR extracting lab parameters, units, and dosage rules.",
      accent: "#6366f1"
    },
    {
      icon: Globe,
      title: t.trust?.cards?.multi?.title || "Multilingual",
      desc: t.trust?.cards?.multi?.desc || "Instant native context in 10 Indian regional languages.",
      accent: "var(--warning)"
    },
    {
      icon: Stethoscope,
      title: t.trust?.cards?.doctor?.title || "Doctor conversation support",
      desc: t.trust?.cards?.doctor?.desc || "Prepares concise question checklists for consultations.",
      accent: "var(--success)"
    }
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-header">
          <h2 className="trust-title">
            {t.trust?.headline || "Designed to make personal health information easier to understand."}
          </h2>

          <div className="trust-disclaimer">
            <AlertCircle size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
            <span>
              {t.trust?.disclaimer || "MedJourney AI provides informational support and does not replace professional medical advice, diagnosis, or treatment."}
            </span>
          </div>
        </div>

        <div className="trust-cards-grid">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-card-icon" style={{ color: card.accent }}>
                  <Icon size={22} />
                </div>
                <h3 className="trust-card-title">{card.title}</h3>
                <p className="trust-card-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
