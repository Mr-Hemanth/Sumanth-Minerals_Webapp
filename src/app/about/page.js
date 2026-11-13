'use client';
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
    { label: 'Production', value: '10k Tons/Mo' },
    { label: 'Mining Area', value: '50+ Acres' },
    { label: 'Global Clients', value: 'Industrial' }
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
                Founded in 2025, Sumanth Minerals was established to bridge the gap between high-demand industrial sectors and raw mineral quality. With our flagship mines located in Lakshyampalli, Anantapur—a region globally renowned for its high-grade quartz deposits—we have rapidly scaled our operations to become a premier supplier for international markets.
              </p>
              <p>
                Our mission is to provide the most consistent, high-purity silica quartz while maintaining a zero-carbon-footprint vision for our mining and processing facilities.
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
              <div className={styles.placeholderImg}>CORPORATE EXCELLENCE</div>
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
                  <p>Over 80% of our workforce is sourced from the local Tadipatri and Anantapur regions.</p>
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
            <p>Our Anantapur processing unit is equipped with high-intensity magnetic separators and custom-built vibratory screens capable of processing 500 tons of material per day, ensuring that the purity extracted from our Lakshyampalli mines is preserved until it reaches the buyer.</p>
            <div className={styles.infraGrid}>
              <div className={styles.infraItem}>
                <Award size={32} />
                <h4>ISO Certified</h4>
              </div>
              <div className={styles.infraItem}>
                <Globe size={32} />
                <h4>Export Licensed</h4>
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
