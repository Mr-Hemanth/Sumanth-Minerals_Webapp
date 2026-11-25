// Shared layout for the keyword landing pages (/quartz-lumps, /quartz-grit).
// Server component on purpose: the whole page arrives as plain HTML, which is
// what search engines index best and what loads fastest on mobile.
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, FlaskConical, Factory, Truck, ArrowRight, Download } from 'lucide-react';
import { GRADE_INFO, LAB_REPORT, CHEMISTRY as C } from '@/data/specs';
import { SITE_URL, JsonLd } from '@/lib/seo';
import styles from './ProductLanding.module.css';

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
            <li className={styles.badgeStrong}><FlaskConical size={14} aria-hidden="true" /> B-Grade &amp; M-Grade</li>
            <li><Truck size={14} aria-hidden="true" /> Transport if required</li>
            <li><FlaskConical size={14} aria-hidden="true" /> {C.SiO2} SiO₂ lab tested</li>
            <li><Factory size={14} aria-hidden="true" /> 25,000 MT per month, own mine</li>
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
              <div key={s.title} className={`${styles.card} spotlight`}>
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
            <h2>Two grades: B-Grade and M-Grade</h2>
            <div className={styles.grades}>
              {GRADE_INFO.map((g) => (
                <div key={g.name} className={`${styles.grade} spotlight`}>
                  <h3><span className="text-sweep">{g.name}</span></h3>
                  <p>{g.look}</p>
                </div>
              ))}
            </div>
            <p className={styles.note}>
              Not sure which grade fits? Tell us your application and we will recommend one and send a sample.
              Our quartz is independently analysed by {LAB_REPORT.lab}: <strong>{C.SiO2} SiO₂</strong>, {C.Fe2O3} Fe₂O₃ (report {LAB_REPORT.reportNo}); see the <Link href="/quality">Quality page</Link>.
            </p>
            <a href={LAB_REPORT.pdf} className={styles.pdf} download>
              <Download size={16} aria-hidden="true" /> Download the lab report (PDF)
            </a>
          </div>
          <div>
            <h2>Where it is used</h2>
            <ul className={styles.uses}>
              {uses.map((u) => <li key={u.title}><strong>{u.title}:</strong> {u.text}</li>)}
            </ul>
            <p className={styles.note}>
              Natural vein quartz is not suited to solar glass or semiconductor silicon. Send us your
              specification and we will tell you honestly whether it fits.
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
