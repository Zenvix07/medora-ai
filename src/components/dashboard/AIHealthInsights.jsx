import React from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Pill, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockInsights } from '../../data/mockData';

export const AIHealthInsights = ({ onViewEvidence, onCompareReports, onSelectTab }) => {
  const { t } = useLanguage();

  const handleAction = (insight) => {
    if (insight.actionType === 'compare' && onCompareReports) {
      onCompareReports();
    } else if (insight.actionType === 'medication' && onSelectTab) {
      onSelectTab('medications');
    } else if (onViewEvidence) {
      onViewEvidence(insight.evidenceData);
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'warning':
        return { badgeClass: 'badge-warning', icon: AlertTriangle };
      case 'alert':
        return { badgeClass: 'badge-danger', icon: TrendingUp };
      default:
        return { badgeClass: 'badge-primary', icon: Pill };
    }
  };

  return (
    <section className="insights-section animate-fade-in">
      <div className="section-head-bar">
        <div>
          <h2 className="section-head-title">
            <Sparkles size={20} className="text-primary" />
            <span>{t.dashboard?.insightsTitle || "AI Health Insights"}</span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {t.dashboard?.insightsSubtitle || "Clinical observations synthesized from your uploaded records with verifiable evidence."}
          </p>
        </div>
        <span className="badge badge-teal">
          <ShieldCheck size={13} />
          <span>Evidence Grounded</span>
        </span>
      </div>

      <div className="insights-grid">
        {mockInsights.map((insight) => {
          const { badgeClass, icon: BadgeIcon } = getBadgeStyle(insight.type);
          return (
            <div key={insight.id} className={`insight-card ${insight.type}`}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className={`badge ${badgeClass}`}>
                    <BadgeIcon size={13} />
                    <span>{insight.badge}</span>
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--success)', fontWeight: 700 }}>
                    <CheckCircle2 size={13} />
                    <span>{insight.confidence}% confidence</span>
                  </div>
                </div>

                <p className="insight-card-text">
                  "{insight.text}"
                </p>
              </div>

              <div>
                <div className="insight-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Source: {insight.sourceDocument}</span>
                  </div>
                  <div>Recorded on: {insight.date}</div>
                </div>

                <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleAction(insight)}
                    style={{
                      width: '100%',
                      padding: '8px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{insight.actionText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
