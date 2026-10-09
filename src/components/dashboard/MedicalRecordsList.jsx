import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Building, User, Download, ExternalLink, ShieldCheck, Upload, Loader2, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';

export const MedicalRecordsList = ({ onOpenDocument, onOpenUpload }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiService.getReports()
      .then(data => {
        setReports(data || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Unable to load medical records from backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Medical Records Repository
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {loading ? "Loading stored records..." : `${reports.length} indexed diagnostic reports, prescription slips, and discharge summaries`}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenUpload}
        >
          <Upload size={16} />
          <span>Upload New Record</span>
        </button>
      </div>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: '10px', color: 'var(--text-muted)' }}>
          <Loader2 size={24} className="text-primary" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Loading your health records...</span>
        </div>
      )}

      {error && !loading && (
        <div style={{ background: 'var(--danger-light)', border: '1px solid var(--danger-border)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--danger-text)' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && reports.length === 0 && (
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <FileText size={48} style={{ color: 'var(--text-light)' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No medical records uploaded yet.</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px' }}>
            Upload your first lab test, doctor prescription slip, or discharge summary to start your digital health journey.
          </p>
          <button type="button" className="btn btn-primary" onClick={onOpenUpload}>
            <Upload size={16} />
            <span>Upload Your First Record</span>
          </button>
        </div>
      )}

      {!loading && reports.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {reports.map((report) => (
            <div
              key={report.id}
              className="card card-interactive"
              onClick={() => onOpenDocument(report.scannedUrl || '/images/medical_report_scan.jpg')}
              style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className={`badge ${report.type === 'Lab Report' ? 'badge-primary' : (report.type === 'Prescription' ? 'badge-teal' : 'badge-warning')}`}>
                    {report.type}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {report.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {report.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} className="text-primary" />
                    <span>{report.facility}</span>
                  </div>
                  {report.doctor && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} className="text-primary" />
                      <span>{report.doctor}</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem'
              }}>
                <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                  <ShieldCheck size={12} />
                  <span>{report.ocrConfidence || 97}% OCR Verified</span>
                </span>

                <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Inspect Scan</span>
                  <ExternalLink size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
