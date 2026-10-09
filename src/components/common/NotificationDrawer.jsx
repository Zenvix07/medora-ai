import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Clock, X } from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose, onSelectInsight }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: "notif-1",
      title: "Biomarker Trend Alert",
      text: "Hemoglobin dropped to 10.2 g/dL in October 2026 report.",
      time: "2 hours ago",
      type: "warning",
      unread: true,
      insightId: "ins-001"
    },
    {
      id: "notif-2",
      title: "Medication Schedule Active",
      text: "Weekly Vitamin D3 60,000 IU dose scheduled for Sunday.",
      time: "1 day ago",
      type: "info",
      unread: true,
    },
    {
      id: "notif-3",
      title: "OCR Document Ingestion Complete",
      text: "Comprehensive Metabolic & CBC Panel from Dr. Lal PathLabs parsed with 97% confidence.",
      time: "2 days ago",
      type: "success",
      unread: false,
    }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 10px)',
      right: '20px',
      width: '360px',
      maxWidth: '90vw',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-xl)',
      zIndex: 100,
      overflow: 'hidden'
    }} className="animate-fade-in">
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={16} className="text-primary" />
          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Health Notifications</span>
        </div>
        <button type="button" onClick={onClose} className="btn btn-ghost" style={{ padding: '4px' }}>
          <X size={16} />
        </button>
      </div>

      <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px' }}>
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.insightId && onSelectInsight) {
                onSelectInsight(item.insightId);
                onClose();
              }
            }}
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: item.unread ? 'var(--primary-light)' : 'transparent',
              marginBottom: '6px',
              cursor: item.insightId ? 'pointer' : 'default',
              transition: 'background var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.title}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.time}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
