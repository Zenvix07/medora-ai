import React, { useState, useEffect } from 'react';
import { Bell, User, Search, Upload, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { apiService } from '../../services/api';

export const DashboardHeader = ({ onNavigate, onSelectInsight, onOpenUpload }) => {
  const { t } = useLanguage();
  const [notifOpen, setNotifOpen] = useState(false);
  const [patient, setPatient] = useState({ name: "Demo Patient", abha_id: "DEMO-ABHA-001" });
  const [greeting, setGreeting] = useState("Good morning 👋");

  useEffect(() => {
    // Dynamic greeting calculation
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning 👋");
    } else if (hour < 17) {
      setGreeting("Good afternoon 👋");
    } else {
      setGreeting("Good evening 👋");
    }

    // Fetch dynamic patient profile from API
    apiService.getPatient().then(data => {
      if (data) setPatient(data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <header className="dashboard-header">
      {/* Dynamic Greeting Title */}
      <div>
        <h1 className="dashboard-greeting-title">
          {greeting}
        </h1>
        <p className="dashboard-greeting-sub">
          {t.dashboard?.subtitle || "Here's an overview of your health records."}
        </p>
      </div>

      {/* Header Actions */}
      <div className="dashboard-header-right" style={{ position: 'relative' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenUpload}
          style={{ padding: '8px 14px', fontSize: '0.86rem' }}
        >
          <Upload size={15} />
          <span>Add Record</span>
        </button>

        <LanguageSelector compact={true} />
        <ThemeToggle />

        {/* Notifications Button */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--danger)',
              border: '2px solid var(--bg-surface)'
            }} />
          </button>

          <NotificationDrawer
            isOpen={notifOpen}
            onClose={() => setNotifOpen(false)}
            onSelectInsight={onSelectInsight}
          />
        </div>

        {/* Dynamic User Profile Pill */}
        <div className="user-profile-pill" title="Patient Profile from Database">
          <div className="user-avatar">
            {(patient.name || "Patient").split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {patient.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              ABHA: {(patient.abha_id || "DEMO-ABHA").slice(0, 11)}...
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
