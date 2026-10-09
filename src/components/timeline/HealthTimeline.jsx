import React, { useState, useEffect } from 'react';
import { Clock, FileText, Pill, FlaskConical, Calendar, ChevronRight, Filter, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';

export const HealthTimeline = ({ onOpenDocument, onViewEvidence }) => {
  const { t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    apiService.getHealthTimeline()
      .then(data => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Lab Report', 'Prescription', 'Diagnostic Scan'];

  const filteredEvents = filterCategory === 'All'
    ? events
    : events.filter(e => e.category === filterCategory);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Lab Report': return 'badge-primary';
      case 'Prescription': return 'badge-teal';
      case 'Diagnostic Scan': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Lab Report': return FlaskConical;
      case 'Prescription': return Pill;
      case 'Diagnostic Scan': return FileText;
      default: return Calendar;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header and Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t.nav?.timeline || "Health Timeline"}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {loading ? "Loading chronology..." : `Chronological continuum of ${events.length} milestones across tests and prescriptions`}
          </p>
        </div>

        {/* Filters */}
        <div className="tab-pill-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tab-pill ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '10px' }}>
          <Loader2 size={20} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading timeline events...</span>
        </div>
      )}

      {!loading && (
        <>
          {/* Year Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              2026
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          </div>

          {/* Vertical Timeline Track */}
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            {/* Continuous vertical line */}
            <div style={{
              position: 'absolute',
              top: '12px',
              bottom: '24px',
              left: '11px',
              width: '2px',
              background: 'var(--border-color)'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filteredEvents.map((event) => {
                const Icon = getCategoryIcon(event.category);
                return (
                  <div key={event.id} style={{ position: 'relative' }}>
                    {/* Node dot on vertical line */}
                    <div style={{
                      position: 'absolute',
                      top: '18px',
                      left: '-28px',
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-surface)',
                      border: '2px solid var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      boxShadow: 'var(--shadow-xs)'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: 'var(--radius-full)', background: 'var(--primary)' }} />
                    </div>

                    {/* Event Card */}
                    <div
                      className="card card-interactive"
                      onClick={() => onOpenDocument && onOpenDocument('/images/medical_report_scan.jpg')}
                      style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`badge ${getCategoryBadgeClass(event.category)}`}>
                            <Icon size={12} />
                            <span>{event.category}</span>
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                            {event.date}
                          </span>
                        </div>

                        <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
                          {event.badge}
                        </span>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          {event.title}
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Facility: {event.facility}
                        </p>
                      </div>

                      {/* Highlights */}
                      {event.highlights && event.highlights.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          padding: '10px 14px',
                          background: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)'
                        }}>
                          {event.highlights.map((h, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                background: 'var(--bg-surface)',
                                padding: '4px 10px',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border-color)',
                                fontFamily: h.includes(':') ? 'var(--font-mono)' : 'inherit'
                              }}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                        <span>Click to inspect original scan</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
