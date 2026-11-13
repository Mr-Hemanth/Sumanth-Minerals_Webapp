'use client';
import { Leaf, Recycle, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './sustainability.module.css';
import { motion } from 'framer-motion';

export default function Sustainability() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: {},
    animate: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  };

  const commitments = [
    'Systematic backfilling of worked-out pits',
    'Native tree plantation drives each season',
    'Soil conservation and erosion control',
    'Groundwater table monitoring around the bench',
  ];

  return (
    <div className={styles.sustainabilityPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>Sustainability &amp; ESG</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>Mining with responsibility for a better future.</motion.p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <motion.div className={styles.introContent} {...fadeInUp}>
            <span className="section-label">Our Framework</span>
            <h2>Responsible Mining</h2>
            <p>At Sumanth Minerals, industrial growth and environmental preservation are planned together. Our ESG framework is written into every stage of the operation — from vein selection at Lakshyampalli to final dispatch at port.</p>
          </motion.div>
          <motion.div 
            className={styles.pillars}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            <motion.div className={styles.pillar} variants={staggerItem}>
              <Leaf size={40} />
              <h3>Environmental Stewardship</h3>
              <p>Efficient bench mining, dust suppression, and land restoration programs keep the surrounding landscape intact.</p>
            </motion.div>
            <motion.div className={styles.pillar} variants={staggerItem}>
              <Heart size={40} />
              <h3>Social Impact</h3>
              <p>Local employment, health camps, and school infrastructure support for communities around Lakshyampalli.</p>
            </motion.div>
            <motion.div className={styles.pillar} variants={staggerItem}>
              <ShieldCheck size={40} />
              <h3>Ethical Governance</h3>
              <p>Transparent supply chain, third-party audit trail, and adherence to international safety standards.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.restoration}>
        <div className="container">
          <div className={styles.restoreGrid}>
            <motion.div 
              className={styles.restoreImage}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/quartz_mine_aerial.jpg"
                alt="Aerial view of the Sumanth Minerals open-cast quartz bench at Tadipatri, Andhra Pradesh"
                fill
                sizes="(max-width: 992px) 100vw, 45vw"
              />
              <span className={styles.imageCaption}>Tadipatri bench — progressive reclamation in cycle</span>
            </motion.div>
            <motion.div 
              className={styles.restoreText}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2>Land Restoration Program</h2>
              <p>We don&apos;t just extract; we restore. Every mining plan includes a phased reclamation process where worked-out areas are backfilled and re-vegetated with local flora.</p>
              <ul>
                {commitments.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/gallery" className={`${styles.restoreCta} btn btn-outline btn-sm`}>
                See the site in pictures
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.water}>
        <div className="container">
          <motion.div 
            className={styles.waterBox}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Recycle size={50} />
            <h2>Zero Water Discharge</h2>
            <p>Advanced recycling treats 95% of the water used in quartz washing inside the same cycle, so local water resources are drawn on minimally and returned clean.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
