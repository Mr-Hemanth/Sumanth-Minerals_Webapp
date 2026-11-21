import styles from './legal.module.css';
import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of use for the Sumanth Minerals website, enquiry and sample request forms, product information, and how we handle quotes and correspondence.",
  path: '/terms',
});

export default function Terms() {
  return (
    <div className={styles.legalPage}>
      <JsonLd data={breadcrumbJsonLd('Terms of Service', '/terms')} />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Terms of Service</h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalText}>
            <p>Last updated: May 05, 2024</p>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations in India.</p>
            
            <h2>2. Use of Site</h2>
            <p>The content on this site is for general information and B2B inquiry purposes. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
            
            <h2>3. Product Specifications</h2>
            <p>While we strive for 99% silica purity, all technical specifications are based on representative lab analysis. Batch-specific variations may occur within industrial tolerances.</p>
            
            <h2>4. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of Andhra Pradesh, India.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
