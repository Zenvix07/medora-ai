import React from 'react';
import { ArrowRight, TrendingDown, Stethoscope, MessageSquareText, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FeatureHighlights = ({ onExploreFeature }) => {
  const { t } = useLanguage();

  return (
    <section className="features-section" id="features" style={{ padding: '80px 0', background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className="section-badge-center">
          <span className="badge badge-primary">
            <Sparkles size={14} />
            <span>Built for Real-World Healthcare</span>
          </span>
        </div>

        <div className="section-heading-center">
          <h2 className="section-title">
            Intelligent Health Insights Without The Complexity
          </h2>
          <p className="section-sub">
            Designed to bridge the gap between technical pathology parameters and everyday patient understanding.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Card 1: What Changed & Trend Detection */}
          <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--warning-light)',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingDown size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                "What Changed?" Report Comparison
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Compare medical reports from different months or hospitals side-by-side. Spot subtle physiological changes before your routine doctor visits.
              </p>
            </div>
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Hemoglobin Change:</span>
                <span style={{ color: 'var(--warning-text)', fontWeight: 700 }}>11.4 → 10.2 g/dL (Decreased)</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--primary)', fontWeight: 600 }}
              onClick={() => onExploreFeature('trends')}
            >
              <span>Explore Trend Visualizer</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 2: Doctor Visit Briefing */}
          <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Stethoscope size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Doctor Visit Briefing Packs
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Arrive prepared for clinical appointments. Generate one-click executive summaries with pertinent recent fluctuations and personalized discussion points.
              </p>
            </div>
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                <span>Auto-generates relevant consultation questions</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--primary)', fontWeight: 600 }}
              onClick={() => onExploreFeature('doctorVisit')}
            >
              <span>View Doctor Visit Copilot</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card 3: Multilingual Copilot */}
          <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--teal-light)',
              color: 'var(--teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquareText size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Chat With Your Health Records
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Ask questions in Tamil, Hindi, Telugu, or English. Get clear answers grounded exclusively in your medical history with citations to source scans.
              </p>
            </div>
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--teal)', fontWeight: 600 }}>
                🇮🇳 "எனது சமீபத்திய அறிக்கையில் என்ன மாற்றம் உள்ளது?"
              </div>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--primary)', fontWeight: 600 }}
              onClick={() => onExploreFeature('copilot')}
            >
              <span>Try Regional Health Copilot</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
