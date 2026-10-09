import React, { useState } from 'react';
import { Stethoscope, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar = ({ onNavigate, onOpenPrivacy }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId, viewId = null) => {
    setMobileMenuOpen(false);
    if (viewId && onNavigate) {
      onNavigate(viewId);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Left Brand Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('hero', 'landing')}>
          <div className="brand-icon-wrapper">
            <Stethoscope size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              MedJourney<span style={{ color: 'var(--primary)' }}>.ai</span>
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--teal)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Personal Health Copilot
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <button type="button" className="nav-link" onClick={() => handleNavClick('hero', 'landing')}>
            {t.nav?.home || "Home"}
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('how-it-works')}>
            {t.nav?.howItWorks || "How It Works"}
          </button>
          <button type="button" className="nav-link" onClick={() => handleNavClick('features')}>
            {t.nav?.features || "Features"}
          </button>
          <button type="button" className="nav-link" onClick={() => onNavigate('timeline')}>
            {t.nav?.timeline || "Health Timeline"}
          </button>
          <button type="button" className="nav-link" onClick={() => onNavigate('copilot')}>
            {t.nav?.aiCopilot || "AI Copilot"}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <LanguageSelector />
          <ThemeToggle />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate('dashboard')}
          >
            <span>{t.nav?.getStarted || "Get Started"}</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="btn btn-ghost"
            style={{ display: 'none' }}
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 49
        }} className="animate-fade-in">
          <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleNavClick('hero', 'landing')}>
            {t.nav?.home || "Home"}
          </button>
          <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => handleNavClick('how-it-works')}>
            {t.nav?.howItWorks || "How It Works"}
          </button>
          <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => { setMobileMenuOpen(false); onNavigate('dashboard'); }}>
            {t.nav?.dashboard || "Go to Dashboard"}
          </button>
          <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => { setMobileMenuOpen(false); onNavigate('timeline'); }}>
            {t.nav?.timeline || "Health Timeline"}
          </button>
          <button type="button" className="btn btn-ghost" style={{ justifyContent: 'flex-start' }} onClick={() => { setMobileMenuOpen(false); onNavigate('upload'); }}>
            {t.nav?.uploadRecord || "Upload Record"}
          </button>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => { setMobileMenuOpen(false); onNavigate('dashboard'); }}
            >
              {t.nav?.getStarted || "Get Started"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
