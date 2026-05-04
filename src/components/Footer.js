import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <Link href="/" className={styles.logo}>
              KANAKA <span>MINERALS</span>
            </Link>
            <p className={styles.description}>
              Leading producer and exporter of high-purity Quartz from India. We specialize in industrial-grade silica quartz for global markets.
            </p>
            <div className={styles.socials}>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
            </div>
          </div>

          <div className={styles.links}>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/news">News & Media</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h3>Resources</h3>
            <ul>
              <li><Link href="/products">Our Products</Link></li>
              <li><Link href="/quality">Quality Control</Link></li>
              <li><Link href="/export">Export & Logistics</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
              <li><Link href="/downloads">Technical Downloads</Link></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h3>Get in Touch</h3>
            <ul>
              <li>
                <MapPin size={18} />
                <span>Lakshayampalli, Tadipatri Mandal, Anantapur, AP, India</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <Mail size={18} />
                <span>sales@kanakaminerals.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Kanaka Minerals. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/admin">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
