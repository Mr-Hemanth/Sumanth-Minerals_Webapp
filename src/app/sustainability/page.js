'use client';
import { Leaf, Recycle, ShieldCheck, Heart } from 'lucide-react';
import styles from './sustainability.module.css';
import { motion } from 'framer-motion';

export default function Sustainability() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className={styles.sustainabilityPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>Sustainability & ESG</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>Mining with responsibility for a better future.</motion.p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <motion.div className={styles.introContent} {...fadeInUp}>
            <h2>Responsible Mining</h2>
            <p>At Kanaka Minerals, we believe that industrial growth must go hand-in-hand with environmental preservation. Our ESG (Environmental, Social, and Governance) framework is integrated into every aspect of our quartz mining operations.</p>
          </motion.div>
          <motion.div 
            className={styles.pillars}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.div className={styles.pillar} variants={fadeInUp}>
              <Leaf size={40} />
              <h3>Environmental Stewardship</h3>
              <p>Minimizing our ecological footprint through efficient mining techniques and land restoration programs.</p>
            </motion.div>
            <motion.div className={styles.pillar} variants={fadeInUp}>
              <Heart size={40} />
              <h3>Social Impact</h3>
              <p>Supporting the local community in Lakshayampalli through education, healthcare, and employment.</p>
            </motion.div>
            <motion.div className={styles.pillar} variants={fadeInUp}>
              <ShieldCheck size={40} />
              <h3>Ethical Governance</h3>
              <p>Maintaining transparency in our supply chain and adhering to strict international safety standards.</p>
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
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.placeholderImg}>GREEN MINING VISUALS</div>
            </motion.div>
            <motion.div 
              className={styles.restoreText}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Land Restoration Program</h2>
              <p>We don't just extract; we restore. Our mining plan includes a phased reclamation process where worked-out areas are backfilled and re-vegetated with local flora.</p>
              <ul>
                <li><span>✓</span> Systematic backfilling of pits</li>
                <li><span>✓</span> Native tree plantation drives</li>
                <li><span>✓</span> Soil conservation techniques</li>
                <li><span>✓</span> Water table monitoring</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.water}>
        <div className="container">
          <motion.div 
            className={styles.waterBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Recycle size={50} />
            <h2>Zero Water Discharge</h2>
            <p>Our processing units utilize advanced water recycling systems. 95% of the water used in quartz washing is filtered and reused in the same cycle, ensuring zero wastage of local water resources.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
