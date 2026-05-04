'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    quantity: '',
    country: '',
    message: ''
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
        setStatus({ type: 'success', message: 'Thank you! Your inquiry has been sent successfully.' });
        setFormData({
          name: '',
          company: '',
          email: '',
          whatsapp: '',
          quantity: '',
          country: '',
          message: ''
        });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
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
          <h1>Contact Our Team</h1>
          <p>Get a customized quote for your bulk quartz requirements.</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h2>Global Sales Office</h2>
              <p>Connect with our export experts to discuss technical specifications and logistics.</p>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <MapPin size={24} />
                  <div>
                    <h4>Registered Office</h4>
                    <p>Lakshayampalli, Tadipatri Mandal, Ananthapur, Andhra Pradesh - 515411, India</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Phone size={24} />
                  <div>
                    <h4>Phone & WhatsApp</h4>
                    <p>+91 98765 43210 (Sales)</p>
                    <p>+91 98765 01234 (Exports)</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <Mail size={24} />
                  <div>
                    <h4>Email Inquiries</h4>
                    <p>sales@kanakaminerals.com</p>
                    <p>exports@kanakaminerals.com</p>
                  </div>
                </div>
              </div>

              <div className={styles.whatsappBox}>
                <MessageSquare size={24} />
                <div>
                  <h4>Instant Assistance</h4>
                  <p>Chat with us on WhatsApp for quick responses.</p>
                  <a href="https://wa.me/919876543210" className={styles.waLink}>Start Chat</a>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Request a Bulk Quote</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Company Name *</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="Company / Organization" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>WhatsApp Number *</label>
                    <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="+1 234 567 890" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Industry / Application *</label>
                    <select name="industry" required onChange={handleChange} className={styles.select}>
                      <option value="">Select Industry</option>
                      <option value="Glass">Glass Manufacturing</option>
                      <option value="Ceramics">Ceramics & Sanitaryware</option>
                      <option value="Silicon">Silicon & Ferro-Alloys</option>
                      <option value="Foundry">Foundry / Castings</option>
                      <option value="Other">Other Industrial Use</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Preferred Quartz Size *</label>
                    <select name="preferredSize" required onChange={handleChange} className={styles.select}>
                      <option value="">Select Size</option>
                      <option value="0-12mm">0-12 mm (Fine)</option>
                      <option value="12-30mm">12-30 mm (Medium)</option>
                      <option value="30-80mm">30-80 mm (Lumps)</option>
                      <option value="Custom">Custom Grading</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Required Quantity (Tons) *</label>
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="e.g. 500 Tons" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Destination Port / Country *</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="e.g. United Arab Emirates" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Packaging Requirement</label>
                    <select name="packaging" onChange={handleChange} className={styles.select}>
                      <option value="Jumbo Bags">Jumbo Bags (1-1.25 Ton)</option>
                      <option value="Small Bags">50kg Bags (Palletized)</option>
                      <option value="Loose Bulk">Loose Bulk</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Additional Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Specific chemical requirements or delivery timelines..."></textarea>
                </div>
                
                {status.message && (
                  <div className={`${styles.status} ${styles[status.type]}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Inquiry'} <Send size={18} style={{ marginLeft: '10px' }} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5228.136085202641!2d77.72241779895305!3d15.027798327013643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1777921676226!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0, display: 'block' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
