'use client';
import { useState, useEffect } from "react";
import { X, Send, MessageCircle, CheckCircle, ShieldCheck, Truck, Package } from "lucide-react";
import styles from "./RapidRFQModal.module.css";
import { PHONE_PRIMARY, PHONE_SECONDARY, whatsappUrl } from '@/data/contact';

export default function RapidRFQModal({ isOpen, onClose, initialIndustry = "", initialSize = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    industry: initialIndustry || "Solar & Glass",
    preferredSize: initialSize || "12–30 mm",
    quantity: "500",
    packaging: "1 Ton Jumbo Bags (FIBC)",
    deliveryPort: "Ex-Mine Pithead (Tadipatri, AP)",
    message: "",
    fax: "" // honeypot — must stay empty
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialIndustry) setFormData(prev => ({ ...prev, industry: initialIndustry }));
    if (initialSize) setFormData(prev => ({ ...prev, preferredSize: initialSize }));
  }, [initialIndustry, initialSize]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "Bulk RFQ" }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const result = await res.json().catch(() => ({}));
        setError(result.error || "Failed to record inquiry. You can also contact us directly via WhatsApp.");
      }
    } catch (err) {
      setError("Network error. Please try WhatsApp direct.");
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppURL = () => {
    const text = `Hello Sumanth Minerals, I would like to request a bulk quote for High-Purity Quartz (99.27% SiO2):
- Company: ${formData.company || "Procurement Desk"}
- Industry: ${formData.industry}
- Fraction/Size: ${formData.preferredSize}
- Volume: ${formData.quantity} MT
- Packaging: ${formData.packaging}
- Delivery: ${formData.deliveryPort}
Please share your commercial terms and sample dispatch schedule.`;
    return whatsappUrl(text);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3>Industrial Bulk RFQ & Commercial Terms</h3>
            <p>Direct Mine Supply • Sumanth Minerals (Tadipatri, Andhra Pradesh)</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className={styles.body}>
          {success ? (
            <div className={styles.successState}>
              <CheckCircle size={56} className={styles.successIcon} />
              <h3>RFQ Successfully Received!</h3>
              <p>Our commercial desk at Sumanth Minerals will verify stock availability and prepare your official quotation with laboratory COA within 2 hours.</p>
              
              <div className={styles.whatsappFollowUp}>
                <p>Need urgent pricing for an ongoing tender or immediate factory shipment?</p>
                <a 
                  href={getWhatsAppURL()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.waBtn}
                >
                  <MessageCircle size={20} />
                  <span>Connect Directly with Sales Desk on WhatsApp</span>
                </a>
              </div>

              <button className={styles.doneBtn} onClick={onClose}>
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.alertError} role="alert">{error}</div>}
              <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} value={formData.fax} onChange={(e) => setFormData({ ...formData, fax: e.target.value })} />

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rajesh Kumar / Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Company / Plant Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Asian Float Glass Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Work Email *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="procurement@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>WhatsApp / Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+Country code and number"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Target Industry / Application</label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="Solar & Photovoltaic Glass">Solar & Photovoltaic Glass</option>
                    <option value="Engineered Quartz Slabs">Engineered Quartz Slabs & Countertops</option>
                    <option value="Float & Container Glass">Float & Container Glass</option>
                    <option value="Ceramics & Sanitaryware">Ceramics & Sanitaryware</option>
                    <option value="Ferro-Silicon & Metallurgy">Ferro-Silicon & Metallurgy</option>
                    <option value="Refractory & Foundry">Refractory & Foundry</option>
                    <option value="Other / Processing">Other Specialized Use</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Required Fraction / Size</label>
                  <select 
                    value={formData.preferredSize}
                    onChange={(e) => setFormData({ ...formData, preferredSize: e.target.value })}
                  >
                    <option value="0–12 mm">0–12 mm (Grit / Fine Filler)</option>
                    <option value="12–30 mm">12–30 mm (Glass & Ceramic Standard)</option>
                    <option value="30–80 mm">30–80 mm (Lump Quartz / Metallurgical)</option>
                    <option value="Run-of-Mine Boulders">Run-of-Mine (ROM Boulders)</option>
                    <option value="Custom Screened">Custom Mesh / Tailored Fraction</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Estimated Volume (Metric Tons)</label>
                  <select 
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  >
                    <option value="5-25 (Test Sample)">Sample Parcel (5kg to 25kg)</option>
                    <option value="50-200">50 – 200 MT (Trial Commercial Lot)</option>
                    <option value="500">500 MT (Standard Shipment)</option>
                    <option value="1000">1,000 MT</option>
                    <option value="5000+">5,000+ MT (Annual Supply Contract)</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Preferred Delivery Terms</label>
                  <select 
                    value={formData.deliveryPort}
                    onChange={(e) => setFormData({ ...formData, deliveryPort: e.target.value })}
                  >
                    <option value="Ex-Mine Pithead (Tadipatri, AP)">Ex-Mine Pithead (Tadipatri, Andhra Pradesh)</option>
                    <option value="FOB Krishnapatnam Port">FOB Krishnapatnam Port (Deep-Water Export)</option>
                    <option value="FOB Chennai Port">FOB Chennai Port</option>
                    <option value="CIF International Port">CIF International Port (Specify below)</option>
                    <option value="Delivered to Domestic Factory">Delivered to Domestic Plant (India)</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroupFull}>
                <label>Technical Specifications / Specific Chemical Tolerances (Optional)</label>
                <textarea 
                  rows={2}
                  placeholder="Mention any custom mesh sizes, maximum Fe2O3 tolerance, or container packaging instructions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className={styles.btnRow}>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  <Send size={18} />
                  <span>{loading ? "Submitting RFQ..." : "Submit Formal RFQ"}</span>
                </button>

                <a 
                  href={getWhatsAppURL()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.waDirectBtn}
                >
                  <MessageCircle size={18} />
                  <span>Direct WhatsApp RFQ</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
