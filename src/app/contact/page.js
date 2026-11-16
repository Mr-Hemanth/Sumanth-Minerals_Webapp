'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, FileText } from 'lucide-react';
import styles from './contact.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { PHONE_PRIMARY, PHONE_SECONDARY, GSTIN, whatsappUrl } from '@/data/contact';
import { INDUSTRIES } from '@/data/industries';
import MapEmbed from '@/components/MapEmbed';

export default function Contact() {
  const { dict } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    quantity: '',
    country: '',
    message: '',
    industry: '',
    preferredSize: '',
    packaging: 'Jumbo Bags',
    fax: '' // honeypot — must stay empty
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json().catch(() => ({}));
        setStatus({ type: 'success', message: dict?.contact?.success || 'Thank you! Your inquiry has been sent successfully.', trackPath: result.trackPath });
        setFormData({
          name: '',
          company: '',
          email: '',
          whatsapp: '',
          quantity: '',
          country: '',
          message: '',
          industry: '',
          preferredSize: '',
          packaging: 'Jumbo Bags',
          fax: ''
        });
      } else {
        const result = await res.json().catch(() => ({}));
        setStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>{dict?.contact?.title || 'Contact Our Team'}</h1>
          <p>{dict?.contact?.subtitle || 'Get a customized quote for your bulk quartz requirements.'}</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>{dict?.contact?.sales_office || 'Global Sales Office'}</h2>
              <p>{dict?.contact?.sales_desc || 'Connect with our export experts to discuss technical specifications and logistics.'}</p>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <MapPin size={24} />
                  <div>
                    <h4>Office</h4>
                    <p>Saroja Skyland, 402, Maruthi Nagar, Ananthapur Road, Gooty – 515401, Andhra Pradesh, India</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <MapPin size={24} />
                  <div>
                    <h4>Mine</h4>
                    <p>Lakshupalli, Medimakula Palli, Peddavaduguru, Andhra Pradesh – 515405, India</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Phone size={24} />
                  <div>
                    <h4>{dict?.nav?.contact || 'Phone & WhatsApp'}</h4>
                    <p><a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a> (Sales & WhatsApp)</p>
                    <p><a href={`tel:${PHONE_SECONDARY.tel}`}>{PHONE_SECONDARY.display}</a></p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Mail size={24} />
                  <div>
                    <h4>{dict?.contact?.email_addr || 'Email Inquiries'}</h4>
                    <p>sales@sumanthminerals.com</p>
                    <p>exports@sumanthminerals.com</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <FileText size={24} />
                  <div>
                    <h4>GST Number</h4>
                    <p>{GSTIN}</p>
                  </div>
                </div>
              </div>

              <div className={styles.whatsappBox}>
                <MessageSquare size={24} />
                <div>
                  <h4>{dict?.contact?.instant_assist || 'Instant Assistance'}</h4>
                  <p>{dict?.contact?.chat_wa || 'Chat with us on WhatsApp for quick responses.'}</p>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={styles.waLink}>Start Chat</a>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} value={formData.fax} onChange={(e) => setFormData({ ...formData, fax: e.target.value })} />
                <h3>{dict?.contact?.request_quote || 'Request a Bulk Quote'}</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.full_name || 'Full Name'} *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.company_name || 'Company Name'} *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Company / Organization" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.email_addr || 'Email Address'} *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.wa_num || 'WhatsApp Number'} *</label>
                    <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="+1 234 567 890" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.industry || 'Industry / Application'} *</label>
                    <select name="industry" required value={formData.industry} onChange={handleChange} className={styles.select}>
                      <option value="">Select Industry</option>
                      {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.preferred_size || 'Preferred Quartz Size'} *</label>
                    <select name="preferredSize" required value={formData.preferredSize} onChange={handleChange} className={styles.select}>
                      <option value="">Select Size</option>
                      <option value="Lumps">Quartz Lumps</option>
                      <option value="0-12mm">Quartz Grit 0–12 mm</option>
                      <option value="12-30mm">Quartz Grit 12–30 mm</option>
                      <option value="30-80mm">Quartz Grit 30–80 mm</option>
                      <option value="Custom">Custom Grading</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.quantity || 'Required Quantity (Tons)'} *</label>
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="e.g. 500 Tons" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.dest_port || 'Destination Port / Country'} *</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="e.g. United Arab Emirates" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>{dict?.contact?.packaging || 'Packaging Requirement'}</label>
                    <select name="packaging" value={formData.packaging} onChange={handleChange} className={styles.select}>
                      <option value="Jumbo Bags">Jumbo Bags (1-1.25 Ton)</option>
                      <option value="Small Bags">50kg Bags (Palletized)</option>
                      <option value="Loose Bulk">Loose Bulk</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>{dict?.contact?.message || 'Additional Message'}</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Specific chemical requirements or delivery timelines..."></textarea>
                </div>
                
                {status.message && (
                  <div className={`${styles.status} ${styles[status.type]}`} role="status">
                    {status.message}
                    {status.trackPath && (
                      <> <a href={status.trackPath} style={{ fontWeight: 700, textDecoration: 'underline' }}>Track your request</a> (we have also emailed you this link).</>
                    )}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (dict?.contact?.sending || 'Sending...') : (dict?.common?.send_inquiry || 'Send Inquiry')} <Send size={18} style={{ marginLeft: '10px' }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <MapEmbed />
      </section>
    </div>
  );
}
