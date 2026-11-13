'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight, Award, ShieldCheck, Truck, BarChart, Zap, Globe,
  Layers, Droplets, Mountain, Factory, Activity, Microscope, Leaf,
  Star, CheckCircle, ArrowRight, FlaskConical, FileText, Users
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '@/components/Magnetic';
import LiveMineStatusTicker from '@/components/LiveMineStatusTicker';
import MiningProcessWorkflow from '@/components/MiningProcessWorkflow';
import RapidRFQModal from '@/components/RapidRFQModal';
import { CHEMISTRY as C } from '@/data/specs';
import { PHONE_PRIMARY, PHONE_SECONDARY, whatsappUrl } from '@/data/contact';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
});

export default function Home() {
  const { dict } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSeed, setRfqSeed] = useState({ industry: '', size: '' });

  const openRFQ = (industry = '', size = '') => {
    setRfqSeed({ industry, size });
    setRfqOpen(true);
  };

  const chemicalData = [
    { label: 'SiO₂ (Silica)', value: C.SiO2, highlight: true },
    { label: 'Fe₂O₃ (Iron Oxide)', value: C.Fe2O3 },
    { label: 'Al₂O₃ (Alumina)', value: C.Al2O3 },
    { label: 'CaO (Calcium)', value: C.CaO },
    { label: 'MgO (Magnesium)', value: C.MgO },
    { label: 'K₂O (Potassium)', value: C.K2O },
  ];

  const industries = [
    { icon: <Zap size={28} />, name: 'Solar Glass & PV', grade: '0–12 mm', desc: 'Ultra-low Fe₂O₃ content maximizes light transmittance for solar panels and photovoltaic glass.' },
    { icon: <Layers size={28} />, name: 'Engineered Stone', grade: '12–30 mm', desc: 'Consistent whiteness (95%+) and Mohs 7 hardness for premium quartz countertops and surfaces.' },
    { icon: <Droplets size={28} />, name: 'Advanced Ceramics', grade: '12–30 mm', desc: 'Superior thermal stability for vitrified tiles, sanitaryware, and electrical insulators.' },
    { icon: <Activity size={28} />, name: 'Metallurgy', grade: '30–80 mm', desc: 'High fusion point (1713°C) lump quartz for ferro-silicon and silicomanganese smelting.' },
    { icon: <Microscope size={28} />, name: 'Silicon Metal', grade: '0–12 mm / 30–80 mm', desc: 'Purity-grade quartz as precursor material in silicon metal and semiconductor production.' },
    { icon: <Mountain size={28} />, name: 'Water Filtration', grade: '30–80 mm', desc: 'Graded filter media for industrial water treatment and purification systems.' },
  ];

  const trustPoints = [
    { icon: <ShieldCheck size={36} />, title: 'Certified 99.27% Purity', desc: 'Lab-certified by Lucid Laboratories Pvt. Ltd. with comprehensive batch reports.' },
    { icon: <BarChart size={36} />, title: '10,000 Tons / Month', desc: 'Large-scale mining rights across 50+ acres ensuring uninterrupted industrial supply.' },
    { icon: <Award size={36} />, title: 'Precision Graded', desc: 'Three standard grades: 0–12 mm, 12–30 mm, 30–80 mm. Custom sizes available.' },
    { icon: <Truck size={36} />, title: 'Port-Ready Export', desc: 'Chennai, Krishnapatnam, Ennore & Vizag ports within efficient trucking distance.' },
  ];

  const features = [
    'Direct ownership of 50+ acres of high-yield quartz mines',
    'In-house washing, crushing, and precision screening facility',
    'Zero-contamination magnetic separation process',
    'Dedicated ISO 9001:2015 certified quality control laboratory',
    'MSME registered & Export certified organization',
    'Custom grading available for bulk orders (500+ tons)',
  ];

  const products = [
    {
      size: '0–12 mm',
      type: 'Fine / Industrial Filler Grade',
      image: '/quartz_0_12.jpg',
      tone: 'toneFine',
      specs: [`SiO₂: ${C.SiO2}`, `Fe₂O₃: ${C.Fe2O3}`, 'Mohs: 7.0'],
      uses: ['Precision Glassware', 'Industrial Fillers', 'Silicon Metal', 'Investment Casting'],
    },
    {
      size: '12–30 mm',
      type: 'Medium / Ceramic Grade',
      image: '/quartz_12_30.jpg',
      tone: 'toneCeramic',
      specs: ['SiO₂: 99.27%', 'Whiteness: 95%+', 'Moisture: <0.5%'],
      uses: ['Vitrified Tiles', 'Sanitaryware', 'Artistic Glass', 'Silicon Carbide'],
    },
    {
      size: '30–80 mm',
      type: 'Large Lump Grade',
      image: '/quartz_30_80.jpg',
      tone: 'toneLump',
      specs: [`SiO₂: ${C.SiO2}`, 'Fusion Pt: 1713°C', `LOI: ${C.LOI}`],
      uses: ['Ferro-Silicon', 'Silicomanganese', 'Refractories', 'Water Filtration'],
    },
  ];

  const ports = [
    { name: 'Chennai Port', route: 'South East Asia & Europe Gateway', distance: '~340 km' },
    { name: 'Krishnapatnam Port', route: 'Deep-water bulk vessel hub', distance: '~180 km' },
    { name: 'Ennore Port', route: 'North Indian & Middle East route', distance: '~320 km' },
    { name: 'Vizag (VOPT)', route: 'East Asian industrial zones', distance: '~400 km' },
  ];

  const exportCountries = ['UAE', 'Germany', 'China', 'Vietnam', 'South Korea', 'Saudi Arabia', 'Netherlands', 'Bangladesh'];

  return (
    <div className={styles.home}>

      {/* ─── Structured Data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sumanth Minerals",
            "@id": "https://sumanthminerals.com",
            "url": "https://sumanthminerals.com",
            "telephone": PHONE_PRIMARY.tel,
            "email": "sales@sumanthminerals.com",
            "description": "Premier producer and exporter of 99.27% pure silica quartz from Lakshyampalli, Anantapur, Andhra Pradesh, India.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lakshyampalli, Peddavaduguru Mandal",
              "addressLocality": "Anantapur",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "515411",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 15.027, "longitude": 77.722 },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "High-Purity Quartz Products",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz 0–12 mm Fine Grade" }},
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz 12–30 mm Ceramic Grade" }},
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz 30–80 mm Lump Grade" }}
              ]
            }
          })
        }}
      />

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section className={styles.hero} ref={heroRef}>
        {/* Background with parallax */}
        <motion.div className={styles.heroBg} style={{ y: heroY }}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroParticles}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                animate={{ y: [0, -30, 0], opacity: [0.03, 0.12, 0.03] }}
                transition={{ duration: 5 + i * 1.2, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
                style={{ left: `${10 + i * 16}%`, top: `${20 + (i % 3) * 25}%` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.heroContent} style={{ opacity: heroOpacity }}>
          <div className="container">
            <motion.span
              className={styles.heroBadge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className={styles.badgeDot} />
              {dict?.hero?.badge || 'DIRECT MINE OWNER · LAKSHYAMPALLI, ANANTAPUR, INDIA'}
            </motion.span>

            <div className={styles.heroTitle}>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                {dict?.hero?.title || (
                  <>Unmatched Purity.<br /><span className={styles.heroTitleAccent}>Global Industrial Scale.</span></>
                )}
              </motion.h1>
            </div>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {dict?.hero?.subtitle || 'Direct mine-to-manufacturer supply of 99.27% pure silica quartz from our mines in Lakshyampalli, Anantapur. Lab-certified, precision-graded, and export-ready for global industrial manufacturers.'}
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Magnetic>
                <Link href="/contact" className="btn btn-gold btn-lg">
                  {dict?.nav?.quote || 'Bulk Inquiry'} <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/request-sample" className="btn btn-outline-white btn-lg">
                  {dict?.nav?.samples || 'Request Sample'}
                </Link>
              </Magnetic>
              <Link href="/quality" className={styles.certLink}>
                <FlaskConical size={16} />
                View Lab Certificate
              </Link>
            </motion.div>

            <motion.div
              className={styles.heroStats}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className={styles.statItem}>
                <div className={styles.statNumber}>99.27%</div>
                <div className={styles.statLabel}>{dict?.hero?.stat_silica || 'Silica Purity (SiO₂)'}</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>{dict?.hero?.stat_production || 'Tons / Month Capacity'}</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Acres Mining Area</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>{dict?.hero?.stat_ports || 'Export Ports Access'}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </motion.div>
      </section>

      <LiveMineStatusTicker />

      {/* ════════════════════════════════════════
          TRUST STRIP
      ════════════════════════════════════════ */}
      <section className={styles.trustStrip}>
        <div className="container">
          <motion.div className={styles.trustGrid} {...fadeUp}>
            {trustPoints.map((item, i) => (
              <motion.div
                key={i}
                className={styles.trustCard}
                {...stagger(i * 0.1)}
                whileHover={{ y: -6 }}
              >
                <div className={styles.trustIcon}>{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT / SUMANTH ADVANTAGE
      ════════════════════════════════════════ */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutVisual}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.aboutImageBox}>
                <div className={styles.mineralPattern} />
                <div className={styles.aboutImageOverlay}>
                  <div className={styles.certBadge}>
                    <FlaskConical size={20} />
                    <div>
                      <strong>Lucid Laboratories Certified</strong>
                      <span>Report No: LL/25-26/009401/1</span>
                    </div>
                  </div>
                  <div className={styles.productionBadge}>
                    <Factory size={18} />
                    <div>
                      <strong>Active Mining Operations</strong>
                      <span>Tadipatri, Andhra Pradesh</span>
                    </div>
                  </div>
                </div>
                <div className={styles.mineTag}>TADIPATRI MINING HUB</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">The Sumanth Advantage</span>
              <h2>Scale, Purity &<br />Performance</h2>
              <p>
                As a <strong>direct mine owner</strong> in Lakshyampalli near Anantapur, Sumanth Minerals eliminates all middlemen. Our vertical integration from extraction at our Anantapur mines to global export ensures you receive the highest quality silica quartz at competitive B2B rates with guaranteed supply continuity.
              </p>

              <ul className={styles.featureList}>
                {features.map((f, i) => (
                  <motion.li key={i} {...stagger(i * 0.07)}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>

              <div className={styles.aboutActions}>
                <Link href="/about" className="btn btn-primary">
                  Full Company Profile <ArrowRight size={16} />
                </Link>
                <Link href="/quality" className="btn btn-outline">
                  Lab Reports
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHEMICAL COMPOSITION — LIVE DATA
      ════════════════════════════════════════ */}
      <section className={styles.chemSection}>
        <div className="container">
          <div className={styles.chemGrid}>
            <motion.div className={styles.chemContent} {...fadeUp}>
              <span className="section-label">Verified Lab Data</span>
              <h2>Certified Chemical Composition</h2>
              <p>
                Every batch undergoes rigorous testing at our in-house laboratory, verified by <strong>Lucid Laboratories Pvt. Ltd.</strong> (IS 1917 Standard). Our 99.27% SiO₂ purity is consistently maintained across all product grades.
              </p>
              <div className={styles.certDetails}>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>MSME Registered</span>
                </div>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>Export Certified</span>
                </div>
              </div>
              <div className={styles.chemActions}>
                <Link href="/quality" className="btn btn-primary">
                  <FileText size={16} /> View Full Lab Report
                </Link>
                <Link href="/downloads" className="btn btn-outline">
                  Download TDS
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={styles.chemTable}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.tableHeader}>
                <FlaskConical size={18} />
                <span>Chemical Analysis Report</span>
                <span className={styles.certTag}>Certified</span>
              </div>
              {chemicalData.map((row, i) => (
                <motion.div
                  key={i}
                  className={`${styles.tableRow} ${row.highlight ? styles.rowHighlight : ''}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <span className={styles.rowLabel}>{row.label}</span>
                  <span className={`${styles.rowValue} ${row.highlight ? styles.valueHighlight : ''}`}>
                    {row.value}
                  </span>
                  {row.highlight && (
                    <div className={styles.purityBar}>
                      <motion.div
                        className={styles.purityFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: '99.27%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
              <div className={styles.tableFooter}>
                * Tested by Lucid Laboratories Pvt. Ltd. | Report No: LL/25-26/009401/1
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCTS OVERVIEW
      ════════════════════════════════════════ */}
      <section className={styles.productsSection}>
        <div className="container">

          <motion.div className="section-title section-title--left" {...fadeUp}>
            <span className="section-label">Our Products</span>
            <h2>Precision-Graded Quartz</h2>
            <p>
              Three standard grades engineered for diverse industrial applications, all maintaining 99%+ SiO₂ purity.
            </p>
          </motion.div>

          <div className={styles.productGrid}>
            {products.map((p, i) => (
              <motion.article
                key={p.size}
                className={`${styles.productCard} ${styles[p.tone]}`}
                {...stagger(i * 0.12)}
              >
                <div className={styles.productImageBox}>
                  <Image
                    src={p.image}
                    alt={`${p.size} quartz — ${p.type}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={styles.productImage}
                  />
                  <span className={styles.sizeBadge}>{p.size}</span>
                </div>

                <div className={styles.productCardBody}>
                  <span className={styles.productType}>{p.type}</span>

                  <div className={styles.productSpecs}>
                    {p.specs.map((spec) => (
                      <span key={spec} className={styles.specChip}>{spec}</span>
                    ))}
                  </div>

                  <div className={styles.productUses}>
                    <p className={styles.usesLabel}>Industrial Applications</p>
                    <div className={styles.usesTags}>
                      {p.uses.map((use) => (
                        <span key={use} className={styles.useTag}>{use}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.productCardActions}>
                    <Link href="/products" className={styles.productCta}>
                      Technical Specs <ChevronRight size={16} />
                    </Link>
                    <button
                      type="button"
                      className={styles.productQuoteBtn}
                      onClick={() => openRFQ('', p.size)}
                    >
                      Get Price
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className={styles.productsFootnote}>
            <span>Need a non-standard fraction?</span>
            <Link href="/contact">Talk to a metallurgist →</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INDUSTRY APPLICATIONS
      ════════════════════════════════════════ */}
      <section className={styles.industriesSection}>
        <div className="container">
          <motion.div className="section-title section-title--left" {...fadeUp}>
            <span className="section-label">Industries We Serve</span>
            <h2>Find your application</h2>
            <p>Each sector runs on a different size fraction. Here is where our three grades are used most.</p>
          </motion.div>
          <div className={styles.industriesGrid}>
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                className={`${styles.industryCard} ${i === 0 ? styles.industryFeatured : ''}`}
                {...stagger(i * 0.08)}
              >
                <div className={styles.industryIcon}>{ind.icon}</div>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
                <Link href="/products" className={styles.industryGrade}>
                  <span>Recommended</span>
                  {ind.grade}
                </Link>
              </motion.div>
            ))}
            <motion.div className={styles.industriesCta} {...stagger(0.48)}>
              <h3>Not seeing your process?</h3>
              <p>We blend and screen to buyer specifications — share your sieve analysis or furnace notes and we will match a grade.</p>
              <Link href="/contact">Talk to our technical team <ArrowRight size={15} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GLOBAL EXPORT / PORT ACCESS
      ════════════════════════════════════════ */}
      <section className={styles.exportSection}>
        <div className="container">
          <div className={styles.exportGrid}>
            <motion.div
              className={styles.exportContent}
              {...fadeUp}
            >
              <span className="section-label">Global Reach</span>
              <h2>Gateway to World Markets</h2>
              <p>
                Strategically located in Andhra Pradesh, we leverage India's most efficient mineral export corridor. Our proximity to four major ports enables seamless bulk shipping to industrial hubs worldwide.
              </p>

              <div className={styles.portsList}>
                {ports.map((port, i) => (
                  <motion.div
                    key={i}
                    className={styles.portItem}
                    {...stagger(i * 0.1)}
                  >
                    <div className={styles.portDot} />
                    <div className={styles.portInfo}>
                      <strong>{port.name}</strong>
                      <span>{port.route}</span>
                    </div>
                    <div className={styles.portDistance}>{port.distance}</div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.exportCountries}>
                <p className={styles.exportsLabel}>Currently exporting to:</p>
                <div className={styles.countryTags}>
                  {exportCountries.map((c, i) => (
                    <span key={i} className={styles.countryTag}>{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.exportVisual}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9 }}
            >
              <div className={styles.globeBox}>
                <Globe size={200} strokeWidth={0.8} className={styles.globeIcon} />
                <div className={styles.globeRing} />
                <div className={styles.globePing} />
                <div className={styles.exportStat}>
                  <strong>15+</strong>
                  <span>Countries</span>
                </div>
                <div className={styles.exportStat2}>
                  <strong>FCL</strong>
                  <span>25–28 Tons</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROCESS / MINE-TO-PORT PIPELINE
      ════════════════════════════════════════ */}
      <section className={styles.processSection}>
        <div className="container">
          <MiningProcessWorkflow />
        </div>
      </section>

      {/* ════════════════════════════════════════
          COMPLIANCE & COMMUNITY
      ════════════════════════════════════════ */}
      <section className={styles.complianceStrip}>
        <div className="container">
          <motion.div className={styles.complianceGrid} {...fadeUp}>
            {[
              { icon: <Leaf size={22} />, title: 'Rehabilitated benches', note: 'Pit backfilling and native plantation alongside active extraction.' },
              { icon: <Users size={22} />, title: '150+ local jobs', note: 'Direct employment drawn from the Tadipatri mining belt.' },
              { icon: <ShieldCheck size={22} />, title: 'ISO 9001:2015', note: 'Documented quality control with third-party audit trail.' },
            ].map((item) => (
              <div key={item.title} className={styles.complianceItem}>
                <span className={styles.complianceIcon}>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
            <Link href="/sustainability" className={styles.complianceLink}>
              Read the sustainability report <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CALL TO ACTION
      ════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.ctaContent}>
              <motion.span className={styles.ctaLabel} {...stagger(0)}>
                Ready to Partner?
              </motion.span>
              <motion.h2 {...stagger(0.1)}>
                Empower Your Production with<br />Premium Indian Silica Quartz
              </motion.h2>
              <motion.p {...stagger(0.2)}>
                Join our global network of manufacturers. Request a certified lab sample today — shipped via DHL/FedEx, accompanied by our full analysis report.
              </motion.p>
              <motion.div className={styles.ctaActions} {...stagger(0.3)}>
                <Magnetic>
                  <button type="button" className="btn btn-white btn-lg" onClick={() => openRFQ()}>
                    Get a Quote in 60 Seconds <ArrowRight size={18} />
                  </button>
                </Magnetic>
                <Magnetic>
                  <Link href="/request-sample" className="btn btn-outline-white btn-lg">
                    Request Free Sample
                  </Link>
                </Magnetic>
              </motion.div>
              <div className={styles.ctaStats}>
                <div className={styles.ctaStat}><strong>24–48h</strong><span>Quote Turnaround</span></div>
                <div className={styles.ctaStatDivider} />
                <div className={styles.ctaStat}><strong>10–15 Days</strong><span>Port Delivery</span></div>
                <div className={styles.ctaStatDivider} />
                <div className={styles.ctaStat}><strong>25–28 MT</strong><span>FCL Capacity</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <RapidRFQModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialIndustry={rfqSeed.industry}
        initialSize={rfqSeed.size}
      />

    </div>
  );
}
