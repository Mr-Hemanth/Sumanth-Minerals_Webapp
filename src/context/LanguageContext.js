'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import en from '@/dictionaries/en.json';

// English ships with the page, so the first render already shows the final text.
// That means no network request and no re-render of the hero (which used to delay
// the Largest Contentful Paint). Other languages are code-split and load on demand.
const loaders = {
  ar: () => import('@/dictionaries/ar.json'),
  zh: () => import('@/dictionaries/zh.json'),
  de: () => import('@/dictionaries/de.json'),
};

const LanguageContext = createContext({ lang: 'en', dict: en, switchLang: () => {} });

const applyDocumentLang = (lang) => {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  // Loaded non-English dictionaries; English is always available without state.
  const [loaded, setLoaded] = useState({});
  const dict = lang === 'en' ? en : loaded[lang] || en;

  useEffect(() => {
    let cancelled = false;
    if (lang === 'en' || !loaders[lang]) {
      applyDocumentLang('en');
      return;
    }
    const load = loaders[lang];
    load()
      .then((mod) => {
        if (cancelled) return;
        setLoaded((prev) => ({ ...prev, [lang]: mod.default }));
        applyDocumentLang(lang);
      })
      .catch((error) => {
        console.error('i18n Error:', error);
        if (!cancelled) setLang('en');
      });
    return () => { cancelled = true; };
  }, [lang]);

  // Restore a previously chosen language (storage can throw in private mode).
  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferredLang');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved language after hydration
      if (saved && saved !== 'en' && loaders[saved]) setLang(saved);
    } catch {}
  }, []);

  const switchLang = (newLang) => {
    setLang(newLang);
    try { localStorage.setItem('preferredLang', newLang); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
