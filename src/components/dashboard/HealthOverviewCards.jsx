import React, { useState, useEffect } from 'react';
import { FileText, Pill, FlaskConical, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';

export const HealthOverviewCards = ({ onSelectTab }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    records: 0,
    recordsChange: "+2 this month",
    meds: 0,
    medsChange: "Active",
    labs: 0,
    labsChange: "Need attention",
    trends: 0,
    trendsChange: "Tracked biomarkers"
  });

  useEffect(() => {
    apiService.getDashboard().then(data => {
      if (data) {
        setStats({
          records: data.total_reports || 0,
          recordsChange: `+${Math.min(2, data.total_reports)} this month`,
          meds: data.total_medications || 0,
          medsChange: `${data.active_medications || 0} active`,
          labs: data.total_lab_results || 0,
          labsChange: `${data.lab_results_attention || 0} need attention`,
          trends: data.health_trends_count || 0,
          trendsChange: "Active biometric trends"
        });
      }
    }).catch(err => console.error(err));
  }, []);

  const cards = [
    {
      id: 'records',
      title: t.dashboard?.stats?.recordsTitle || "Medical Records",
      count: stats.records,
      sub: stats.recordsChange,
      icon: FileText,
      accent: "var(--primary)",
      iconBg: "var(--primary-light)",
      tab: 'records'
    },
    {
      id: 'meds',
      title: t.dashboard?.stats?.medsTitle || "Medications",
      count: stats.meds,
      sub: stats.medsChange,
      icon: Pill,
      accent: "var(--teal)",
      iconBg: "var(--teal-light)",
      tab: 'medications'
    },
    {
      id: 'labs',
      title: t.dashboard?.stats?.labsTitle || "Lab Results",
      count: stats.labs,
      sub: stats.labsChange,
      icon: FlaskConical,
      accent: "var(--warning)",
      iconBg: "var(--warning-light)",
      tab: 'labs'
    },
    {
      id: 'trends',
      title: t.dashboard?.stats?.trendsTitle || "Health Trends",
      count: stats.trends,
      sub: stats.trendsChange,
      icon: TrendingUp,
      accent: "#6366f1",
      iconBg: "rgba(99, 102, 241, 0.12)",
      tab: 'trends'
    }
  ];

  return (
    <div className="stats-grid animate-fade-in">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="stat-card card-interactive"
            onClick={() => onSelectTab && onSelectTab(card.tab)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelectTab(card.tab); }}
          >
            <div className="stat-header">
              <span className="stat-card-title">{card.title}</span>
              <div className="stat-icon" style={{ background: card.iconBg, color: card.accent }}>
                <Icon size={20} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span className="stat-card-number">{card.count}</span>
              <ArrowUpRight size={16} style={{ color: 'var(--text-light)' }} />
            </div>

            <div className="stat-card-change" style={{ color: card.accent }}>
              {card.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
};
