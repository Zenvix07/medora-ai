import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageSelector = ({ compact = false }) => {
  const { currentLanguage, setLanguage, languages, currentLangObj } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="lang-selector-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        title="Change Indian Regional Language"
      >
        <Globe size={16} className="text-primary" />
        <span style={{ fontWeight: 600 }}>{currentLangObj.flag} {compact ? currentLangObj.code.toUpperCase() : currentLangObj.native}</span>
        <ChevronDown size={14} style={{ opacity: 0.6 }} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu animate-fade-in" role="menu">
          <div style={{ padding: '6px 12px 8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Select Indian Language
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang.code)}
              role="menuitem"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{lang.flag}</span>
                <span style={{ fontWeight: 600 }}>{lang.native}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({lang.name})</span>
              </div>
              {currentLanguage === lang.code && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
