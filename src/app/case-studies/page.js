'use client';

import styles from './cases.module.css';
import Link from 'next/link';
import { m } from 'framer-motion';

const cases = [
  {
    title: 'High-Purity Supply for Ceramic Manufacturing',
    client: 'Industrial Partner',
    challenge: 'Need for consistent 99%+ SiO2 purity to prevent batch defects in vitrified tiles.',
    solution: 'Supplying lab-certified ceramic grade quartz (12-30mm) directly from our Anantapur mines.',
    result: 'Maintained zero batch rejection rate over 6 months of continuous supply.'
  },
  {
    title: 'Precision Graded Quartz for Glass Industry',
    client: 'Glass Production Facility',
    challenge: 'Inconsistent particle sizing in raw material causing melting inefficiencies.',
    solution: 'Precision screening of fine quartz (0-12mm) to ensure uniform particle distribution.',
    result: 'Improved furnace efficiency and reduced energy consumption per batch.'
  }
];

const headVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function CaseStudies() {
  return (
    <div className={styles.casesPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <m.h1 variants={headVariant} initial="initial" animate="animate">Industrial Success Stories</m.h1>
          <m.p variants={headVariant} initial="initial" animate="animate" transition={{ delay: 0.12 }}>
            Real-world impact of Sumanth Minerals purity and reliability.
          </m.p>
        </div>
      </section>

      <section className={styles.casesList}>
        <div className="container">
          <m.div
            className={styles.grid}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
          >
            {cases.map((item, idx) => (
              <m.article key={idx} className={styles.caseCard} variants={headVariant}>
                <div className={styles.cardHeader}>
                  <span className={styles.client}>{item.client}</span>
                  <h2>{item.title}</h2>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.detail}>
                    <h4>Challenge:</h4>
                    <p>{item.challenge}</p>
                  </div>
                  <div className={styles.detail}>
                    <h4>Solution:</h4>
                    <p>{item.solution}</p>
                  </div>
                  <div className={styles.detail}>
                    <h4>Result:</h4>
                    <p className={styles.resultText}>{item.result}</p>
                  </div>
                </div>
                <Link href="/contact" className={styles.cardCta}>
                  Request a similar quote <span aria-hidden="true">&rarr;</span>
                </Link>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>

      <section className={styles.partner}>
        <div className="container">
          <div className={styles.partnerBox}>
            <h2>Become our next success story</h2>
            <p>Let us solve your mineral purity challenges with our premium quartz grades.</p>
            <Link href="/contact" className="btn btn-white">Partner with us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
