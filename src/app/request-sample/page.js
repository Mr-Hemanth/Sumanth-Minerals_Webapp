'use client';
import { useState } from 'react';
import { Package, Truck, CheckCircle, Info } from 'lucide-react';
import styles from './sample.module.css';

export default function RequestSample() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    grade: '12-30mm',
    country: '',
    address: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Sample Request' }),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Sample request submitted! Our logistics team will contact you for shipping details.' });
        setFormData({ name: '', company: '', email: '', whatsapp: '', grade: '12-30mm', country: '', address: '' });
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
          <h1>Request a Product Sample</h1>
          <p>Evaluate Kanaka Minerals' 99% silica quartz purity in your own laboratory.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={styles.step}>
                <Package size={24} />
                <div>
                  <h4>Standard 1kg Packet</h4>
                  <p>We provide complimentary 1kg samples for industrial testing.</p>
                </div>
              </div>
              <div className={styles.step}>
                <Truck size={24} />
                <div>
                  <h4>Global Air Freight</h4>
                  <p>Samples are shipped via DHL/FedEx. Buyer handles shipping costs.</p>
                </div>
              </div>
              <div className={styles.step}>
                <CheckCircle size={24} />
                <div>
                  <h4>Analysis Report</h4>
                  <p>Every sample includes a matching lab analysis certificate.</p>
                </div>
              </div>
              
              <div className={styles.alert}>
                <Info size={20} />
                <p>Sample requests are only processed for registered businesses and verified industrial inquiries.</p>
              </div>
            </div>

            <div className={styles.formBox}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Quartz Grade Required</label>
                  <select value={formData.grade} onChange={(e) => setFormData({...formData, grade: e.target.value})}>
                    <option value="0-12mm">0-12mm (Fine)</option>
                    <option value="12-30mm">12-30mm (Medium)</option>
                    <option value="30-80mm">30-80mm (Lump)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Shipping Address</label>
                  <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows="3"></textarea>
                </div>
                <div className={styles.formGroup}>
                  <label>Country</label>
                  <input type="text" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                </div>
                
                {status.message && (
                  <div className={`${styles.status} ${styles[status.type]}`}>{status.message}</div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
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
