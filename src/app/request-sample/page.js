'use client';
import { useState } from 'react';
import { Package, Truck, CheckCircle, Info } from 'lucide-react';
import styles from './sample.module.css';
import { INDUSTRIES } from '@/data/industries';

export default function RequestSample() {
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    company: '',
    website: '',
    email: '',
    whatsapp: '',
    industry: INDUSTRIES[0],
    monthlyRequirement: '',
    preferredSize: '12-30mm',
    country: 'India',
    address: '',
    fax: '' // honeypot — must stay empty
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Sample Request' }),
      });
      if (res.ok) {
        const result = await res.json().catch(() => ({}));
        setStatus({ type: 'success', message: 'Sample request submitted! Our logistics team will contact you for shipping details.', trackPath: result.trackPath });
        setFormData({ 
          name: '', jobTitle: '', company: '', website: '', 
          email: '', whatsapp: '', industry: INDUSTRIES[0], 
          monthlyRequirement: '', preferredSize: '12-30mm', country: 'India', address: '', fax: ''
        });
      } else {
        const result = await res.json().catch(() => ({}));
        setStatus({ type: 'error', message: result.error || 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Submission failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.samplePage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1 className="rise">Request a Product Sample</h1>
          <p className="rise" style={{ "--rise-delay": "0.1s" }}>Test our B-Grade or M-Grade quartz in your own laboratory before you order.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={`${styles.steps} stagger`}>
              <div className={styles.step}>
                <Package size={24} />
                <div>
                  <h2>Standard 1kg Packet</h2>
                  <p>We provide complimentary 1kg samples for industrial testing.</p>
                </div>
              </div>
              <div className={styles.step}>
                <Truck size={24} />
                <div>
                  <h2>Global Air Freight</h2>
                  <p>Samples are shipped via DHL/FedEx. Buyer handles shipping costs.</p>
                </div>
              </div>
              <div className={styles.step}>
                <CheckCircle size={24} />
                <div>
                  <h2>Analysis Report</h2>
                  <p>Every sample includes a matching lab analysis certificate.</p>
                </div>
              </div>
              </div>

              <div className={`${styles.alert} reveal`}>
                <Info size={20} />
                <p>Sample requests are only processed for registered businesses and verified industrial inquiries.</p>
              </div>
            </div>

            <div className={styles.formBox}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} value={formData.fax} onChange={(e) => setFormData({ ...formData, fax: e.target.value })} />
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-name">Full Name</label>
                    <input id="rs-name" type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rajesh Kumar" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-job">Job Title / Designation</label>
                    <input id="rs-job" type="text" required value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} placeholder="Purchase Manager" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-company">Company Name</label>
                    <input id="rs-company" type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} placeholder="e.g. ABC Ceramics Pvt. Ltd." />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-website">Company Website</label>
                    <input id="rs-website" type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} placeholder="https://www.yourcompany.in" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-email">Business Email</label>
                    <input id="rs-email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="purchase@yourcompany.in" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-phone">WhatsApp / Phone</label>
                    <input id="rs-phone" type="tel" required value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-industry">Industry</label>
                    <select id="rs-industry" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})}>
                      {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="rs-monthly">Monthly Requirement (Tons)</label>
                    <input id="rs-monthly" type="text" value={formData.monthlyRequirement} onChange={(e) => setFormData({...formData, monthlyRequirement: e.target.value})} placeholder="e.g. 500 MT" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rs-grade">Quartz Grade Required</label>
                  <select id="rs-grade" value={formData.preferredSize} onChange={(e) => setFormData({...formData, preferredSize: e.target.value})}>
                    <option value="Lumps">Quartz Lumps</option>
                    <option value="0-12mm">Quartz Grit 0–12 mm</option>
                    <option value="12-30mm">Quartz Grit 12–30 mm</option>
                    <option value="30-80mm">Quartz Grit 30–80 mm</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rs-address">Shipping Address (Complete with PIN/ZIP)</label>
                  <textarea id="rs-address" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows="3" placeholder="Full delivery address with PIN code"></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="rs-country">Country</label>
                  <input id="rs-country" type="text" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} placeholder="India" />
                </div>
                
                {status.message && (
                  <div className={`${styles.status} ${styles[status.type]}`} role="status">
                    {status.message}
                    {status.trackPath && (
                      <> <a href={status.trackPath} style={{ fontWeight: 700, textDecoration: 'underline' }}>Track your request</a> (we have also emailed you this link).</>
                    )}
                  </div>
                )}

                <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={loading}>
                  {loading ? 'Processing...' : 'Request Sample Packet'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
