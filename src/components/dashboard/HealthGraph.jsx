import React, { useState } from 'react';
import { User, FlaskConical, Pill, FileText, Clock, Stethoscope, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { mockPatient } from '../../data/mockData';

export const HealthGraph = ({ onSelectTab }) => {
  const [selectedNode, setSelectedNode] = useState('labs');

  const nodes = [
    {
      id: 'labs',
      label: 'Lab Results',
      count: '27 tests',
      icon: FlaskConical,
      color: '#f59e0b',
      tab: 'labs',
      desc: 'Metabolic & CBC panels, lipid markers, and HbA1c history.'
    },
    {
      id: 'meds',
      label: 'Medications',
      count: '4 active/past',
      icon: Pill,
      color: '#0d9488',
      tab: 'medications',
      desc: 'Active regimens: Metformin 500mg, Vitamin D3 60,000 IU, Telmisartan 40mg.'
    },
    {
      id: 'reports',
      label: 'Medical Records',
      count: '12 documents',
      icon: FileText,
      color: '#0284c7',
      tab: 'records',
      desc: 'Standardized OCR repository including discharge slips and pathology.'
    },
    {
      id: 'timeline',
      label: 'Timeline Events',
      count: '5 milestones',
      icon: Clock,
      color: '#6366f1',
      tab: 'timeline',
      desc: 'Chronological progression from January 2026 to October 2026.'
    },
    {
      id: 'doctor',
      label: 'Doctor Visits',
      count: '3 consultations',
      icon: Stethoscope,
      color: '#10b981',
      tab: 'doctorVisit',
      desc: 'Consultation records with Dr. Ananya Sen and Dr. Ramesh Patel.'
    }
  ];

  const activeNodeInfo = nodes.find(n => n.id === selectedNode) || nodes[0];

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <Share2 size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Personal Health Graph
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Interactive entity relationship model of your health records
            </p>
          </div>
        </div>

        <span className="badge badge-teal">Connected Topology</span>
      </div>

      {/* Visual Graph Layout */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px 20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '260px'
      }}>
        {/* Center Patient Node */}
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
          zIndex: 2,
          marginBottom: '28px'
        }}>
          <User size={28} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: '2px' }}>Patient</span>
        </div>

        {/* Orbit Connected Nodes */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          zIndex: 2
        }}>
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNode(node.id)}
                style={{
                  background: isSelected ? 'var(--bg-surface)' : 'var(--bg-surface)',
                  border: isSelected ? `2px solid ${node.color}` : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${node.color}18`,
                  color: node.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{node.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{node.count}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Box */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: `${activeNodeInfo.color}20`,
            color: activeNodeInfo.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.createElement(activeNodeInfo.icon, { size: 18 })}
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeNodeInfo.label} ({activeNodeInfo.count})
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {activeNodeInfo.desc}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onSelectTab && onSelectTab(activeNodeInfo.tab)}
          style={{ padding: '8px 14px', fontSize: '0.84rem' }}
        >
          <span>Open Full View</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
