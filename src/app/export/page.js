'use client';
import { Globe, Package, Truck, ShieldCheck, Clock } from 'lucide-react';
import styles from './export.module.css';
import { motion } from 'framer-motion';

export default function Export() {
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
    <div className={styles.exportPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>Global Export Operations</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>Seamlessly supplying premium minerals to industrial hubs worldwide.</motion.p>
        </div>
      </section>

      <section className={styles.process}>
        <div className="container">
          <motion.div className="section-title" {...fadeInUp}>
            <h2>Our Export Process</h2>
            <p>A streamlined workflow designed for international trade efficiency.</p>
          </motion.div>
          <motion.div 
            className={styles.processGrid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              { icon: <Clock size={32} />, title: 'Inquiry & Quote', desc: 'Detailed technical discussion and transparent B2B pricing based on volume.' },
              { icon: <ShieldCheck size={32} />, title: 'Quality Approval', desc: 'Pre-shipment inspection and lab reports shared for buyer approval.' },
              { icon: <Package size={32} />, title: 'Custom Packaging', desc: 'Jumbo bags or custom packaging options to ensure material integrity.' },
              { icon: <Truck size={32} />, title: 'Logistic Sync', desc: 'Coordination with major ports and shipping lines for timely dispatch.' },
              { icon: <Globe size={32} />, title: 'Global Delivery', desc: 'Real-time tracking and documentation support for customs clearance.' }
            ].map((step, i) => (
              <motion.div key={i} className={styles.processStep} variants={fadeInUp}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepLine}></div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.packaging}>
        <div className="container">
          <div className={styles.packagingGrid}>
            <motion.div 
              className={styles.packagingText}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Packaging & Logistics</h2>
              <p>We understand that mineral purity must be maintained throughout the journey. Our packaging standards are designed for long-distance international transit.</p>
              <ul className={styles.packList}>
                <li><strong>Jumbo Bags:</strong> 1 Ton / 1.25 Ton UV stabilized PP bags with liners.</li>
                <li><strong>Small Bags:</strong> 25kg / 50kg bags palletized for easy handling.</li>
                <li><strong>Container Load:</strong> Efficient stuffing to maximize container capacity (typically 25-28 Tons).</li>
                <li><strong>Port Access:</strong> Close proximity to Chennai, Krishnapatnam, Ennore, and Vizag ports.</li>
              </ul>
            </motion.div>
            <motion.div 
              className={styles.packagingImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.placeholderImg}>PACKAGING VISUALS</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.markets}>
        <div className="container">
          <motion.div 
            className={styles.marketBanner}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2>Serving Global Industries</h2>
            <p>Our quartz is currently exported to and used by industries in:</p>
            <div className={styles.countryGrid}>
              <span>South East Asia</span>
              <span>Middle East</span>
              <span>Europe</span>
              <span>North America</span>
              <span>East Asia</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
