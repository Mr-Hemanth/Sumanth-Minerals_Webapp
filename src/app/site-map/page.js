import Link from 'next/link';
import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';
import { SITE_SECTIONS } from '@/data/siteRoutes';
import styles from './site-map.module.css';

export const metadata = pageMetadata({
  title: 'Sitemap: All Pages',
  description: 'Every page on the Sumanth Minerals website: quartz lumps, quartz grit, quality and lab reports, export, samples, FAQ and contact details.',
  path: '/site-map',
});

// The page people see. sitemap.xml (for search engines) is built from the same list.
export default function SiteMapPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={breadcrumbJsonLd('Sitemap', '/site-map')} />
      <section className={styles.header}>
        <div className="container">
          <h1>Sitemap</h1>
          <p>Every page on our website, in one place.</p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`container ${styles.grid}`}>
          {SITE_SECTIONS.map((section) => (
            <div key={section.title} className={styles.group}>
              <h2>{section.title}</h2>
              <ul>
                {section.routes.map((r) => (
                  <li key={r.path}>
                    <Link href={r.path || '/'}>{r.name}</Link>
                    <p>{r.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={`container ${styles.xml}`}>
          For search engines: <a href="/sitemap.xml">sitemap.xml</a>
        </p>
      </section>
    </div>
  );
}
