'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Package, Truck, ShieldCheck, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './export.module.css';
import { m } from 'framer-motion';
import RapidRFQModal from '@/components/RapidRFQModal';

const STEPS = [
  { icon: <Clock size={30} />, title: 'Inquiry & Quote', desc: 'Technical discussion of your requirement. Contact our sales team for pricing based on size, volume and destination.' },
  { icon: <ShieldCheck size={30} />, title: 'Quality Approval', desc: 'Pre-shipment inspection and lab reports shared for buyer approval.' },
  { icon: <Package size={30} />, title: 'Custom Packaging', desc: 'Jumbo bags or custom packaging options to ensure material integrity.' },
  { icon: <Truck size={30} />, title: 'Logistic Sync', desc: 'Coordination with major ports and shipping lines for timely dispatch.' },
  { icon: <Globe size={30} />, title: 'Global Delivery', desc: 'Real-time tracking and documentation support for customs clearance.' }
];

const PACKAGING_NOTES = [
  { label: 'Jumbo Bags', desc: '1 MT / 1.25 MT UV-stabilized PP bags with moisture-barrier inner liners.' },
  { label: 'Small Bags', desc: '25 kg / 50 kg bags stretch-wrapped on pallets for easy warehouse handling.' },
  { label: 'Container Load', desc: '25–28 MT per 20 ft FCL with optimized stuffing plans.' },
  { label: 'Port Access', desc: 'Short road transit to Krishnapatnam, Chennai, Ennore and Vizag.' },
];


const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerItem = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};

export default function Export() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSeed, setRfqSeed] = useState({ industry: '', size: '' });

  const openRFQ = (industry = '', size = '') => {
    setRfqSeed({ industry, size });
    setRfqOpen(true);
  };

  return (
    <div className={styles.exportPage}>
      <RapidRFQModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialIndustry={rfqSeed.industry}
        initialSize={rfqSeed.size}
      />

      <section className={styles.pageHeader}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Export</span>
          </nav>
          <h1 className="rise">Global Export Operations</h1>
          <p className="rise" style={{ "--rise-delay": "0.1s" }}>
            From pit-head in Andhra Pradesh to the berth — one team owns every step of the shipment.
          </p>
        </div>
      </section>

      <section className={styles.process}>
        <div className="container">
          <m.div className="section-title" {...fadeUp}>
            <span className="section-label">Workflow</span>
            <h2>Our Export Process</h2>
            <p>A streamlined sequence built for international trade efficiency — no trader in the middle.</p>
          </m.div>
          <m.div
            className={styles.processGrid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {STEPS.map((step, i) => (
              <m.div key={i} className={styles.processStep} variants={staggerItem}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepLine} aria-hidden="true" />
                <h4>{`${String(i + 1).padStart(2, '0')} · ${step.title}`}</h4>
                <p>{step.desc}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      <section className={styles.packaging}>
        <div className="container">
          <div className={styles.packagingGrid}>
            <m.div
              className={styles.packagingText}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">Packaging & Logistics</span>
              <h2>Purity Protected End to End</h2>
              <p>Mineral purity only counts if it survives the voyage. Our packaging standards are specified for long-distance international transit.</p>
              <ul className={styles.packList}>
                {PACKAGING_NOTES.map((note, i) => (
                  <li key={i}>
                    <strong>{note.label}:</strong> {note.desc}
                  </li>
                ))}
              </ul>
              <button type="button" className="btn btn-primary" onClick={() => openRFQ('Export Bulk RFQ', '12–30 mm')}>
                Request Freight Quote <ArrowRight size={16} />
              </button>
            </m.div>
            <m.div
              className={styles.packagingImage}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/quartz_12_30.jpg"
                alt="12–30 mm quartz grit from the Sumanth Minerals mine"
                fill
                sizes="(max-width: 992px) 100vw, 45vw"
              />
              <span className={styles.imageCaption}>12–30 mm quartz grit, ready for packing</span>
            </m.div>
          </div>
        </div>
      </section>

      <section className={styles.markets}>
        <div className="container">
          <m.div
            className={styles.marketBanner}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>Planning a shipment?</h2>
            <p>Tell us your destination port and quantity. We quote with dispatch dates and the documents your customs team needs.</p>
            <div className={styles.bannerActions}>
              <Link href="/contact" className="btn btn-white">
                Contact Sales Team <ArrowRight size={16} />
              </Link>
              <Link href="/downloads" className="btn btn-outline-white">
                Export Documentation Pack
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
