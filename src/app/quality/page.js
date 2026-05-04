'use client';
import { ShieldCheck, FileText, Activity, Microscope } from 'lucide-react';
import styles from './quality.module.css';
import { motion } from 'framer-motion';

export default function Quality() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const chemicalComposition = [
    { component: 'Silica (SiO2)', percentage: '99.27%' },
    { component: 'Iron Oxide (Fe2O3)', percentage: '0.30%' },
    { component: 'Alumina (Al2O3)', percentage: '0.25%' },
    { component: 'Calcium (CaO)', percentage: '0.01%' },
    { component: 'Magnesium (MgO)', percentage: '0.01%' },
    { component: 'Potassium (K2O)', percentage: '0.03%' },
    { component: 'Sodium (Na2O)', percentage: '0.02%' },
    { component: 'Loss on Ignition (LOI)', percentage: '0.10%' }
  ];

  return (
    <div className={styles.qualityPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>Quality Assurance</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>Uncompromising standards for 99% silica purity.</motion.p>
        </div>
      </section>

      <section className={styles.testing}>
        <div className="container">
          <div className={styles.grid}>
            <motion.div className={styles.textContent} {...fadeInUp}>
              <h2>Rigorous Testing Protocols</h2>
              <p>At Kanaka Minerals, quality is not just a department—it's our core identity. Every batch of quartz undergoes systematic testing at multiple stages of the mining and processing workflow.</p>
              
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><Microscope size={24} /></div>
                  <div className={styles.stepText}>
                    <h4>Source Verification</h4>
                    <p>Testing geological samples before mining to ensure vein purity.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><Activity size={24} /></div>
                  <div className={styles.stepText}>
                    <h4>Process Monitoring</h4>
                    <p>Continuous screening to maintain size consistency within microns.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><ShieldCheck size={24} /></div>
                  <div className={styles.stepText}>
                    <h4>Final Batch Certification</h4>
                    <p>Representative sampling for final lab analysis before dispatch.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className={styles.compositionBox}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h3>Typical Chemical Composition</h3>
              <div className={styles.table}>
                {chemicalComposition.map((item, i) => (
                  <div key={i} className={styles.tableRow}>
                    <span>{item.component}</span>
                    <strong>{item.percentage}</strong>
                  </div>
                ))}
              </div>
              <p className={styles.disclaimer}>*Tested and certified by <strong>Lucid Laboratories Pvt. Ltd.</strong> (Nov 2025). Full reports available on request.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.reports}>
        <div className="container">
          <motion.div className="section-title" {...fadeInUp}>
            <h2>Lab Test Reports</h2>
            <p>Transparency is key to building global trust. Download our representative lab reports.</p>
          </motion.div>
          <div className={styles.reportGrid}>
            <motion.div className={styles.reportCard} {...fadeInUp} transition={{ delay: 0.1 }}>
              <FileText size={40} />
              <h4>Chemical Analysis Report</h4>
              <p>Comprehensive breakdown of mineral components and silica purity.</p>
              <button className="btn btn-outline btn-sm">View Sample PDF</button>
            </motion.div>
            <motion.div className={styles.reportCard} {...fadeInUp} transition={{ delay: 0.2 }}>
              <Activity size={40} />
              <h4>Particle Size Distribution</h4>
              <p>Detailed analysis of grading accuracy for all sizes (0-80mm).</p>
              <button className="btn btn-outline btn-sm">View Sample PDF</button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.certifications}>
        <div className="container">
          <motion.div 
            className={styles.certBanner}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h2>Industry Certifications</h2>
            <div className={styles.certLogos}>
              <div className={styles.logoBox}>ISO 9001:2015</div>
              <div className={styles.logoBox}>MSME REGISTERED</div>
              <div className={styles.logoBox}>EXPORT CERTIFIED</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
