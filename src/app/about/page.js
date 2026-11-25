'use client';
import Image from 'next/image';
import { Award, Users, Globe, Target, ShieldCheck, Factory, History, TrendingUp } from 'lucide-react';
import styles from './about.module.css';
import { m } from 'framer-motion';
import mediumImg from '../../../public/quartz_12_30.jpg';

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
    { label: 'Incorporated', value: '2019' },
    { label: 'Production', value: '25,000 MT/Mo' },
    { label: 'Ready Stock', value: '70,000 MT' },
    { label: 'Quartz grades', value: 'B & M' }
  ];

  return (
    <div className={styles.aboutPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className="rise">The Sumanth Minerals Story</h1>
          <p className="rise" style={{ "--rise-delay": "0.1s" }}>
            Engineering the future of high-purity minerals from the heart of Andhra Pradesh.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={`${styles.missionContent} rise`} style={{ "--rise-delay": "0.15s" }}>
              <div className={styles.accent}>Our story</div>
              <h2>A mine-owning quartz supplier from Andhra Pradesh</h2>
              <p>
                Sumanth Minerals was incorporated on 18 February 2019. Our mine is at Lakshupalli, Peddavaduguru (Anantapur District, Andhra Pradesh), with our office in Gooty. We supply graded vein quartz directly from the mine to manufacturers in India and abroad.
              </p>
              <p>
                We supply B-Grade and M-Grade quartz lumps and graded grit straight from our own mine, backed by independent lab analysis, and we arrange transport to your plant or port.
              </p>
            </div>
            <m.div 
              className={styles.missionStats}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {stats.map((stat, i) => (
                <m.div key={i} className={styles.statBox} variants={staggerItem}>
                  <h3 className={stat.value === 'B & M' ? 'text-shimmer' : undefined}>{stat.value}</h3>
                  <p>{stat.label}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* Mining Lifecycle Section (NEW) */}
      <section className={styles.lifecycle}>
        <div className="container">
          <m.div className="section-title" {...fadeInUp}>
            <h2>Direct Mine-to-Market Model</h2>
            <p>We control every stage of the lifecycle to ensure absolute purity and supply chain stability.</p>
          </m.div>
          <div className={`${styles.lifecycleGrid} stagger`}>
            <div className={styles.step}>
              <div className={styles.stepNumber} data-n="01" aria-hidden="true" />
              <History size={40} />
              <h3>Exploration</h3>
              <p>Rigorous geological surveying to identify high-yield quartz veins with &gt;99% silica potential.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber} data-n="02" aria-hidden="true" />
              <TrendingUp size={40} />
              <h3>Extraction</h3>
              <p>Systematic open-cast mining using advanced machinery to minimize waste and ensure worker safety.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber} data-n="03" aria-hidden="true" />
              <Factory size={40} />
              <h3>Processing</h3>
              <p>Multi-stage crushing, magnetic separation, and screening to achieve precise industrial grades.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber} data-n="04" aria-hidden="true" />
              <Globe size={40} />
              <h3>Logistics</h3>
              <p>Seamless transport to international ports for bulk shipping to global industrial hubs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Values Section (NEW) */}
      <section className={styles.values}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <m.div className={`${styles.valueImage} img-zoom`} {...fadeInUp}>
              <Image src={mediumImg} placeholder="blur" alt="12–30 mm graded quartz from the Sumanth Minerals mine" width={800} height={600} sizes="(max-width: 768px) 100vw, 50vw" className={styles.valueImg} />
            </m.div>
            <m.div className={styles.valueContent} {...fadeInUp}>
              <h2>Built on Industrial Integrity</h2>
              <div className={`${styles.valueItem} reveal`}>
                <ShieldCheck size={24} />
                <div>
                  <h3>Uncompromising Quality</h3>
                  <p>We never dilute our grades. Every shipment is guaranteed to match its technical spec sheet.</p>
                </div>
              </div>
              <div className={`${styles.valueItem} reveal`}>
                <Target size={24} />
                <div>
                  <h3>Customer Centricity</h3>
                  <p>Our logistics team works around your production schedule to ensure zero downtime.</p>
                </div>
              </div>
              <div className={`${styles.valueItem} reveal`}>
                <Users size={24} />
                <div>
                  <h3>Local Empowerment</h3>
                  <p>We hire locally from the villages around our Peddavaduguru mine.</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      <section className={styles.infrastructure}>
        <div className="container">
          <m.div className={styles.infraBox} {...fadeInUp}>
            <h2>Strategic Infrastructure</h2>
            <p>With 25,000 MT of monthly capacity and 70,000 MT of ready stock, material from our Lakshupalli mine is crushed, screened and graded to size before dispatch.</p>
            <div className={`${styles.infraGrid} stagger`}>
              <div className={styles.infraItem}>
                <Award size={32} />
                <h3>GST Registered</h3>
              </div>
              <div className={styles.infraItem}>
                <Globe size={32} />
                <h3>Export-Ready</h3>
              </div>
              <div className={styles.infraItem}>
                <Target size={32} />
                <h3>Lab Verified</h3>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
