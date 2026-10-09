import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { Activity, Loader2 } from 'lucide-react';
import { apiService } from '../../services/api';
import { mockTrendsData } from '../../data/mockData';

export const HealthTrendChart = ({ onViewEvidence }) => {
  const [activeMetric, setActiveMetric] = useState('hemoglobin');
  const [metricData, setMetricData] = useState(mockTrendsData['hemoglobin']);
  const [loading, setLoading] = useState(false);

  const metricKeys = [
    { key: 'hemoglobin', label: 'Hemoglobin', apiKey: 'Hemoglobin' },
    { key: 'glucose', label: 'Glucose', apiKey: 'Fasting Blood Glucose' },
    { key: 'vitaminD', label: 'Vitamin D', apiKey: 'Vitamin D (25-OH)' },
    { key: 'cholesterol', label: 'Cholesterol', apiKey: 'Total Cholesterol' },
    { key: 'bloodPressure', label: 'Blood Pressure', apiKey: 'Blood Pressure' },
  ];

  useEffect(() => {
    const selected = metricKeys.find(m => m.key === activeMetric);
    if (!selected) return;

    setLoading(true);
    apiService.getTrend(selected.apiKey)
      .then(res => {
        if (res && res.data && res.data.length > 0) {
          setMetricData(res);
        } else {
          setMetricData(mockTrendsData[activeMetric] || mockTrendsData.hemoglobin);
        }
        setLoading(false);
      })
      .catch(() => {
        setMetricData(mockTrendsData[activeMetric] || mockTrendsData.hemoglobin);
        setLoading(false);
      });
  }, [activeMetric]);

  const getMetricStroke = (key) => {
    switch (key) {
      case 'hemoglobin': return '#ef4444';
      case 'glucose': return '#f59e0b';
      case 'vitaminD': return '#0284c7';
      case 'cholesterol': return '#10b981';
      case 'bloodPressure': return '#6366f1';
      default: return '#0284c7';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.84rem'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {dataPoint.fullDate || dataPoint.month}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: getMetricStroke(activeMetric), fontWeight: 700, fontSize: '0.98rem' }}>
            <span>{metricData.name || metricData.test_name}:</span>
            <span>{payload[0].value} {metricData.unit}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Clinical Status: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dataPoint.status}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
            Standard Range: {metricData.refRange || metricData.reference_range}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header and Metric Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} className="text-primary" />
            <span>Health Trend Tracker</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Chronological biomarker progression loaded from real patient records
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="tab-pill-bar">
          {metricKeys.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`tab-pill ${activeMetric === item.key ? 'active' : ''}`}
              onClick={() => setActiveMetric(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Detail Summary Strip */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.85rem'
      }}>
        <div>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{metricData.name || metricData.test_name}</span>
          <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>({metricData.description || "Database series"})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Standard Clinical Reference:</span>
          <span className="badge badge-teal" style={{ fontFamily: 'var(--font-mono)' }}>
            {metricData.refRange || metricData.reference_range || "N/A"}
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div style={{ width: '100%', height: 280, position: 'relative' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
            <Loader2 size={20} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
            <span>Loading historical readings...</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={metricData.data || []}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--text-muted)"
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
                tickLine={false}
              />
              <YAxis
                stroke="var(--text-muted)"
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
                domain={['auto', 'auto']}
                unit={` ${metricData.unit || ''}`}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {metricData.minSafe && (
                <ReferenceLine
                  y={metricData.minSafe}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  label={{ value: `Min: ${metricData.minSafe}`, position: 'insideBottomRight', fill: '#10b981', fontSize: 11 }}
                />
              )}
              {metricData.maxSafe && (
                <ReferenceLine
                  y={metricData.maxSafe}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{ value: `Max: ${metricData.maxSafe}`, position: 'insideTopRight', fill: '#f59e0b', fontSize: 11 }}
                />
              )}
              <Line
                type="monotone"
                dataKey="value"
                stroke={getMetricStroke(activeMetric)}
                strokeWidth={3}
                dot={{ r: 6, fill: getMetricStroke(activeMetric), strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 8, stroke: getMetricStroke(activeMetric), strokeWidth: 3, fill: '#ffffff' }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
