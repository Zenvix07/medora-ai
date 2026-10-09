import React, { useState, useEffect } from 'react';
import { Pill, AlertCircle, Clock, Calendar, CheckCircle2, FileText, ShieldAlert, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/api';

export const MedicationTracker = ({ onOpenPrescription }) => {
  const { t } = useLanguage();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    apiService.getMedications()
      .then(data => {
        setMedications(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredMeds = filter === 'All'
    ? medications
    : medications.filter(m => m.status === filter);

  const activeCount = medications.filter(m => m.status === 'Active').length;
  const pastCount = medications.filter(m => m.status !== 'Active').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header and Filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t.medications?.title || "Medication Tracker"}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {loading ? "Loading prescriptions..." : `Tracking ${medications.length} active and completed prescriptions`}
          </p>
        </div>

        <div className="tab-pill-bar">
          {['All', 'Active', 'Past'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-pill ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'All' ? `All (${medications.length})` : (tab === 'Active' ? `Active (${activeCount})` : `Past (${pastCount})`)}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)'
      }}>
        <ShieldAlert size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
        <span>
          {t.medications?.safetyNotice || "MedJourney AI tracks records only. Never stop or change medication without consulting your doctor."}
        </span>
      </div>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '10px' }}>
          <Loader2 size={20} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading medication records...</span>
        </div>
      )}

      {/* Medication Cards Grid */}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredMeds.map((med) => {
            const isActive = med.status === 'Active';
            return (
              <div
                key={med.id}
                className="card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  borderTop: `4px solid ${med.color || 'var(--primary)'}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        background: `${med.color || '#0284c7'}15`,
                        color: med.color || '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Pill size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {med.name}
                        </h3>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: med.color || '#0284c7', fontFamily: 'var(--font-mono)' }}>
                          {med.dosage}
                        </span>
                      </div>
                    </div>

                    <span className={`badge ${isActive ? 'badge-success' : 'badge-secondary'}`}>
                      {isActive ? "Active" : "Completed"}
                    </span>
                  </div>

                  {/* Details Table */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Frequency:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.frequency}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Timing:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.timing}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Duration:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.duration}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                      <span>Clinical Indication:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{med.indication}</span>
                    </div>
                  </div>
                </div>

                {/* Source Document Reference */}
                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={13} style={{ color: 'var(--primary)' }} />
                    <span>{med.sourcePrescription}</span>
                  </div>
                  <span>{med.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
