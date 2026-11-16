'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight, Award, ShieldCheck, Truck, BarChart, Zap, Globe,
  Layers, Droplets, Mountain, Factory, Activity, Microscope, Leaf,
  Star, CheckCircle, ArrowRight, FlaskConical, FileText, Users,
  Flame, BrickWall, Hammer, Cog, Pickaxe, Ship
} from 'lucide-react';
import { m, useScroll, useTransform } from 'framer-motion';
import styles from './page.module.css';
import { useLanguage } from '@/context/LanguageContext';
import Magnetic from '@/components/Magnetic';
import MiningProcessWorkflow from '@/components/MiningProcessWorkflow';
import RapidRFQModal from '@/components/RapidRFQModal';
import CountUp from '@/components/CountUp';
// Static imports: hashed file names (cached forever) and a built-in blur placeholder.
import heroImg from '../../public/hero-stockpile.jpg';
import lumpsImg from '../../public/quartz_lumps.jpg';
import fineImg from '../../public/quartz_0_12.jpg';
import mediumImg from '../../public/quartz_12_30.jpg';
import coarseImg from '../../public/quartz_30_80.jpg';
import { CHEMISTRY as C } from '@/data/specs';
import { PHONE_PRIMARY, PHONE_SECONDARY, GSTIN, whatsappUrl } from "@/data/contact";

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
    { icon: <Flame size={28} />, name: 'Ferrosilicon', grade: 'Lumps / 30–80 mm', desc: 'Quartz lumps and coarse grit as the silica source for ferrosilicon smelting.' },
    { icon: <Microscope size={28} />, name: 'Silicon Metal', grade: 'Lumps', desc: 'Lump quartz for silicon metal smelting. We share full chemistry so you can check it against your furnace spec.' },
    { icon: <Activity size={28} />, name: 'Ferroalloys', grade: 'Lumps / 30–80 mm', desc: 'Silica feed for silicomanganese and other ferroalloy production.' },
    { icon: <BrickWall size={28} />, name: 'Refractories', grade: '12–30 / 30–80 mm', desc: '99.27% SiO₂ and a 1713°C fusion point for silica bricks and furnace linings.' },
    { icon: <Droplets size={28} />, name: 'Ceramics & Vitrified Tiles', grade: '0–12 / 12–30 mm', desc: 'Silica for tile bodies, glazes and sanitaryware.' },
    { icon: <Layers size={28} />, name: 'Glass Manufacturing', grade: '0–12 mm', desc: 'Batch silica for container and coloured glass.' },
    { icon: <Hammer size={28} />, name: 'Foundry & Steel Casting', grade: '0–12 mm', desc: 'Quartz grit for moulding, core and investment casting.' },
    { icon: <Cog size={28} />, name: 'Quartz Powder & Silica Processing', grade: 'Lumps / Grit', desc: 'Consistent feedstock for grinding into quartz powder and micronised silica.' },
    { icon: <Pickaxe size={28} />, name: 'Industrial Mineral Processing', grade: 'Lumps / Grit', desc: 'Raw quartz in the size your crushing or beneficiation plant needs.' },
    { icon: <Mountain size={28} />, name: 'Silica Sand Manufacturing', grade: 'Lumps / 0–12 mm', desc: 'Feed for crushing and washing into graded silica sand.' },
    { icon: <Ship size={28} />, name: 'Quartz Exporters', grade: 'All sizes', desc: 'Mine-direct supply with 40,000 MT of ready stock to fill your export orders.' },
    { icon: <Truck size={28} />, name: 'Traders & Distributors', grade: 'All sizes', desc: 'Steady volumes of up to 15,000 MT a month, direct from the mine, for resale.' },
  ];

  const trustPoints = [
    { icon: <Mountain size={36} />, title: 'Our own mine', desc: 'Quartz comes straight from our mine at Lakshupalli, Peddavaduguru. No traders in between.' },
    { icon: <FlaskConical size={36} />, title: 'Lab report shared', desc: 'Full Lucid Laboratories analysis (Report LL/25-26/009401/1) available to download.' },
    { icon: <Award size={36} />, title: 'Lumps & Graded Grit', desc: 'Quartz lumps plus grit in 0–12 mm, 12–30 mm and 30–80 mm. Custom sizes available.' },
    { icon: <Truck size={36} />, title: 'Port-Ready Export', desc: 'Chennai, Krishnapatnam, Ennore & Vizag ports within efficient trucking distance.' },
  ];

  const features = [
    'Our own mine at Lakshupalli, Peddavaduguru — no traders in between',
    '15,000 MT mined every month',
    '40,000 MT of ready stock available for dispatch',
    'Lumps sized to your requirement, plus 0–12, 12–30 and 30–80 mm grit',
    'GST-registered firm, office in Gooty, Andhra Pradesh',
  ];

  const products = [
    {
      size: 'Lumps',
      type: 'Quartz Lumps — size as required',
      image: lumpsImg,
      tone: 'toneLump',
      specs: [`SiO₂: ${C.SiO2}`, `Fe₂O₃: ${C.Fe2O3}`, `LOI: ${C.LOI}`],
      uses: ['Ferro-Silicon', 'Silicomanganese', 'Refractories', 'Crushing Feed'],
    },
    {
      size: '0–12 mm',
      type: 'Quartz Grit — Fine',
      image: fineImg,
      tone: 'toneFine',
      specs: [`SiO₂: ${C.SiO2}`, `Fe₂O₃: ${C.Fe2O3}`, 'Mohs: 7.0'],
      uses: ['Container Glass', 'Industrial Fillers', 'Foundry Sand', 'Investment Casting'],
    },
    {
      size: '12–30 mm',
      type: 'Quartz Grit — Medium',
      image: mediumImg,
      tone: 'toneCeramic',
      specs: [`SiO₂: ${C.SiO2}`, `Al₂O₃: ${C.Al2O3}`, 'Mohs: 7.0'],
      uses: ['Vitrified Tiles', 'Sanitaryware', 'Artistic Glass', 'Silicon Carbide'],
    },
    {
      size: '30–80 mm',
      type: 'Quartz Grit — Coarse',
      image: coarseImg,
      tone: 'toneCoarse',
      specs: [`SiO₂: ${C.SiO2}`, 'Fusion Pt: 1713°C', `LOI: ${C.LOI}`],
      uses: ['Ferro-Silicon', 'Silicomanganese', 'Refractories', 'Water Filtration'],
    },
  ];

  const ports = [
    { name: 'Chennai Port', route: 'South East Asia & Europe Gateway', distance: '~400 km by road' },
    { name: 'Krishnapatnam Port', route: 'Deep-water bulk vessel hub', distance: '~330 km by road' },
    { name: 'Ennore Port', route: 'North Indian & Middle East route', distance: '~390 km by road' },
    { name: 'Vizag (VOPT)', route: 'East Asian industrial zones', distance: '~800 km by road' },
  ];


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
            "@id": "https://www.sumanthminerals.com",
            "url": "https://www.sumanthminerals.com",
            "telephone": PHONE_PRIMARY.tel,
            "taxID": GSTIN,
            "email": "sales@sumanthminerals.com",
            "description": "Mine owner and supplier of 99.27% SiO₂ silica quartz from Lakshupalli, Peddavaduguru, Anantapur District, Andhra Pradesh, India.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Saroja Skyland, 402, Maruthi Nagar, Ananthapur Road",
              "addressLocality": "Gooty",
              "addressRegion": "Andhra Pradesh",
              "postalCode": "515401",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 15.027, "longitude": 77.722 },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "High-Purity Quartz Products",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz Lumps" }},
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz Grit 0–12 mm" }},
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz Grit 12–30 mm" }},
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quartz Grit 30–80 mm" }}
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
        <m.div className={styles.heroBg} style={{ y: heroY }}>
          <Image
            src={heroImg}
            alt="Stockpiles of graded quartz with conveyor stackers at the Sumanth Minerals mine"
            fill
            priority
            quality={50}
            placeholder="blur"
            // The photo sits under a dark overlay, so phones do not need full-DPR detail.
            sizes="(max-width: 768px) 75vw, 100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </m.div>
        <div className={styles.heroStrata} aria-hidden="true" />

        <m.div className={styles.heroContent} style={{ opacity: heroOpacity }}>
          <div className="container">
            <span className={`${styles.heroBadge} rise`} style={{ "--rise-delay": "0.05s" }}>
              <span className={styles.badgeDot} />
              {dict?.hero?.badge || 'DIRECT MINE OWNER · ANDHRA PRADESH, INDIA'}
            </span>

            <div className={styles.heroTitle}>
              <h1 className="rise" style={{ "--rise-delay": "0.12s" }}>
                {dict?.hero?.title || (
                  <>Unmatched Purity.<br /><span className={styles.heroTitleAccent}>Global Industrial Scale.</span></>
                )}
              </h1>
            </div>

            <p className={`${styles.heroSubtitle} rise`} style={{ "--rise-delay": "0.2s" }}>
              {dict?.hero?.subtitle || 'Direct mine-to-manufacturer supply of 99.27% pure silica quartz from our mine at Lakshupalli, Anantapur District. Lab-certified, precision-graded, and export-ready for global industrial manufacturers.'}
            </p>

            <div className={`${styles.heroCtas} rise`} style={{ "--rise-delay": "0.28s" }}>
              <Magnetic>
                <Link href="/contact" className="btn btn-gold btn-lg">
                  Get a quote <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/request-sample" className="btn btn-outline-white btn-lg">
                  Request a sample
                </Link>
              </Magnetic>
              <Link href="/quality" className={styles.certLink}>
                <FlaskConical size={16} />
                View Lab Certificate
              </Link>
            </div>

            <div className={`${styles.heroStats} rise`} style={{ "--rise-delay": "0.36s" }}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}><CountUp to={99.27} decimals={2} suffix="%" delay={0.5} /></div>
                <div className={styles.statLabel}>SiO₂, lab-tested</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statNumber}><CountUp to={15000} suffix=" MT" delay={0.6} /></div>
                <div className={styles.statLabel}>Mined per month</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statNumber}><CountUp to={40000} suffix=" MT" delay={0.7} /></div>
                <div className={styles.statLabel}>Ready to dispatch</div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Scroll Indicator */}
        <m.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </m.div>
      </section>

      {/* ════════════════════════════════════════
          TRUST STRIP
      ════════════════════════════════════════ */}
      <section className={styles.trustStrip}>
        <div className="container">
          <m.div className={styles.trustGrid} {...fadeUp}>
            {trustPoints.map((item, i) => (
              <m.div
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
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT / SUMANTH ADVANTAGE
      ════════════════════════════════════════ */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <m.div
              className={styles.aboutVisual}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.aboutImageBox}>
                <Image src={lumpsImg} placeholder="blur" alt="Quartz lumps at the Sumanth Minerals mine" fill sizes="(max-width: 992px) 100vw, 560px" className={styles.aboutPhoto} />
                <div className={styles.aboutImageOverlay}>
                  <div className={styles.certBadge}>
                    <FlaskConical size={20} />
                    <div>
                      <strong>Tested by Lucid Laboratories</strong>
                      <span>Report No: LL/25-26/009401/1</span>
                    </div>
                  </div>
                  <div className={styles.productionBadge}>
                    <Factory size={18} />
                    <div>
                      <strong>Active Mining Operations</strong>
                      <span>Lakshupalli, Andhra Pradesh</span>
                    </div>
                  </div>
                </div>
                <div className={styles.mineTag}>Lakshupalli mine</div>
              </div>
            </m.div>

            <m.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">The Sumanth Advantage</span>
              <h2>Why buy from Sumanth Minerals</h2>
              <p>
                We own the mine at Lakshupalli (Peddavaduguru Mandal, Anantapur District), so you buy <strong>straight from the source</strong>, with no traders adding cost or mixing material.
              </p>

              <ul className={styles.featureList}>
                {features.map((f, i) => (
                  <m.li key={i} {...stagger(i * 0.07)}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    <span>{f}</span>
                  </m.li>
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
            </m.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHEMICAL COMPOSITION — LIVE DATA
      ════════════════════════════════════════ */}
      <section className={styles.chemSection}>
        <div className="container">
          <div className={styles.chemGrid}>
            <m.div className={styles.chemContent} {...fadeUp}>
              <span className="section-label">Verified Lab Data</span>
              <h2>Lab-tested chemistry</h2>
              <p>
                Our quartz has been independently analysed by <strong>Lucid Laboratories Pvt. Ltd.</strong>, Hyderabad (IS 1917 methods and ICP-OES), confirming 99.27% SiO₂. The full report is available to download.
              </p>
              <div className={styles.certDetails}>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>Report No. LL/25-26/009401/1</span>
                </div>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>IS 1917 Test Methods</span>
                </div>
                <div className={styles.certItem}>
                  <Star size={15} className={styles.starIcon} />
                  <span>GST Registered</span>
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
            </m.div>

            <m.div
              className={styles.chemTable}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.tableHeader}>
                <FlaskConical size={18} />
                <span>Chemical Analysis Report</span>
                <span className={styles.certTag}>Lab-tested</span>
              </div>
              {chemicalData.map((row, i) => (
                <m.div
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
                      <m.div
                        className={styles.purityFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: '99.27%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </m.div>
              ))}
              <div className={styles.tableFooter}>
                * Tested by Lucid Laboratories Pvt. Ltd. | Report No: LL/25-26/009401/1
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PRODUCTS OVERVIEW
      ════════════════════════════════════════ */}
      <section className={styles.productsSection}>
        <div className="container">

          <m.div className="section-title section-title--left" {...fadeUp}>
            <span className="section-label">Our Products</span>
            <h2>Precision-Graded Quartz</h2>
            <p>
              Quartz lumps and quartz grit in three sizes, all from the same vein at 99.27% SiO₂ (Lucid Laboratories).
            </p>
          </m.div>

          <div className={styles.productGrid}>
            {products.map((p, i) => (
              <m.article
                key={p.size}
                className={`${styles.productCard} ${styles[p.tone]}`}
                {...stagger(i * 0.12)}
              >
                <div className={styles.productImageBox}>
                  <Image
                    src={p.image}
                    placeholder="blur"
                    alt={`${p.size} quartz — ${p.type}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
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
              </m.article>
            ))}
          </div>

          <div className={styles.productsFootnote}>
            <span>Need a non-standard fraction?</span>
            <Link href="/contact">Talk to our sales team →</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INDUSTRY APPLICATIONS
      ════════════════════════════════════════ */}
      <section className={styles.industriesSection}>
        <div className="container">
          <m.div className="section-title section-title--left" {...fadeUp}>
            <span className="section-label">Industries We Serve</span>
            <h2>Find your application</h2>
            <p>We supply manufacturers, processors and traders. Here is the size each sector usually buys.</p>
          </m.div>
          <div className={styles.industriesGrid}>
            {industries.map((ind, i) => (
              <m.div
                key={ind.name}
                className={styles.industryCard}
                {...stagger((i % 3) * 0.08)}
              >
                <div className={styles.industryIcon}>{ind.icon}</div>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
                <Link href="/products" className={styles.industryGrade}>
                  <span>Recommended</span>
                  {ind.grade}
                </Link>
              </m.div>
            ))}
            <m.div className={styles.industriesCta} {...stagger(0.48)}>
              <h3>Not seeing your process?</h3>
              <p>We blend and screen to buyer specifications — share your sieve analysis or furnace notes and we will match a grade.</p>
              <Link href="/contact">Talk to our technical team <ArrowRight size={15} /></Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GLOBAL EXPORT / PORT ACCESS
      ════════════════════════════════════════ */}
      <section className={styles.exportSection}>
        <div className="container">
          <div className={styles.exportGrid}>
            <m.div
              className={styles.exportContent}
              {...fadeUp}
            >
              <span className="section-label">Global Reach</span>
              <h2>Gateway to World Markets</h2>
              <p>
                Our mine has road access to four major ports on India&rsquo;s east coast, so bulk orders can ship worldwide in containers or break-bulk.
              </p>

              <div className={styles.portsList}>
                {ports.map((port, i) => (
                  <m.div
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
                  </m.div>
                ))}
              </div>

            </m.div>

            <m.div
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
                  <strong>40,000 MT</strong>
                  <span>Ready Stock</span>
                </div>
                <div className={styles.exportStat2}>
                  <strong>FCL</strong>
                  <span>25–28 Tons</span>
                </div>
              </div>
            </m.div>
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
          CALL TO ACTION
      ════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className="container">
          <m.div
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.ctaContent}>
              <m.h2 {...stagger(0.1)}>
                Get a price for your quartz
              </m.h2>
              <m.p {...stagger(0.2)}>
                Tell us the size and quantity you need. We reply with price, availability and dispatch dates, and can send a sample with the lab report first.
              </m.p>
              <m.div className={styles.ctaActions} {...stagger(0.3)}>
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
              </m.div>
            </div>
          </m.div>
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
