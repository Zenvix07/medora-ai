import React, { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Droplet,
  Sun,
  Activity,
  Heart,
  Pill,
  GitCompare,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { sampleComparisonData, mockReports } from '../../data/mockData';
import { apiService } from '../../services/api';

export const WhatChanged = ({ onViewEvidence }) => {
  const { t } = useLanguage();
  const [prevReportId, setPrevReportId] = useState('rep-003'); // June 2026
  const [latestReportId, setLatestReportId] = useState('rep-001'); // Oct 2026
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState(sampleComparisonData.items);

  const availableReports = mockReports.filter(r => r.type === 'Lab Report');

  const handleCompare = async () => {
    setIsComparing(true);
    try {
      const data = await apiService.compareReports(prevReportId, latestReportId);
      if (data && data.items && data.items.length > 0) {
        setComparisonResults(data.items);
      }
    } catch (err) {
      console.warn("Comparison fetch fallback:", err);
    } finally {
      setIsComparing(false);
    }
  };

  const getDirectionBadge = (item) => {
    if (item.direction === 'down') {
      return (
        <span className="badge badge-warning" style={{ gap: '4px' }}>
          <ArrowDownRight size={14} />
          <span>{t.whatChanged?.decreased || "Decreased"}</span>
        </span>
      );
    }
    if (item.direction === 'up') {
      return (
        <span className="badge badge-danger" style={{ gap: '4px' }}>
          <ArrowUpRight size={14} />
          <span>{t.whatChanged?.increased || "Increased"}</span>
        </span>
      );
    }
    if (item.direction === 'down-positive') {
      return (
        <span className="badge badge-success" style={{ gap: '4px' }}>
          <ArrowDownRight size={14} />
          <span>{t.whatChanged?.decreased || "Decreased"} (Target Met)</span>
        </span>
      );
    }
    return (
      <span className="badge badge-teal" style={{ gap: '4px' }}>
        <Minus size={14} />
        <span>{t.whatChanged?.presentBoth || "Present in both records"}</span>
      </span>
    );
  };

  const getParamIcon = (name) => {
    if (name.includes('Hemoglobin')) return Droplet;
    if (name.includes('Vitamin')) return Sun;
    if (name.includes('Glucose')) return Activity;
    if (name.includes('Cholesterol')) return Heart;
    return Pill;
  };

  return (
    <div className="what-changed-card card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <GitCompare size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.whatChanged?.title || "What Changed?"}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {t.whatChanged?.subtitle || "Compare two medical reports side-by-side to track physiological changes over time."}
            </p>
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        gap: '12px',
        alignItems: 'flex-end',
        background: 'var(--bg-subtle)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            {t.whatChanged?.prevLabel || "Previous Report"}
          </label>
          <select
            value={prevReportId}
            onChange={(e) => setPrevReportId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="rep-003">June 2026 (Metropolis)</option>
            <option value="rep-004">January 2026 (Manipal)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
            {t.whatChanged?.latestLabel || "Latest Report"}
          </label>
          <select
            value={latestReportId}
            onChange={(e) => setLatestReportId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="rep-001">October 2026 (Dr. Lal PathLabs)</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCompare}
          disabled={isComparing}
          style={{ height: '38px', padding: '0 18px', fontSize: '0.88rem' }}
        >
          {isComparing ? 'Comparing...' : (t.whatChanged?.btnCompare || "Compare Reports")}
        </button>
      </div>

      {/* Comparison Items Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {comparisonResults.map((item, idx) => {
          const Icon = getParamIcon(item.parameter);
          return (
            <div key={idx} className="diff-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {item.parameter}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.detail}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="diff-value-shift" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.prev}</span>
                  <span style={{ color: 'var(--text-light)' }}>→</span>
                  <span style={{ color: 'var(--text-primary)' }}>{item.latest}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{item.unit !== 'Prescription' ? item.unit : ''}</span>
                </div>

                {getDirectionBadge(item)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Medical Safety Disclaimer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <AlertCircle size={14} style={{ color: 'var(--warning)', flexShrink: 0 }} />
        <span>{t.whatChanged?.disclaimer || "AI comparison is based only on the information available in your uploaded records."}</span>
      </div>
    </div>
  );
};
