'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Quality', href: '/quality' },
    { name: 'Export', href: '/export' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            KANAKA <span>MINERALS</span>
          </Link>

          <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={styles.link}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/request-sample" className={styles.link}>Samples</Link>
            <div className={styles.langSelector}>
              <span>EN</span>
              <div className={styles.langDropdown}>
                <button>AR</button>
                <button>ZH</button>
                <button>DE</button>
              </div>
            </div>
            <Link href="/contact" className="btn btn-primary">Quote</Link>
          </div>

          <div className={styles.mobileActions}>
            <a href="tel:+919876543210" className={styles.phoneIcon}>
              <PhoneCall size={20} />
            </a>
            <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
