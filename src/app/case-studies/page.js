import styles from './cases.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Case Studies | Kanaka Minerals Success Stories',
  description: 'Explore how Kanaka Minerals high-purity quartz has improved production quality for global glass and ceramic manufacturers.',
};

const cases = [
  {
    title: 'Optimizing Flat Glass Production in UAE',
    client: 'Major Glass Manufacturer',
    challenge: 'High iron contamination in raw material leading to glass tinting.',
    solution: 'Supplying ultra-low iron quartz (Fe2O3 < 0.015%) in 12-30mm grading.',
    result: 'Achieved 100% transparency in flat glass production with zero batch rejection.'
  },
  {
    title: 'Precision Ceramics Grading for European Market',
    client: 'Ceramic Artware Studio',
    challenge: 'Need for specific thermal expansion properties and particle consistency.',
    solution: 'Custom grading of fine quartz (0-12mm) with 99.5% silica purity.',
    result: 'Reduced ceramic cracking during firing by 22%.'
  },
  {
    title: 'Bulk Supply Consistency for Silicon Metal Plant',
    client: 'Global Silicon Exporter',
    challenge: 'Supply chain disruptions affecting 24/7 furnace operations.',
    solution: 'Dedicated logistics corridor and priority mining of 30-80mm lumps.',
    result: 'Zero downtime recorded over 12 months of continuous supply.'
  }
];

export default function CaseStudies() {
  return (
    <div className={styles.casesPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Success Stories</h1>
          <p>Real-world impact of Kanaka Minerals purity and reliability.</p>
        </div>
      </section>

      <section className={styles.casesList}>
        <div className="container">
          <div className={styles.grid}>
            {cases.map((item, idx) => (
              <div key={idx} className={styles.caseCard}>
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
              </div>
            ))}
          </div>
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
