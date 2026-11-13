'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [dict, setDict] = useState(null);

  useEffect(() => {
    const loadDict = async () => {
      try {
        const response = await fetch(`/api/lang?l=${lang}`);
        if (!response.ok) throw new Error('Failed to load dictionary');
        const data = await response.json();
        setDict(data);
        
        // Handle RTL for Arabic
        if (lang === 'ar') {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = lang;
        }
      } catch (error) {
        console.error('i18n Error:', error);
        // Fallback to English if not already there
        if (lang !== 'en') setLang('en');
      }
    };
    loadDict();
  }, [lang]);

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('preferredLang', newLang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang');
    if (saved) setLang(saved);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, dict, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
