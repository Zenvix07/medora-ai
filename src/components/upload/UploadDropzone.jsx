import React, { useState, useRef } from 'react';
import { Upload, Camera, FileText, CheckCircle2, AlertCircle, FileUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const UploadDropzone = ({ onFileSelected, onSelectSample }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      onFileSelected(file);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      onFileSelected(file);
    }
  };

  const triggerCamera = () => {
    // Simulate camera capture or trigger native mobile capture
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          {t.upload?.title || "Add a Health Record"}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          {t.upload?.subtitle || "Upload a medical report, prescription, diagnostic record, or discharge summary."}
        </p>
      </div>

      {/* Main Drag & Drop Box */}
      <div
        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileInputChange}
        />

        <div className="upload-icon-circle animate-pulse-glow">
          <FileUp size={30} />
        </div>

        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {t.upload?.dragDrop || "Drag & drop your file here"}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t.upload?.or || "or"} <span style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>{t.upload?.browse || "Browse Files"}</span>
          </p>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', background: 'var(--bg-subtle)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
          {t.upload?.formats || "Supported formats: PDF, PNG, JPG, JPEG (Max 25MB)"}
        </div>

        {/* Mobile Camera Button */}
        <div style={{ marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={triggerCamera}
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Camera size={16} className="text-primary" />
            <span>{t.upload?.takePhoto || "Take a photo"}</span>
          </button>
        </div>
      </div>

      {/* Quick Sample File Pickers for Instant Testing */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          <Sparkles size={16} className="text-primary" />
          <span>{t.upload?.samplePrompt || "Or test immediately with pre-loaded sample records:"}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSelectSample('sample-lab-oct')}
            style={{ padding: '10px 14px', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
          >
            <FileText size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>{t.upload?.loadSample1 || "Demo Lab Report (Oct 2026)"}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSelectSample('sample-rx-sen')}
            style={{ padding: '10px 14px', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
          >
            <FileText size={16} style={{ color: 'var(--teal)', flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>{t.upload?.loadSample2 || "Demo Prescription (Dr. Sen)"}</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSelectSample('sample-cbc-jan')}
            style={{ padding: '10px 14px', justifyContent: 'flex-start', fontSize: '0.82rem', textAlign: 'left' }}
          >
            <FileText size={16} style={{ color: 'var(--warning)', flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>{t.upload?.loadSample3 || "Demo CBC Panel (Jan 2026)"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
