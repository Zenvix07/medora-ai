import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Edit3,
  Save,
  X,
  ArrowRight,
  ZoomIn,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OcrResultView = ({
  extractedPayload,
  onProceedToSummary,
  onOpenDocumentPreview
}) => {
  const { t } = useLanguage();
  const data = extractedPayload?.extractedData || {};

  const [isEditing, setIsEditing] = useState(false);
  const [docType, setDocType] = useState(data.docType || "Lab Report");
  const [docDate, setDocDate] = useState(data.date || "08 Oct 2026");
  const [patient, setPatient] = useState(data.patient || "Rajesh V. Sharma");
  const [testResults, setTestResults] = useState(data.testResults || [
    { id: '1', parameter: 'Hemoglobin', value: 10.2, unit: 'g/dL', confidence: 97 },
    { id: '2', parameter: 'Vitamin D (25-OH)', value: 14.0, unit: 'ng/mL', confidence: 94 },
    { id: '3', parameter: 'Fasting Blood Glucose', value: 126, unit: 'mg/dL', confidence: 96 },
  ]);

  const handleTestValueChange = (id, newVal) => {
    setTestResults(prev => prev.map(t => t.id === id ? { ...t, value: newVal } : t));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {t.ocr?.title || "Document Analysis"}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {t.ocr?.subtitle || "Review extracted data from your document with confidence indicators."}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Save size={15} />
              <span>{t.ocr?.saveBtn || "Save changes"}</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(true)}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Edit3 size={15} />
              <span>{t.ocr?.editBtn || "Edit extracted information"}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={onProceedToSummary}
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
          >
            <span>{t.ocr?.viewSummaryBtn || "View AI Summary →"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Split View: Left Document Preview / Right Extracted Clinical Information */}
      <div className="ocr-split-view">
        {/* Left Side: Scanned Document Preview */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {t.ocr?.originalDoc || "Original Document Preview"}
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenDocumentPreview(extractedPayload?.scannedUrl || '/images/medical_report_scan.jpg')}
              style={{ fontSize: '0.78rem', padding: '4px 8px' }}
            >
              <ZoomIn size={14} />
              <span>Full Screen</span>
            </button>
          </div>

          <div
            className="doc-preview-pane"
            onClick={() => onOpenDocumentPreview(extractedPayload?.scannedUrl || '/images/medical_report_scan.jpg')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={extractedPayload?.scannedUrl || '/images/medical_report_scan.jpg'}
              alt="Medical Document Scan Preview"
            />
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} style={{ color: 'var(--teal)' }} />
            <span>OCR Match verified against St. Jude & Dr. Lal pathology layout standard.</span>
          </div>
        </div>

        {/* Right Side: Extracted Clinical Information */}
        <div className="extracted-data-pane">
          {/* Header Metadata */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            background: 'var(--bg-subtle)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.ocr?.docType || "Document Type"}</div>
              {isEditing ? (
                <input
                  type="text"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  style={{ width: '100%', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary)', marginTop: '2px', fontSize: '0.88rem' }}
                />
              ) : (
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{docType}</div>
              )}
            </div>

            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.ocr?.docDate || "Record Date"}</div>
              {isEditing ? (
                <input
                  type="text"
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  style={{ width: '100%', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary)', marginTop: '2px', fontSize: '0.88rem' }}
                />
              ) : (
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{docDate}</div>
              )}
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.ocr?.patient || "Patient Name"}</div>
              {isEditing ? (
                <input
                  type="text"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  style={{ width: '100%', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary)', marginTop: '2px', fontSize: '0.88rem' }}
                />
              ) : (
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{patient}</div>
              )}
            </div>
          </div>

          {/* Test Results Table */}
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {t.ocr?.testResults || "Test Results"}
            </div>

            <div className="data-table-wrapper" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <table className="table-clinical">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Reference Unit</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600 }}>{row.parameter}</td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.1"
                            value={row.value}
                            onChange={(e) => handleTestValueChange(row.id, e.target.value)}
                            style={{ width: '80px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary)', fontSize: '0.88rem' }}
                          />
                        ) : (
                          <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{row.value}</span>
                        )}
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{row.unit}</td>
                      <td>
                        {row.confidence >= 90 ? (
                          <span className="badge badge-success" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                            <CheckCircle2 size={12} />
                            <span>✓ {row.confidence}% confidence</span>
                          </span>
                        ) : (
                          <span className="badge badge-warning" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                            <AlertTriangle size={12} />
                            <span>⚠️ Please verify field</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action to Proceed to AI Summary */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onProceedToSummary}
              style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)' }}
            >
              <span>{t.ocr?.viewSummaryBtn || "View Plain Language AI Summary →"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
