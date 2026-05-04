import { ShieldCheck, FileText, Activity, Microscope } from 'lucide-react';
import styles from './quality.module.css';

export const metadata = {
  title: 'Quality & Certifications | Kanaka Minerals',
  description: 'View our 99% silica quartz lab test reports and chemical composition details. We maintain international standards for industrial quartz.',
};

export default function Quality() {
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
          <h1>Quality Assurance</h1>
          <p>Uncompromising standards for 99% silica purity.</p>
        </div>
      </section>

      <section className={styles.testing}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.textContent}>
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
            </div>
            <div className={styles.compositionBox}>
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
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reports}>
        <div className="container">
          <div className="section-title">
            <h2>Lab Test Reports</h2>
            <p>Transparency is key to building global trust. Download our representative lab reports.</p>
          </div>
          <div className={styles.reportGrid}>
            <div className={styles.reportCard}>
              <FileText size={40} />
              <h4>Chemical Analysis Report</h4>
              <p>Comprehensive breakdown of mineral components and silica purity.</p>
              <button className="btn btn-outline btn-sm">View Sample PDF</button>
            </div>
            <div className={styles.reportCard}>
              <Activity size={40} />
              <h4>Particle Size Distribution</h4>
              <p>Detailed analysis of grading accuracy for all sizes (0-80mm).</p>
              <button className="btn btn-outline btn-sm">View Sample PDF</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.certifications}>
        <div className="container">
          <div className={styles.certBanner}>
            <h2>Industry Certifications</h2>
            <div className={styles.certLogos}>
              <div className={styles.logoBox}>ISO 9001:2015</div>
              <div className={styles.logoBox}>MSME REGISTERED</div>
              <div className={styles.logoBox}>EXPORT CERTIFIED</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
