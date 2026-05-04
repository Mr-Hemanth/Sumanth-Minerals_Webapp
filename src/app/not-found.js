'use client';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.visual}>
          <Search size={100} strokeWidth={1} className={styles.searchIcon} />
          <h1>404</h1>
        </div>
        <h2>Mineral Not Found</h2>
        <p>The page you are looking for has been moved, removed, or never existed in our inventory.</p>
        
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            <Home size={18} /> Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Support
          </Link>
        </div>
      </motion.div>
      
      <div className={styles.background}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
    </div>
  );
}
