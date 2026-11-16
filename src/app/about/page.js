'use client';
import Image from 'next/image';
import { Award, Users, Globe, Target, ShieldCheck, Factory, History, TrendingUp } from 'lucide-react';
import styles from './about.module.css';
import { motion } from 'framer-motion';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  // Child variants must expose an `animate` key — otherwise staggered groups
  // inherit the label, find nothing, and stay stuck at opacity 0.
  const staggerItem = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
  };

  const stats = [
    { label: 'Founded', value: '2025' },
    { label: 'Production', value: '15,000 MT/Mo' },
    { label: 'Ready Stock', value: '40,000 MT' },
    { label: 'SiO₂ (Lab-Tested)', value: '99.27%' }
  ];

  return (
    <div className={styles.aboutPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>The Sumanth Minerals Story</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>
            Engineering the future of high-purity minerals from the heart of Andhra Pradesh.
          </motion.p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <motion.div className={styles.missionContent} {...fadeInUp}>
              <div className={styles.accent}>OUR VISION</div>
              <h2>Global Leadership in Silica Purity</h2>
              <p>
                Founded in 2025, Sumanth Minerals was established to bridge the gap between high-demand industrial sectors and raw mineral quality. Our mine is at Lakshupalli, Peddavaduguru (Anantapur District, Andhra Pradesh), with our office in Gooty. We supply graded vein quartz directly from the mine to manufacturers in India and abroad.
              </p>
              <p>
                Our mission is to provide the most consistent, high-purity silica quartz, graded to size and backed by independent lab analysis.
              </p>
            </motion.div>
            <motion.div 
              className={styles.missionStats}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {stats.map((stat, i) => (
                <motion.div key={i} className={styles.statBox} variants={staggerItem}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mining Lifecycle Section (NEW) */}
      <section className={styles.lifecycle}>
        <div className="container">
          <motion.div className="section-title" {...fadeInUp}>
            <h2>Direct Mine-to-Market Model</h2>
            <p>We control every stage of the lifecycle to ensure absolute purity and supply chain stability.</p>
          </motion.div>
          <div className={styles.lifecycleGrid}>
            <motion.div className={styles.step} {...fadeInUp}>
              <div className={styles.stepNumber}>01</div>
              <History size={40} />
              <h3>Exploration</h3>
              <p>Rigorous geological surveying to identify high-yield quartz veins with &gt;99% silica potential.</p>
            </motion.div>
            <motion.div className={styles.step} {...fadeInUp} transition={{ delay: 0.1 }}>
              <div className={styles.stepNumber}>02</div>
              <TrendingUp size={40} />
              <h3>Extraction</h3>
              <p>Systematic open-cast mining using advanced machinery to minimize waste and ensure worker safety.</p>
            </motion.div>
            <motion.div className={styles.step} {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className={styles.stepNumber}>03</div>
              <Factory size={40} />
              <h3>Processing</h3>
              <p>Multi-stage crushing, magnetic separation, and screening to achieve precise industrial grades.</p>
            </motion.div>
            <motion.div className={styles.step} {...fadeInUp} transition={{ delay: 0.3 }}>
              <div className={styles.stepNumber}>04</div>
              <Globe size={40} />
              <h3>Logistics</h3>
              <p>Seamless transport to international ports for bulk shipping to global industrial hubs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Values Section (NEW) */}
      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <motion.div className={styles.valueImage} {...fadeInUp}>
              <Image src="/quartz_12_30.jpg" alt="12–30 mm graded quartz from the Sumanth Minerals mine" width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
            </motion.div>
            <motion.div className={styles.valueContent} {...fadeInUp}>
              <h2>Built on Industrial Integrity</h2>
              <div className={styles.valueItem}>
                <ShieldCheck size={24} />
                <div>
                  <h4>Uncompromising Quality</h4>
                  <p>We never dilute our grades. Every shipment is guaranteed to match its technical spec sheet.</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <Target size={24} />
                <div>
                  <h4>Customer Centricity</h4>
                  <p>Our logistics team works around your production schedule to ensure zero downtime.</p>
                </div>
              </div>
              <div className={styles.valueItem}>
                <Users size={24} />
                <div>
                  <h4>Local Empowerment</h4>
                  <p>We hire locally from the villages around our Peddavaduguru mine.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.infrastructure}>
        <div className="container">
          <motion.div className={styles.infraBox} {...fadeInUp}>
            <h2>Strategic Infrastructure</h2>
            <p>With 15,000 MT of monthly capacity and 40,000 MT of ready stock, material from our Lakshupalli mine is crushed, screened and graded to size before dispatch.</p>
            <div className={styles.infraGrid}>
              <div className={styles.infraItem}>
                <Award size={32} />
                <h4>GST Registered</h4>
              </div>
              <div className={styles.infraItem}>
                <Globe size={32} />
                <h4>Export-Ready</h4>
              </div>
              <div className={styles.infraItem}>
                <Target size={32} />
                <h4>Lab Verified</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
