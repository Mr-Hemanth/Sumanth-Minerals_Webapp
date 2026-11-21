'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import styles from './gallery.module.css';

const categories = ['All', 'Mine', 'Grades', 'Reports'];

const images = [
  {
    id: 1,
    src: '/mine-site-hillside-v3.jpg',
    category: 'Mine',
    title: 'Mine site, Lakshupalli',
    note: 'Quartz-bearing hillside and working benches at our Peddavaduguru mine.',
    span: 'wide',
  },
  {
    id: 2,
    src: '/mine-site-bench.jpg',
    category: 'Mine',
    title: 'Working bench',
    note: 'Haul road and exposed vein outcrop on the bench face.',
    span: 'tall',
  },
  {
    id: 8,
    src: '/quartz_lumps.jpg',
    category: 'Grades',
    title: 'Quartz lumps',
    note: 'Natural vein quartz lumps at the mine, before sizing.',
  },
  {
    id: 3,
    src: '/quartz_0_12.jpg',
    category: 'Grades',
    title: 'Quartz grit 0–12 mm',
    note: 'Screened fraction for glass and filler use.',
  },
  {
    id: 4,
    src: '/quartz_12_30.jpg',
    category: 'Grades',
    title: 'Quartz grit 12–30 mm',
    note: 'Standard fraction for tiles and sanitaryware.',
    span: 'tall',
  },
  {
    id: 5,
    src: '/quartz_30_80.jpg',
    category: 'Grades',
    title: 'Quartz grit 30–80 mm',
    note: 'Coarse grit for ferro-alloy smelting.',
  },
  {
    id: 7,
    src: '/lab-certificate.png',
    category: 'Reports',
    title: 'Certificate of analysis',
    note: 'Lucid Laboratories analysis, Report LL/25-26/009401/1 (Nov 2025).',
  },
];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const touchStartX = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  const visible = active === 'All' ? images : images.filter((img) => img.category === active);
  const lightboxIndex = lightbox ? visible.findIndex((img) => img.id === lightbox.id) : -1;

  const step = useCallback((dir) => {
    if (lightboxIndex < 0 || visible.length < 2) return;
    setLightbox(visible[(lightboxIndex + dir + visible.length) % visible.length]);
  }, [lightboxIndex, visible]);

  // Keyboard: Esc closes, arrow keys browse
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, step]);

  // While open: lock page scroll, move focus into the dialog, keep Tab inside it,
  // and hand focus back to the photo that opened it on close.
  const isOpen = Boolean(lightbox);
  useEffect(() => {
    if (!isOpen) return undefined;
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const trap = (e) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const els = dialogRef.current.querySelectorAll('button');
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', trap);
    return () => {
      window.removeEventListener('keydown', trap);
      document.body.style.overflow = prevOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [isOpen]);

  // Touch: swipe left / right on the photo to browse
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <div className={styles.galleryPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className="rise">Mine, plant and product</h1>
          <p className="rise" style={{ "--rise-delay": "0.1s" }}>Photographs of our graded quartz and lab report — the same material that ships to you.</p>
        </div>
      </section>

      <section className={styles.galleryContent}>
        <div className="container">
          <div className={styles.filterBar} role="tablist" aria-label="Gallery categories">
            {categories.map((cat) => {
              const count = cat === 'All' ? images.length : images.filter((img) => img.category === cat).length;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={active === cat}
                  className={active === cat ? styles.activeFilter : ''}
                  onClick={() => setActive(cat)}
                >
                  {cat} <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          <m.div layout className={styles.imageGrid}>
            <AnimatePresence mode="popLayout">
              {visible.map((img) => (
                <m.figure
                  layout
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`${styles.imageCard} ${img.span === 'wide' ? styles.cardWide : ''} ${img.span === 'tall' ? styles.cardTall : ''}`}
                >
                  <button
                    type="button"
                    className={styles.imageButton}
                    onClick={() => setLightbox(img)}
                    aria-label={`Enlarge image: ${img.title}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 1024px) 46vw, (max-width: 1599px) 400px, 20vw"
                      className={styles.gridImage}
                    />
                    <span className={styles.imageOverlay}>
                      <span className={styles.categoryTag}>{img.category}</span>
                      <h2>{img.title}</h2>
                      <p>{img.note}</p>
                      <span className={styles.zoomHint}><ZoomIn size={15} /> View</span>
                    </span>
                  </button>
                </m.figure>
              ))}
            </AnimatePresence>
          </m.div>

          <p className={`${styles.galleryNote} reveal`}>
            Need recent photographs of a specific lot? <Link href="/contact" className={styles.noteLink}>Ask our export desk</Link> — we share batch photos with the certificate of analysis.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={`${styles.ctaBox} reveal-zoom`}>
            <h2>Visit the mine and plant</h2>
            <p>We welcome buyers and their inspection agencies to our Lakshupalli mine. Tell us your dates and we will arrange the site round.</p>
            <Link href="/contact" className="btn btn-primary">
              Schedule a Visit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <m.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close image">
              <X size={22} />
            </button>
            {visible.length > 1 && (
              <>
                <button type="button" className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image">
                  <ChevronLeft size={24} />
                </button>
                <button type="button" className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <m.div
              key={lightbox.id}
              className={styles.lightboxInner}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.title}
                width={1400}
                height={950}
                className={styles.lightboxImage}
                priority
              />
              <figcaption className={styles.lightboxCaption}>
                <span className={styles.captionTop}>
                  <span className={styles.categoryTag}>{lightbox.category}</span>
                  {visible.length > 1 && (
                    <span className={styles.lightboxCount}>{lightboxIndex + 1} / {visible.length}</span>
                  )}
                </span>
                <h2>{lightbox.title}</h2>
                <p>{lightbox.note}</p>
              </figcaption>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
