'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, FlaskConical, Shield } from 'lucide-react';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { PHONE_PRIMARY, PHONE_SECONDARY, GSTIN, whatsappUrl } from '@/data/contact';
import Logo from '@/components/Logo';

const Footer = () => {
  const { dict } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Top Banner */}
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.topBanner}>
            <div className={styles.bannerText}>
              <FlaskConical size={20} className={styles.bannerIcon} />
              <span>Lab Certified by <strong>Lucid Laboratories Pvt. Ltd.</strong> | Report No: LL/25-26/009401/1 | SiO₂ Purity: <strong>99.27%</strong></span>
            </div>
            <Link href="/quality" className={styles.bannerCta}>
              View Certificate <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.footerMain}>
        <div className="container">
          <div className={`${styles.grid} stagger`}>

            {/* Brand Column */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <Logo tone="light" />
              </Link>
              <p className={styles.brandDesc}>
                {dict?.footer?.desc || 'Premier producer and exporter of 99.27% high-purity silica quartz from our owned mine at Lakshupalli, Anantapur District. We serve global glass, ceramic, and metallurgical industries with uncompromising quality.'}
              </p>
              <div className={styles.gstNo} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', marginBottom: '1rem' }}>
                GST No: {GSTIN}
              </div>

              <div className={styles.certBadges}>
                <span className={styles.certBadge}>
                  <Shield size={13} /> Lab-Tested 99.27% SiO₂
                </span>
                <span className={styles.certBadge}>
                  <Shield size={13} /> GST Registered
                </span>
              </div>

            </div>

            {/* Company Links */}
            <div className={styles.linkCol}>
              <h3>{dict?.footer?.company || 'Company'}</h3>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/gallery">Photo Gallery</Link></li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className={styles.linkCol}>
              <h3>{dict?.footer?.resources || 'Products & Info'}</h3>
              <ul>
                <li><Link href="/products">Quartz Grades</Link></li>
                <li><Link href="/quality">Quality Control</Link></li>
                <li><Link href="/export">Export & Logistics</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/downloads">Technical Downloads</Link></li>
                <li><Link href="/request-sample">Request Sample</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className={styles.contactCol}>
              <h3>{dict?.footer?.get_in_touch || 'Get in Touch'}</h3>
              <ul>
                <li>
                  <MapPin size={16} />
                  <div>
                    <strong>Office</strong>
                    <span>Saroja Skyland, 402, Maruthi Nagar,<br />Ananthapur Road, Gooty – 515401,<br />Andhra Pradesh, India</span>
                  </div>
                </li>
                <li>
                  <MapPin size={16} />
                  <div>
                    <strong>Mine</strong>
                    <span>Lakshupalli, Medimakula Palli,<br />Peddavaduguru, Andhra Pradesh – 515405</span>
                  </div>
                </li>
                <li>
                  <Phone size={16} />
                  <div>
                    <strong>Sales & Inquiries</strong>
                    <a href={`tel:${PHONE_PRIMARY.tel}`}>{PHONE_PRIMARY.display}</a>
                    <a href={`tel:${PHONE_SECONDARY.tel}`}>{PHONE_SECONDARY.display}</a>
                  </div>
                </li>
                <li>
                  <Mail size={16} />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:sales@sumanthminerals.com">sales@sumanthminerals.com</a>
                    <a href="mailto:exports@sumanthminerals.com">exports@sumanthminerals.com</a>
                  </div>
                </li>
              </ul>

              <Link href="/contact" className={styles.contactBtn}>
                Contact Sales Team <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottom}>
            <p>
              &copy; {currentYear} Sumanth Minerals. {dict?.footer?.rights || 'All rights reserved.'}

            </p>
            <div className={styles.legal}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
