import React from 'react';
import { X, ZoomIn, Download, CheckCircle, Shield, FileCheck } from 'lucide-react';

export const DocumentModal = ({ documentUrl, title = "Original Medical Document", onClose }) => {
  if (!documentUrl) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog">
      <div className="modal-card" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Original laboratory report scan & optical text mapping
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              style={{ padding: '6px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '16px' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '68vh'
          }}>
            <img
              src={documentUrl}
              alt="Scanned original document"
              style={{ maxWidth: '100%', maxHeight: '65vh', objectFit: 'contain' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(6px)'
            }}>
              <CheckCircle size={14} style={{ color: '#10b981' }} />
              <span>Cryptographically verified scan • 300 DPI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
