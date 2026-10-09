import React from 'react';
import {
  Home,
  FileText,
  Pill,
  FlaskConical,
  TrendingUp,
  Clock,
  MessageSquareText,
  Stethoscope,
  Settings,
  Share2,
  ShieldCheck,
  CreditCard,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ activeTab, onSelectTab, onOpenPrivacy, onGoLanding }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'overview', label: t.dashboard?.overview || "Overview", icon: Home },
    { id: 'records', label: t.dashboard?.records || "Medical Records", icon: FileText, count: 12 },
    { id: 'medications', label: t.dashboard?.medications || "Medications", icon: Pill, count: 4 },
    { id: 'labs', label: t.dashboard?.labResults || "Lab Results", icon: FlaskConical, count: 27 },
    { id: 'trends', label: t.dashboard?.trends || "Health Trends", icon: TrendingUp },
    { id: 'timeline', label: t.dashboard?.timeline || "Health Timeline", icon: Clock },
    { id: 'copilot', label: t.dashboard?.copilot || "AI Copilot", icon: MessageSquareText, badge: "AI" },
    { id: 'doctorVisit', label: t.dashboard?.doctorVisit || "Doctor Visit", icon: Stethoscope },
    { id: 'healthGraph', label: t.dashboard?.healthGraph || "Health Graph", icon: Share2 },
    { id: 'abha', label: "ABHA Health ID", icon: CreditCard },
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Header */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}
          onClick={onGoLanding}
        >
          <div className="brand-icon-wrapper" style={{ width: '36px', height: '36px' }}>
            <Stethoscope size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              MedJourney<span style={{ color: 'var(--primary)' }}>.ai</span>
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--teal)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Personal Health Copilot
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(item.id)}
              >
                <Icon size={18} style={{ color: isActive ? 'var(--primary)' : 'inherit', flexShrink: 0 }} />
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.count && (
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 7px',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontWeight: 700
                  }}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--teal-light)',
                    color: 'var(--teal)',
                    fontWeight: 800,
                    border: '1px solid var(--teal-border)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-item"
          onClick={onOpenPrivacy}
        >
          <ShieldCheck size={18} />
          <span>Privacy & Safety</span>
        </button>

        <button
          type="button"
          className="sidebar-item"
          onClick={onGoLanding}
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={18} />
          <span>Back to Landing</span>
        </button>
      </div>
    </aside>
  );
};
