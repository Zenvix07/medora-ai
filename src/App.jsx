import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './components/landing/HeroSection';
import { TrustSection } from './components/landing/TrustSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { FeatureHighlights } from './components/landing/FeatureHighlights';

import { HealthOverviewCards } from './components/dashboard/HealthOverviewCards';
import { AIHealthInsights } from './components/dashboard/AIHealthInsights';
import { HealthTrendChart } from './components/dashboard/HealthTrendChart';
import { WhatChanged } from './components/dashboard/WhatChanged';
import { AbhaIdentityCard } from './components/dashboard/AbhaIdentityCard';
import { HealthGraph } from './components/dashboard/HealthGraph';
import { MedicalRecordsList } from './components/dashboard/MedicalRecordsList';
import { LabResultsList } from './components/dashboard/LabResultsList';

import { UploadDropzone } from './components/upload/UploadDropzone';
import { ProcessingAnimation } from './components/upload/ProcessingAnimation';
import { OcrResultView } from './components/upload/OcrResultView';
import { AISummaryView } from './components/upload/AISummaryView';

import { HealthTimeline } from './components/timeline/HealthTimeline';
import { MedicationTracker } from './components/medications/MedicationTracker';
import { DoctorVisitCopilot } from './components/doctorVisit/DoctorVisitCopilot';
import { AIChatDrawer } from './components/chat/AIChatDrawer';

import { EvidenceModal } from './components/common/EvidenceModal';
import { DocumentModal } from './components/common/DocumentModal';
import { PrivacyModal } from './components/common/PrivacyModal';
import { MedicalDisclaimer } from './components/common/MedicalDisclaimer';

