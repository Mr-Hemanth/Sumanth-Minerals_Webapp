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

// Languages offered in the switcher. Only English is complete: the AR/ZH/DE dictionaries
// cover the menu and a few sections, which left pages mostly English in those modes
// (audit BUG-02). Add a code back here once its dictionary covers every page; the
// switcher reappears automatically when more than one language is enabled.
export const ENABLED_LANGS = ['en'];

const LanguageContext = createContext({ lang: 'en', dict: en, switchLang: () => {} });

// Only the navigation and a few key sections are translated; page bodies stay in English.
// So the document keeps lang="en" and left-to-right layout in every mode. Flipping the
// whole page to RTL made the English paragraphs render right-aligned (audit BUG-02).
// Arabic strings still display correctly in an LTR page (the browser's bidi algorithm
// orders each Arabic run right-to-left on its own).
const applyDocumentLang = () => {
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
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
      if (saved && saved !== 'en' && loaders[saved] && ENABLED_LANGS.includes(saved)) setLang(saved);
      else if (saved && saved !== 'en') localStorage.removeItem('preferredLang'); // drop a choice that is no longer offered
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
