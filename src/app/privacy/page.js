import styles from './legal.module.css';
import { pageMetadata, breadcrumbJsonLd, JsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sumanth Minerals collects, uses and protects the information you send through our enquiry and sample request forms.",
  path: '/privacy',
});

export default function Privacy() {
  return (
    <div className={styles.legalPage}>
      <JsonLd data={breadcrumbJsonLd('Privacy Policy', '/privacy')} />
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.legalText}>
            <p>Last updated: May 05, 2024</p>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you fill out an inquiry form or contact us via WhatsApp. This includes your name, company name, email address, phone number, and any details about your quartz requirements.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information to process your bulk quartz inquiries, provide quotes, coordinate logistics, and communicate about our services.</p>
            
            <h2>3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access or disclosure.</p>
            
            <h2>4. Third-Party Sharing</h2>
            <p>We do not sell your data. We may share information with logistics partners only to the extent necessary to provide shipping quotes or fulfill orders.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