import { apiService } from './services/api';
import { mockInsights, mockReports } from './data/mockData';
import { MessageSquareText } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'records' | 'medications' | 'labs' | 'trends' | 'timeline' | 'copilot' | 'doctorVisit' | 'healthGraph' | 'abha' | 'upload'

  // Upload Sub-flow
  const [uploadStep, setUploadStep] = useState('idle'); // 'idle' | 'processing' | 'ocrResult' | 'aiSummary'
  const [uploadProgress, setUploadProgress] = useState({ step: 'uploading', percent: 25, fileName: '' });
  const [extractedPayload, setExtractedPayload] = useState(null);

  // Modals & Drawers
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Trigger file upload and processing
  const handleStartUpload = async (fileOrSampleName) => {
    setCurrentView('dashboard');
    setDashboardTab('upload');
    setUploadStep('processing');

    const fileName = typeof fileOrSampleName === 'string'
      ? (fileOrSampleName.includes('lab') ? 'Dr_Lal_PathLabs_CBC_Oct2026.pdf' : (fileOrSampleName.includes('rx') ? 'Apollo_Spectra_Rx_DrSen.jpg' : 'Manipal_Annual_Panel.pdf'))
      : (fileOrSampleName?.name || 'Uploaded_Medical_Report.pdf');

    setUploadProgress({ step: 'uploading', percent: 25, fileName });

    try {
      const uploadFile = (fileOrSampleName instanceof File || fileOrSampleName instanceof Blob)
        ? fileOrSampleName
        : new File(["Sample Report content for testing OCR extraction."], fileName, { type: "text/plain" });

      const result = await apiService.uploadDocument(uploadFile, (stepName, pct) => {
        setUploadProgress({ step: stepName, percent: pct, fileName });
      });
      setExtractedPayload(result);
      setUploadStep('ocrResult');
    } catch (err) {
      console.error(err);
      setUploadStep('idle');
    }
  };

  const handleOpenEvidence = (evidenceData) => {
    setSelectedEvidence(evidenceData);
  };

  const handleOpenDocument = (docUrl) => {
    setSelectedDocumentUrl(docUrl || '/images/medical_report_scan.jpg');
  };

  const handleLandingNavigate = (target) => {
    if (target === 'dashboard' || target === 'overview') {
      setCurrentView('dashboard');
      setDashboardTab('overview');
    } else if (target === 'timeline' || target === 'trends' || target === 'doctorVisit') {
      setCurrentView('dashboard');
      setDashboardTab(target);
    } else if (target === 'upload') {
      setCurrentView('dashboard');
      setDashboardTab('upload');
      setUploadStep('idle');
    } else if (target === 'copilot') {
      setCurrentView('dashboard');
      setIsChatOpen(true);
    } else {
      setCurrentView('landing');
    }
  };

  return (
    <div className="app-root">
      {/* 1. LANDING PAGE VIEW */}
      {currentView === 'landing' ? (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            onNavigate={handleLandingNavigate}
            onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
          />

          <main>
            <HeroSection
              onUploadClick={() => handleStartUpload('sample-lab-oct')}
              onHowItWorksClick={() => {
                const elem = document.getElementById('how-it-works');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreDashboard={() => {
                setCurrentView('dashboard');
                setDashboardTab('overview');
              }}
            />

            <TrustSection />

            <HowItWorks
              onStartUpload={() => handleStartUpload('sample-lab-oct')}
            />

            <FeatureHighlights
              onExploreFeature={(featureTab) => {
                setCurrentView('dashboard');
                if (featureTab === 'copilot') {
                  setIsChatOpen(true);
                } else {
                  setDashboardTab(featureTab);
                }
              }}
            />
          </main>

          <Footer
            onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
            onNavigate={handleLandingNavigate}
          />
        </div>
      ) : (
        /* 2. AUTHENTICATED DASHBOARD WORKSPACE */
        <div className="dashboard-layout">
          <Sidebar
            activeTab={dashboardTab}
            onSelectTab={(tabId) => {
              if (tabId === 'copilot') {
                setIsChatOpen(true);
              } else {
                setDashboardTab(tabId);
              }
            }}
            onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
            onGoLanding={() => setCurrentView('landing')}
          />

          <div className="dashboard-main">
            <DashboardHeader
              onNavigate={handleLandingNavigate}
              onSelectInsight={(insId) => {
                const ins = mockInsights.find(i => i.id === insId) || mockInsights[0];
                handleOpenEvidence(ins.evidenceData);
              }}
              onOpenUpload={() => {
                setDashboardTab('upload');
                setUploadStep('idle');
              }}
            />

            <main className="dashboard-content">
              {/* TAB 1: OVERVIEW */}
              {dashboardTab === 'overview' && (
                <>
                  <HealthOverviewCards onSelectTab={(tab) => setDashboardTab(tab)} />

                  <AIHealthInsights
                    onViewEvidence={handleOpenEvidence}
                    onCompareReports={() => setDashboardTab('trends')}
                    onSelectTab={(tab) => setDashboardTab(tab)}
                  />

                  <div className="charts-split-grid">
                    <HealthTrendChart onViewEvidence={handleOpenEvidence} />
                    <WhatChanged onViewEvidence={handleOpenEvidence} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    <HealthGraph onSelectTab={(tab) => setDashboardTab(tab)} />
                    <AbhaIdentityCard onImportSuccess={() => setDashboardTab('records')} />
                  </div>
                </>
              )}

              {/* TAB 2: MEDICAL RECORDS */}
              {dashboardTab === 'records' && (
                <MedicalRecordsList
                  onOpenDocument={handleOpenDocument}
                  onOpenUpload={() => {
                    setDashboardTab('upload');
                    setUploadStep('idle');
                  }}
                />
              )}

              {/* TAB 3: MEDICATIONS */}
              {dashboardTab === 'medications' && (
                <MedicationTracker onOpenPrescription={handleOpenDocument} />
              )}

              {/* TAB 4: LAB RESULTS */}
              {dashboardTab === 'labs' && (
                <LabResultsList onViewEvidence={handleOpenEvidence} />
              )}

              {/* TAB 5: HEALTH TRENDS & WHAT CHANGED */}
              {dashboardTab === 'trends' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <HealthTrendChart onViewEvidence={handleOpenEvidence} />
                  <WhatChanged onViewEvidence={handleOpenEvidence} />
                </div>
              )}

              {/* TAB 6: HEALTH TIMELINE */}
              {dashboardTab === 'timeline' && (
                <HealthTimeline
                  onOpenDocument={handleOpenDocument}
                  onViewEvidence={handleOpenEvidence}
                />
              )}

              {/* TAB 7: DOCTOR VISIT */}
              {dashboardTab === 'doctorVisit' && (
                <DoctorVisitCopilot onOpenDocument={handleOpenDocument} />
              )}

              {/* TAB 8: HEALTH GRAPH */}
              {dashboardTab === 'healthGraph' && (
                <HealthGraph onSelectTab={(tab) => setDashboardTab(tab)} />
              )}

              {/* TAB 9: ABHA HEALTH IDENTITY */}
              {dashboardTab === 'abha' && (
                <AbhaIdentityCard onImportSuccess={() => setDashboardTab('records')} />
              )}

              {/* TAB 10: UPLOAD & ANALYSIS JOURNEY */}
              {dashboardTab === 'upload' && (
                <div>
                  {uploadStep === 'idle' && (
                    <UploadDropzone
                      onFileSelected={(file) => handleStartUpload(file)}
                      onSelectSample={(sampleKey) => handleStartUpload(sampleKey)}
                    />
                  )}

                  {uploadStep === 'processing' && (
                    <ProcessingAnimation
                      currentStep={uploadProgress.step}
                      progressPercent={uploadProgress.percent}
                      fileName={uploadProgress.fileName}
                    />
                  )}

                  {uploadStep === 'ocrResult' && (
                    <OcrResultView
                      extractedPayload={extractedPayload}
                      onProceedToSummary={() => setUploadStep('aiSummary')}
                      onOpenDocumentPreview={handleOpenDocument}
                    />
                  )}

                  {uploadStep === 'aiSummary' && (
                    <AISummaryView
                      extractedPayload={extractedPayload}
                      onGoDashboard={() => setDashboardTab('overview')}
                      onPrepareDoctorVisit={() => setDashboardTab('doctorVisit')}
                      onOpenEvidence={(item) => {
                        const fallbackInsight = mockInsights[0];
                        handleOpenEvidence(fallbackInsight.evidenceData);
                      }}
                    />
                  )}
                </div>
              )}

              {/* Persistent Medical Disclaimer */}
              <div style={{ marginTop: '16px' }}>
                <MedicalDisclaimer />
              </div>
            </main>

            <MobileNav
              activeTab={dashboardTab}
              onSelectTab={(tab) => setDashboardTab(tab)}
              onOpenChat={() => setIsChatOpen(true)}
            />
          </div>

          {/* Floating AI Chat Trigger on every Dashboard Page */}
          <button
            type="button"
            className="floating-chat-trigger"
            onClick={() => setIsChatOpen(!isChatOpen)}
            aria-label="Ask MedJourney AI"
          >
            <MessageSquareText size={20} />
            <span>Ask MedJourney AI</span>
          </button>
        </div>
      )}

      {/* Global AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onViewEvidence={handleOpenEvidence}
        onOpenDocument={handleOpenDocument}
      />

      {/* Global Evidence Modal */}
      {selectedEvidence && (
        <EvidenceModal
          evidenceData={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          onOpenDocument={handleOpenDocument}
        />
      )}

      {/* Global Scanned Document Modal */}
      {selectedDocumentUrl && (
        <DocumentModal
          documentUrl={selectedDocumentUrl}
          onClose={() => setSelectedDocumentUrl(null)}
        />
      )}

      {/* Global Privacy Modal */}
      {isPrivacyModalOpen && (
        <PrivacyModal
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
