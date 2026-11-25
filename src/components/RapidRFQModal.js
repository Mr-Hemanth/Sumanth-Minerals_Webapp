'use client';
import { useState, useEffect, useRef, useId } from "react";
import { X, Send, MessageCircle, CheckCircle, ShieldCheck, Truck, Package } from "lucide-react";
import styles from "./RapidRFQModal.module.css";
import { PHONE_PRIMARY, PHONE_SECONDARY, whatsappUrl } from '@/data/contact';

import { INDUSTRIES as INDUSTRY_OPTIONS } from "@/data/industries";

const SIZE_OPTIONS = ["Lumps", "0–12 mm", "12–30 mm", "30–80 mm", "Custom Screened"];

export default function RapidRFQModal({ isOpen, onClose, initialIndustry = "", initialSize = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    industry: initialIndustry || INDUSTRY_OPTIONS[0],
    preferredSize: initialSize || "12–30 mm",
    quantity: "500",
    packaging: "1 Ton Jumbo Bags (FIBC)",
    deliveryPort: "Delivered to Domestic Factory",
    message: "",
    fax: "" // honeypot — must stay empty
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackPath, setTrackPath] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pre-fill from the button that opened the modal
    if (initialIndustry) setFormData(prev => ({ ...prev, industry: initialIndustry }));
    if (initialSize) setFormData(prev => ({ ...prev, preferredSize: initialSize }));
  }, [initialIndustry, initialSize]);

  // Dialog behaviour: focus moves into the modal, Tab cycles inside it, Escape closes it,
  // the page behind cannot scroll, and focus returns to the button that opened it.
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  const uid = useId();
  const titleId = `${uid}-title`;
  const fid = (name) => `${uid}-${name}`;

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () => [...(dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
    ) || [])];
    // Start on the first form field, or the close button once the form is replaced by the success state.
    const first = dialogRef.current?.querySelector('form input:not([tabindex="-1"])') || focusables()[0];
    first?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCloseRef.current?.(); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const firstEl = items[0], lastEl = items[items.length - 1];
      const inside = dialogRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === firstEl || !inside)) {
        e.preventDefault(); lastEl.focus();
      } else if (!e.shiftKey && (document.activeElement === lastEl || !inside)) {
        e.preventDefault(); firstEl.focus();
      }
    };
    // Safety net: Safari skips links when tabbing, so the Tab handler above can miss the
    // dialog's last element and focus lands on the page behind. Pull it straight back.
    let lastKeyShift = false;
    const onKeyTrack = (e) => { if (e.key === 'Tab') lastKeyShift = e.shiftKey; };
    const onFocusIn = (e) => {
      const d = dialogRef.current;
      if (!d || d.contains(e.target)) return;
      const items = focusables();
      (lastKeyShift ? items[items.length - 1] : items[0])?.focus();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('keydown', onKeyTrack, true);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keydown', onKeyTrack, true);
      document.removeEventListener('focusin', onFocusIn);
      document.body.style.overflow = prevOverflow;
      if (trigger && typeof trigger.focus === 'function') trigger.focus();
    };
  }, [isOpen]);

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
        const result = await res.json().catch(() => ({}));
        setTrackPath(result.trackPath || null);
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
    const text = `Hello Sumanth Minerals, I would like to request a bulk quote for quartz (B-Grade / M-Grade):
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
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <h3 id={titleId}>Industrial Bulk RFQ & Commercial Terms</h3>
            <p>Direct Mine Supply • Sumanth Minerals (Lakshupalli, Andhra Pradesh)</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close quote request form">
            <X size={22} />
          </button>
        </div>

        <div className={styles.body}>
          {success ? (
            <div className={styles.successState}>
              <CheckCircle size={56} className={styles.successIcon} />
              <h3>RFQ Successfully Received!</h3>
              <p>Our commercial desk at Sumanth Minerals will verify stock availability and prepare your official quotation with laboratory COA within 2 hours.</p>
              {trackPath && (
                <p><a href={trackPath} style={{ fontWeight: 700, textDecoration: 'underline' }}>Track your request</a>: see your quotation and sample status as they are updated. We have also emailed you this link.</p>
              )}
              
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
                  <label htmlFor={fid("name")}>Full Name *</label>
                  <input id={fid("name")} autoComplete="name" 
                    type="text" 
                    required 
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("company")}>Company / Plant Name *</label>
                  <input id={fid("company")} autoComplete="organization" 
                    type="text" 
                    required 
                    placeholder="e.g. ABC Ceramics Pvt. Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("email")}>Work Email *</label>
                  <input id={fid("email")} autoComplete="email" 
                    type="email" 
                    required 
                    placeholder="purchase@yourcompany.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("whatsapp")}>WhatsApp / Mobile Number *</label>
                  <input id={fid("whatsapp")} autoComplete="tel" 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("industry")}>Target Industry / Application</label>
                  <select id={fid("industry")} 
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    {/* Buttons elsewhere can pre-fill context like "Freight Route: Rotterdam"; show it so the select matches what is submitted. */}
                    {formData.industry && !INDUSTRY_OPTIONS.includes(formData.industry) && (
                      <option value={formData.industry}>{formData.industry}</option>
                    )}
                    {INDUSTRY_OPTIONS.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("size")}>Required Fraction / Size</label>
                  <select id={fid("size")} 
                    value={formData.preferredSize}
                    onChange={(e) => setFormData({ ...formData, preferredSize: e.target.value })}
                  >
                    {formData.preferredSize && !SIZE_OPTIONS.includes(formData.preferredSize) && (
                      <option value={formData.preferredSize}>{formData.preferredSize}</option>
                    )}
                    <option value="Lumps">Quartz Lumps (size as required)</option>
                    <option value="0–12 mm">Quartz Grit 0–12 mm</option>
                    <option value="12–30 mm">Quartz Grit 12–30 mm</option>
                    <option value="30–80 mm">Quartz Grit 30–80 mm</option>
                    <option value="Custom Screened">Custom Mesh / Tailored Fraction</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor={fid("quantity")}>Estimated Volume (Metric Tons)</label>
                  <select id={fid("quantity")} 
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
                  <label htmlFor={fid("delivery")}>Preferred Delivery Terms</label>
                  <select id={fid("delivery")} 
                    value={formData.deliveryPort}
                    onChange={(e) => setFormData({ ...formData, deliveryPort: e.target.value })}
                  >
                    <option value="Delivered to Domestic Factory">Delivered to your plant in India (we arrange transport)</option>
                    <option value="Ex-Mine Pithead (Lakshupalli, AP)">Ex-Mine Pithead (Lakshupalli, Andhra Pradesh)</option>
                    <option value="FOB Krishnapatnam Port">FOB Krishnapatnam Port (Export)</option>
                    <option value="FOB Chennai Port">FOB Chennai Port (Export)</option>
                    <option value="CIF International Port">CIF International Port (Specify below)</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroupFull}>
                <label htmlFor={fid("message")}>Technical Specifications / Specific Chemical Tolerances (Optional)</label>
                <textarea id={fid("message")} 
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
