'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, useScroll, useSpring } from 'framer-motion';
import { Menu, X, PhoneCall, Globe, ChevronDown, ArrowRight } from 'lucide-react';
import styles from './Navbar.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { PHONE_PRIMARY, PHONE_SECONDARY, whatsappUrl } from '@/data/contact';
import Logo from '@/components/Logo';

const PRIMARY_LINKS = [
  { name: 'nav.home', fallback: 'Home', href: '/' },
  { name: 'nav.about', fallback: 'About', href: '/about' },
  { name: 'nav.products', fallback: 'Products', href: '/products' },
  { name: 'nav.quality', fallback: 'Quality', href: '/quality' },
  { name: 'nav.export', fallback: 'Export', href: '/export' },
];

const RESOURCE_LINKS = [
  { name: 'nav.faq', fallback: 'FAQ', href: '/faq' },
  { name: 'downloads', fallback: 'Downloads', href: '/downloads' },
  { name: 'gallery', fallback: 'Photo Gallery', href: '/gallery' },
];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { lang, dict, switchLang } = useLanguage();
  const pathname = usePathname();
  const closeTimer = useRef(null);
  const moreTimer = useRef(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setIsOpen(false);
    setLangOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Escape closes overlays
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setMoreOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const t = (key, fallback) => {
    const [section, item] = key.split('.');
    return dict?.[section]?.[item] || dict?.nav?.[item] || fallback;
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Hover with a small grace period so the menu doesn't flicker shut
  const hoverOpen = (setter, timer) => {
    clearTimeout(timer.current);
    setter(true);
  };
  const hoverClose = (setter, timer) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setter(false), 140);
  };

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navContainer}>

            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <div className={styles.links}>
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.link} ${isActive(link.href) ? styles.active : ''}`}
                >
                  {t(link.name, link.fallback)}
                </Link>
              ))}

              {/* Resources dropdown */}
              <div
                className={styles.moreWrap}
                onMouseEnter={() => hoverOpen(setMoreOpen, moreTimer)}
                onMouseLeave={() => hoverClose(setMoreOpen, moreTimer)}
              >
                <button
                  type="button"
                  className={`${styles.moreBtn} ${RESOURCE_LINKS.some(l => isActive(l.href)) ? styles.moreBtnActive : ''}`}
                  onClick={(e) => setMoreOpen(v => (e.detail === 0 ? !v : true))} // mouse: hover already opened it, so a click must not close it; keyboard (detail 0) toggles
                  onMouseDown={(e) => e.preventDefault()}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                >
                  {dict?.nav?.resources || 'Resources'}
                  <ChevronDown size={13} className={`${styles.chevron} ${moreOpen ? styles.chevronOpen : ''}`} />
                </button>
                <div className={`${styles.morePanel} ${moreOpen ? styles.panelOpen : ''}`}>
                  <p className={styles.panelKicker}>Buyer resources</p>
                  {RESOURCE_LINKS.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${styles.panelLink} ${isActive(link.href) ? styles.panelLinkActive : ''}`}
                    >
                      {t(link.name, link.fallback)}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/contact" className={`${styles.link} ${isActive('/contact') ? styles.active : ''}`}>
                {t('nav.contact', 'Contact')}
              </Link>

              {/* Lang Selector */}
              <div
                className={styles.langSelector}
                onMouseEnter={() => hoverOpen(setLangOpen, closeTimer)}
                onMouseLeave={() => hoverClose(setLangOpen, closeTimer)}
              >
                <button
                  type="button"
                  className={styles.langBtn}
                  onClick={(e) => setLangOpen(v => (e.detail === 0 ? !v : true))}
                  aria-label="Change language"
                  aria-expanded={langOpen}
                  aria-haspopup="true"
                >
                  <Globe size={14} />
                  <span>{currentLang.flag}</span>
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown size={13} className={`${styles.chevron} ${langOpen ? styles.chevronOpen : ''}`} />
                </button>
                <div className={`${styles.langDropdown} ${langOpen ? styles.langDropdownOpen : ''}`}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      className={`${styles.langOption} ${l.code === lang ? styles.langOptionActive : ''}`}
                      onClick={() => { switchLang(l.code); setLangOpen(false); }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link href="/request-sample" className={styles.sampleLink}>
                {t('nav.samples', 'Samples')} <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn btn-primary btn-sm">
                {t('nav.quote', 'Get Quote')}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className={styles.mobileActions}>
              <a href={`tel:${PHONE_PRIMARY.tel}`} className={styles.phoneIcon} aria-label="Call us">
                <PhoneCall size={20} />
              </a>
              <button
                type="button"
                className={styles.menuBtn}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <m.div className={styles.progressBar} style={{ scaleX: progress }} aria-hidden="true" />
      </nav>

      {/* Mobile Overlay */}
      <div className={`${styles.mobileOverlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={() => setIsOpen(false)} />

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`} aria-hidden={!isOpen}>
        <div className={styles.drawerContent}>
          <Link href="/" className={styles.drawerLogo}>
            <Logo size={34} />
          </Link>
          <div className={styles.drawerDivider} />
          <nav className={styles.drawerNav}>
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.drawerLink} ${isActive(link.href) ? styles.drawerActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {t(link.name, link.fallback)}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`${styles.drawerLink} ${isActive('/contact') ? styles.drawerActive : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact', 'Contact')}
            </Link>
          </nav>
          <div className={styles.drawerDivider} />
          <p className={styles.drawerLangLabel}>{dict?.nav?.resources || 'Resources'}</p>
          <div className={styles.drawerResources}>
            {RESOURCE_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={styles.drawerResourceLink} onClick={() => setIsOpen(false)}>
                {t(link.name, link.fallback)}
              </Link>
            ))}
          </div>
          <div className={styles.drawerDivider} />
          <div className={styles.drawerLangs}>
            <p className={styles.drawerLangLabel}>Language</p>
            <div className={styles.drawerLangGrid}>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  type="button"
                  className={`${styles.drawerLangBtn} ${l.code === lang ? styles.drawerLangActive : ''}`}
                  onClick={() => { switchLang(l.code); setIsOpen(false); }}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.drawerActions}>
            <Link href="/request-sample" className="btn btn-outline w-full" style={{ justifyContent: 'center' }} onClick={() => setIsOpen(false)}>
              Request Sample
            </Link>
            <Link href="/contact" className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => setIsOpen(false)}>
              Get Quote
            </Link>
          </div>
          <div className={styles.drawerContact}>
            <a href={`tel:${PHONE_PRIMARY.tel}`} className={styles.drawerPhone}>
              <PhoneCall size={16} />
              {PHONE_PRIMARY.display}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
