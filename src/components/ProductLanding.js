// Shared layout for the keyword landing pages (/quartz-lumps, /quartz-grit).
// Server component on purpose: the whole page arrives as plain HTML, which is
// what search engines index best and what loads fastest on mobile.
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, FlaskConical, Factory, Mountain, ArrowRight, Download } from 'lucide-react';
import { CHEMISTRY as C, LAB_REPORT } from '@/data/specs';
import { SITE_URL, JsonLd } from '@/lib/seo';
import styles from './ProductLanding.module.css';

const CHEM_ROWS = [
  ['SiO₂ (silica)', C.SiO2],
  ['Fe₂O₃ (iron oxide)', C.Fe2O3],
  ['Al₂O₃ (alumina)', C.Al2O3],
  ['CaO', C.CaO],
  ['MgO', C.MgO],
  ['K₂O', C.K2O],
  ['Na₂O', C.Na2O],
  ['TiO₂', C.TiO2],
  ['LOI (loss on ignition)', C.LOI],
];

export default function ProductLanding({ name, path, h1, lead, image, imageAlt, intro, sizesTitle, sizes, uses, faqs, related }) {
  const url = `${SITE_URL}${path}`;
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <JsonLd data={structured} />

      <section className={styles.header}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/products">Products</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{name}</span>
          </nav>
          <h1>{h1}</h1>
          <p className={styles.lead}>{lead}</p>
          <ul className={styles.badges}>
            <li><FlaskConical size={14} aria-hidden="true" /> {C.SiO2} SiO₂, lab tested</li>
            <li><Factory size={14} aria-hidden="true" /> 15,000 MT per month</li>
            <li><Mountain size={14} aria-hidden="true" /> Our own mine, Andhra Pradesh</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <div className={styles.prose}>
            {intro.map((p, i) => <p key={i}>{p}</p>)}
            <div className={styles.actions}>
              <Link href="/request-sample" className="btn btn-primary">Request a free sample <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/contact" className="btn btn-outline">Ask for a price</Link>
            </div>
          </div>
          <div className={styles.photo}>
            <Image src={image} alt={imageAlt} placeholder="blur" fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <h2>{sizesTitle}</h2>
          <div className={styles.cards}>
            {sizes.map((s) => (
              <div key={s.title} className={styles.card}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <div>
            <h2>Chemical analysis</h2>
            <p className={styles.note}>
              Independent test by {LAB_REPORT.lab}, report {LAB_REPORT.reportNo} ({new Date(LAB_REPORT.issued).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}). {LAB_REPORT.basis}.
            </p>
            <table className={styles.table}>
              <caption className="sr-only">Chemical composition of Sumanth Minerals quartz</caption>
              <thead><tr><th scope="col">Parameter</th><th scope="col">Result</th></tr></thead>
              <tbody>
                {CHEM_ROWS.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
              </tbody>
            </table>
            <a href={LAB_REPORT.pdf} className={styles.pdf} download>
              <Download size={16} aria-hidden="true" /> Download the full lab report (PDF)
            </a>
          </div>
          <div>
            <h2>Where it is used</h2>
            <ul className={styles.uses}>
              {uses.map((u) => <li key={u.title}><strong>{u.title}:</strong> {u.text}</li>)}
            </ul>
            <p className={styles.note}>
              Natural vein quartz with {C.Fe2O3} Fe₂O₃ is not suited to solar glass or semiconductor
              silicon. Send us your specification and we will tell you honestly whether it fits.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <h2>Common questions</h2>
          <div className={styles.faq}>
            {faqs.map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <p className={styles.more}>
            {related.text} <Link href={related.href}>{related.label}</Link>. More answers on the <Link href="/faq">FAQ page</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
