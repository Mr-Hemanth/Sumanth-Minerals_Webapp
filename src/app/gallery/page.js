'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
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

  const visible = active === 'All' ? images : images.filter((img) => img.category === active);

  return (
    <div className={styles.galleryPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Mine, plant and product</h1>
          <p>Photographs of our graded quartz and lab report — the same material that ships to you.</p>
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
                      sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                      className={styles.gridImage}
                    />
                    <span className={styles.imageOverlay}>
                      <span className={styles.categoryTag}>{img.category}</span>
                      <h4>{img.title}</h4>
                      <p>{img.note}</p>
                      <span className={styles.zoomHint}><ZoomIn size={15} /> View</span>
                    </span>
                  </button>
                </m.figure>
              ))}
            </AnimatePresence>
          </m.div>

          <p className={styles.galleryNote}>
            Need recent photographs of a specific lot? <Link href="/contact">Ask our export desk</Link> — we share batch photos with the certificate of analysis.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
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
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <button type="button" className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Close image">
              <X size={22} />
            </button>
            <m.div
              className={styles.lightboxInner}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
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
                <span className={styles.categoryTag}>{lightbox.category}</span>
                <h4>{lightbox.title}</h4>
                <p>{lightbox.note}</p>
              </figcaption>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
