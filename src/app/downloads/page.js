import { FileDown, FileText, ClipboardList, ShieldCheck, Truck, Scale, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './downloads.module.css';

export const metadata = {
  title: 'Downloads & Resources | Sumanth Minerals',
  description: 'Download the Sumanth Minerals lab analysis report, and request technical data sheets, MSDS, and batch-specific third-party certifications for our quartz grades.',
};

const available = [
  {
    title: 'Lab Analysis Report — SiO₂ Purity & Impurity Profile',
    desc: 'Independent laboratory results for our crushed quartz aggregate, covering major oxides and trace elements.',
    icon: FileText,
    href: '/sumanth-minerals-lab-report.pdf',
    meta: ['PDF', '410 KB', '1 page'],
    action: 'Download',
  },
  {
    title: 'Certificate of Analysis — Sample View',
    desc: 'The batch certificate that ships with every consignment. Useful for pre-qualifying our documentation with your QA team.',
    icon: ShieldCheck,
    href: '/lab-certificate.png',
    meta: ['PNG', '215 KB'],
    action: 'View',
  },
];

const onRequest = [
  {
    title: 'Technical Data Sheets',
    desc: 'Grade-wise specifications for 0–12 mm, 12–30 mm and 30–80 mm quartz, including bulk density and moisture content.',
    icon: ClipboardList,
  },
  {
    title: 'MSDS / SDS',
    desc: 'Material safety documentation for industrial handling, warehouse storage and international transit.',
    icon: FileText,
  },
  {
    title: 'Third-Party Certification',
    desc: 'SGS or Intertek inspection reports for a specific batch, arranged against a confirmed inquiry.',
    icon: Scale,
  },
  {
    title: 'Export Documentation Set',
    desc: 'Sample commercial invoice, packing list and certificate of origin formats for your customs team.',
    icon: Truck,
  },
];

export default function Downloads() {
  return (
    <div className={styles.downloadsPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <span className={styles.kicker}>Technical Resources</span>
          <h1>Documents you can check before you buy</h1>
          <p>Lab results are open to everyone. Grade sheets, safety data and batch certifications are released against an inquiry.</p>
        </div>
      </section>

      <section className={styles.resourceSection}>
        <div className="container">
          <div className={styles.sectionLabel}>
            <h2>Available now</h2>
            <span className={styles.labelNote}>No sign-up required</span>
          </div>

          <div className={styles.grid}>
            {available.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={styles.card}>
                  <div className={styles.iconBox}><Icon size={26} /></div>
                  <div className={styles.content}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className={styles.meta}>
                      <ul className={styles.chips}>
                        {item.meta.map((m) => <li key={m}>{m}</li>)}
                      </ul>
                      <a
                        href={item.href}
                        className={styles.dlBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={item.action === 'Download' ? '' : undefined}
                      >
                        <FileDown size={17} /> {item.action}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.requestSection}>
        <div className="container">
          <div className={styles.sectionLabel}>
            <h2>Released against an inquiry</h2>
            <span className={styles.labelNote}>Typically within 24 hours</span>
          </div>

          <div className={styles.requestGrid}>
            {onRequest.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href="/contact" className={styles.requestCard}>
                  <Icon size={20} className={styles.requestIcon} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <ArrowUpRight size={18} className={styles.requestArrow} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.request}>
        <div className="container">
          <div className={styles.requestBox}>
            <h2>Need a batch-specific report?</h2>
            <p>We arrange SGS or Intertek analysis against your own specification, and share the sample retention policy before you commit to a consignment.</p>
            <div className={styles.boxActions}>
              <Link href="/contact" className="btn btn-primary">Request Custom Report</Link>
              <Link href="/quality" className="btn btn-outline-white">See how we test</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
