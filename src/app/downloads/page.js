import { FileDown, FileText, BarChart2, ShieldCheck } from 'lucide-react';
import styles from './downloads.module.css';

export const metadata = {
  title: 'Downloads & Resources | Kanaka Minerals',
  description: 'Download corporate brochures, technical data sheets, and MSDS for Kanaka Minerals quartz products.',
};

const resources = [
  {
    title: 'Corporate Brochure',
    desc: 'Full company profile, mining locations, and overview of our global operations.',
    type: 'PDF (4.2 MB)',
    icon: <FileText size={32} />
  },
  {
    title: 'Technical Data Sheets (TDS)',
    desc: 'Detailed physical and chemical properties of all quartz sizes (0-80mm).',
    type: 'ZIP (2.1 MB)',
    icon: <BarChart2 size={32} />
  },
  {
    title: 'MSDS Documentation',
    desc: 'Material Safety Data Sheets for industrial handling and transportation.',
    type: 'PDF (1.5 MB)',
    icon: <ShieldCheck size={32} />
  }
];

export default function Downloads() {
  return (
    <div className={styles.downloadsPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Technical Resources</h1>
          <p>Everything you need for technical evaluation and procurement.</p>
        </div>
      </section>

      <section className={styles.resourceSection}>
        <div className="container">
          <div className={styles.grid}>
            {resources.map((item, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.iconBox}>{item.icon}</div>
                <div className={styles.content}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className={styles.meta}>
                    <span>{item.type}</span>
                    <button className={styles.dlBtn}>
                      <FileDown size={18} /> Download Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.request}>
        <div className="container">
          <div className={styles.requestBox}>
            <h2>Need a specific report?</h2>
            <p>We provide batch-specific lab analysis and third-party certifications (SGS, Intertek) upon request for valid inquiries.</p>
            <a href="/contact" className="btn btn-outline">Request Custom Report</a>
          </div>
        </div>
      </section>
    </div>
  );
}
