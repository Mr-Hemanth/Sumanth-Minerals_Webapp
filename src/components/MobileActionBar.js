import Link from 'next/link';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import styles from './MobileActionBar.module.css';
import { PHONE_PRIMARY, whatsappUrl } from '@/data/contact';

// Phones only: the three things a buyer wants within thumb reach.
export default function MobileActionBar() {
  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <nav className={styles.bar} aria-label="Quick contact">
      <a href={`tel:${PHONE_PRIMARY.tel}`} className={styles.item}>
        <Phone size={20} />
        <span>Call</span>
      </a>
      <a
        href={whatsappUrl('Hello Sumanth Minerals, I am interested in your quartz products.')}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.item} ${styles.whatsapp}`}
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      <Link href="/contact" className={`${styles.item} ${styles.quote}`}>
        <FileText size={20} />
        <span>Get quote</span>
      </Link>
    </nav>
    </>
  );
}
