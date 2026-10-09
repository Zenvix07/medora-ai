import React, { useState, useEffect } from 'react';
import { FlaskConical, AlertTriangle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const LabResultsList = ({ onViewEvidence }) => {
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiService.getLabResults()
      .then(data => {
        setLabResults(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'low':
      case 'below_range':
        return <span className="badge badge-warning">Below Reference</span>;
      case 'high':
      case 'above_range':
        return <span className="badge badge-danger">Above Reference</span>;
      case 'attention':
        return <span className="badge badge-warning">Borderline</span>;
      default:
        return <span className="badge badge-success">Normal</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Laboratory Diagnostic Biomarkers
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {loading ? "Loading results from database..." : `Displaying ${labResults.length} standardized clinical test parameters`}
        </p>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '10px' }}>
            <Loader2 size={20} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
            <span>Loading lab results...</span>
          </div>
        ) : (
          <div className="data-table-wrapper">
            <table className="table-clinical">
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Measured Value</th>
                  <th>Standard Reference Range</th>
                  <th>Clinical Status</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {labResults.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 700 }}>
                      {t.parameter || t.test_name}
                      {t.note && <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 400 }}>{t.note}</div>}
                    </td>
                    <td>
                      <span style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                        {t.value} {t.unit}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                      {t.range || t.reference_range}
                    </td>
                    <td>
                      {getStatusBadge(t.status)}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>
                        ✓ {t.confidence || 95}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
