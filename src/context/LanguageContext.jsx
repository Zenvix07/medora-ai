import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, LANGUAGES } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('medjourney_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('medjourney_lang', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = translations[currentLanguage] || translations.en;
  const currentLangObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage: setCurrentLanguage,
      t,
      currentLangObj,
      languages: LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
