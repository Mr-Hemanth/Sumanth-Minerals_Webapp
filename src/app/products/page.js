'use client';
import { useState } from 'react';
import { Download, CheckCircle2, Factory, ShieldCheck, ChevronRight, FlaskConical, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './products.module.css';
import { CHEMISTRY as C, PHYSICAL as P } from '@/data/specs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import InteractiveGradeMatcher from '@/components/InteractiveGradeMatcher';
import RapidRFQModal from '@/components/RapidRFQModal';
import CertificateModal from '@/components/CertificateModal';

const products = [
  {
    id: 1,
    name: 'Quartz 0–12 mm',
    type: 'Fine Grade / Industrial Filler',
    image: '/quartz_0_12.jpg',
    description: 'High-purity fine grade quartz, meticulously screened through vibrating sieves to ensure zero oversize. Ideal for specialized glass manufacturing, silicon metal production, and industrial fillers where particle consistency is paramount.',
    specifications: [
      { label: 'Size Range', value: '0–12 mm' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'Al₂O₃', value: C.Al2O3 },
      { label: 'Hardness (Mohs)', value: '7.0' },
      { label: 'Specific Gravity', value: '2.65' },
      { label: 'Moisture', value: '< 0.5%' },
      { label: 'Whiteness', value: '94%+' },
    ],
    applications: [
      { label: 'Precision Glassware', desc: 'High-transparency glass requiring minimal iron' },
      { label: 'Industrial Fillers', desc: 'Paints, coatings, and rubber compounding' },
      { label: 'Silicon Metal', desc: 'Precursor for metallurgical silicon production' },
      { label: 'Investment Casting', desc: 'Shell mold and ceramic mold applications' },
      { label: 'Optical Glass', desc: 'Ultra-clear optical and specialty glass manufacturing' },
    ],
    tone: 'toneFine',
  },
  {
    id: 2,
    name: 'Quartz 12–30 mm',
    type: 'Medium Grade / Ceramic Grade',
    image: '/quartz_12_30.jpg',
    description: 'The industry-standard for premium ceramic and glass manufacturing. Our 12–30mm grade offers the perfect balance of surface area, purity, and thermal stability for high-temperature kilns and glass furnaces, trusted by manufacturers across Asia and Europe.',
    specifications: [
      { label: 'Size Range', value: '12–30 mm' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'Al₂O₃', value: C.Al2O3 },
      { label: 'Whiteness', value: '95%+' },
      { label: 'Hardness (Mohs)', value: '7.0' },
      { label: 'Specific Gravity', value: '2.65' },
      { label: 'Moisture', value: '< 0.5%' },
    ],
    applications: [
      { label: 'Vitrified Tiles', desc: 'Floor and wall tiles requiring uniform firing' },
      { label: 'Sanitaryware', desc: 'Ceramic basins, WCs, and bathroom fixtures' },
      { label: 'Artistic Glass', desc: 'Decorative and tableware glassware' },
      { label: 'Silicon Carbide', desc: 'Abrasive and refractory SiC production' },
      { label: 'Container Glass', desc: 'Bottles and jars for food and beverage industry' },
    ],
    tone: 'toneCeramic',
  },
  {
    id: 3,
    name: 'Quartz 30–80 mm',
    type: 'Large Grade / Lump Quartz',
    image: '/quartz_30_80.jpg',
    description: 'Premier lump quartz for metallurgical applications. Its high thermal shock resistance and ultra-low impurity profile make it the preferred choice for ferro-alloy, silicon metal, and high-temperature refractory production in electric arc and submerged arc furnaces.',
    specifications: [
      { label: 'Size Range', value: '30–80 mm' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'TiO₂', value: C.TiO2 },
      { label: 'Fusion Point', value: '1713°C' },
      { label: 'LOI', value: C.LOI },
      { label: 'Specific Gravity', value: '2.65' },
      { label: 'Thermal Stability', value: 'High' },
    ],
    applications: [
      { label: 'Ferro-Silicon', desc: 'Reducing agent in steel and alloy smelting' },
      { label: 'Silicomanganese', desc: 'Alloy production for special steels' },
      { label: 'High-Temp Refractories', desc: 'Furnace lining and crucible construction' },
      { label: 'Water Filtration', desc: 'Industrial water treatment filter media' },
      { label: 'Silicon Metal', desc: 'Grade 553 / 441 silicon metal smelting' },
    ],
    tone: 'toneLump',
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export default function Products() {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSeed, setRfqSeed] = useState({ industry: '', size: '' });
  const [certOpen, setCertOpen] = useState(false);

  const openRFQ = (industry = '', size = '') => {
    setRfqSeed({ industry, size });
    setRfqOpen(true);
  };

  return (
    <div className={styles.productsPage}>
      <RapidRFQModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialIndustry={rfqSeed.industry}
        initialSize={rfqSeed.size}
      />
      <CertificateModal isOpen={certOpen} onClose={() => setCertOpen(false)} />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            "name": "Sumanth Minerals Quartz Product Range",
            "itemListElement": products.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Product",
                "name": p.name,
                "description": p.description,
                "brand": { "@type": "Brand", "name": "Sumanth Minerals" },
                "material": "High-Purity Silica Quartz",
                "manufacturer": { "@type": "Organization", "name": "Sumanth Minerals" }
              }
            }))
          })
        }}
      />

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <nav className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <ChevronRight size={14} />
              <span>Products</span>
            </nav>
            <motion.h1 {...fadeUp}>High-Purity Quartz Grades</motion.h1>
            <motion.p {...fadeUp} transition={{ delay: 0.1 }}>
              Engineered for precision. Certified for performance. Three standard grades serving the world's most demanding industrial sectors.
            </motion.p>
            <motion.div className={styles.headerBadges} {...fadeUp} transition={{ delay: 0.2 }}>
              <span className={styles.hBadge}><FlaskConical size={13} /> 99.27% SiO₂</span>
              <span className={styles.hBadge}><ShieldCheck size={13} /> Lab Certified</span>
              <span className={styles.hBadge}><Factory size={13} /> 10,000 MT/Month</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grade Matcher */}
      <section className={styles.matcherSection}>
        <div className="container">
          <InteractiveGradeMatcher onOpenRFQ={openRFQ} onOpenCert={() => setCertOpen(true)} />
        </div>
      </section>

      {/* Product Listings */}
      <section className={styles.productList}>
        <div className="container">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`${styles.productRow} ${index % 2 !== 0 ? styles.reverse : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Visual Side */}
              <div className={styles.productVisual}>
                <div className={styles.productImageBox}>
                  <Image
                    src={product.image}
                    alt={`${product.name} — ${product.type}`}
                    fill
                    sizes="(max-width: 992px) 100vw, 45vw"
                    className={styles.productImage}
                  />

                  <div className={styles.downloadOverlay}>
                    <a
                      href={product.image}
                      download={`${product.name.replace(/\s+/g, '_').toLowerCase()}.jpg`}
                      className={styles.downloadImgBtn}
                    >
                      <Download size={20} />
                      <span>Download Image</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Details Side */}
              <div className={styles.productDetails}>
                <span className={styles.typeTag}>{product.type}</span>
                <h2 className={styles[product.tone]}>{product.name}</h2>
                <p className={styles.description}>{product.description}</p>

                {/* Specifications */}
                <div className={styles.specs}>
                  <h3><ShieldCheck size={18} /> Chemical & Physical Specifications</h3>
                  <div className={styles.specGrid}>
                    {product.specifications.map((spec, i) => (
                      <div key={i} className={styles.specItem}>
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specValue}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className={styles.applications}>
                  <h3><CheckCircle2 size={18} /> Industrial Applications</h3>
                  <div className={styles.appList}>
                    {product.applications.map((app, i) => (
                      <div key={i} className={styles.appItem}>
                        <CheckCircle2 size={15} className={styles.appCheck} />
                        <div>
                          <strong>{app.label}</strong>
                          <span>{app.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                  <button type="button" className="btn btn-primary" onClick={() => openRFQ('', product.size)}>
                    Request Quote <ArrowRight size={16} />
                  </button>
                  <Link href="/request-sample" className="btn btn-outline">
                    Request Sample
                  </Link>
                  <Link href="/downloads" className={styles.downloadBtn}>
                    <Download size={15} /> TDS / MSDS
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className={styles.comparisonSection}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <span className="section-label">Grade Comparison</span>
            <h2>Side-by-Side Specifications</h2>
            <p>All three grades maintain our certified 99.27% SiO₂ purity standard.</p>
          </motion.div>
          <motion.div className={styles.tableWrap} {...fadeUp}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>0–12 mm Fine</th>
                  <th>12–30 mm Ceramic</th>
                  <th>30–80 mm Lump</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['SiO₂ Purity', C.SiO2, C.SiO2, C.SiO2],
                  ['Fe₂O₃', C.Fe2O3, C.Fe2O3, C.Fe2O3],
                  ['Al₂O₃', C.Al2O3, C.Al2O3, C.Al2O3],
                  ['Whiteness', '94%+', '95%+', '—'],
                  ['Fusion Point', P.fusionPoint, P.fusionPoint, P.fusionPoint],
                  ['LOI', C.LOI, C.LOI, C.LOI],
                  ['Hardness (Mohs)', '7.0', '7.0', '7.0'],
                  ['Specific Gravity', '2.65', '2.65', '2.65'],
                  ['MOQ (FCL)', '25–28 MT', '25–28 MT', '25–28 MT'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? styles.evenRow : ''}>
                    <td className={styles.paramCell}>{row[0]}</td>
                    <td className={row[1].includes('99.27') ? styles.highlightCell : ''}>{row[1]}</td>
                    <td className={row[2].includes('99.27') ? styles.highlightCell : ''}>{row[2]}</td>
                    <td className={row[3].includes('99.27') ? styles.highlightCell : ''}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Custom Orders Banner */}
      <section className={styles.customSection}>
        <div className="container">
          <motion.div
            className={styles.customBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.customContent}>
              <span className="section-label">Custom Orders</span>
              <h2>Need Custom Grading or Purity Levels?</h2>
              <p>
                For bulk orders exceeding 500 tons, we offer custom crushing, grading, and magnetic separation to meet your exact particle size distribution and chemical specifications. Custom sieve analysis reports available on request.
              </p>
              <div className={styles.customFeatures}>
                {[
                  'Custom sieve sizes available',
                  'Dedicated batch lab reports',
                  'Custom packaging dimensions',
                  'Flexible payment terms (L/C, T/T)',
                  'Pre-shipment inspection support',
                  'Third-party testing (SGS / Intertek)',
                ].map((f, i) => (
                  <span key={i} className={styles.customFeature}>
                    <CheckCircle2 size={14} /> {f}
                  </span>
                ))}
              </div>
              <div className={styles.customActions}>
                <Link href="/contact" className="btn btn-gold btn-lg">
                  Discuss Custom Order <ArrowRight size={17} />
                </Link>
                <Link href="/downloads" className="btn btn-outline btn-lg">
                  <Download size={16} /> Technical Data Sheets
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Banner */}
      <section className={styles.qualityBanner}>
        <div className="container">
          <motion.div
            className={styles.qualityBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FlaskConical size={48} className={styles.qualIcon} />
            <h2>Every Batch. Certified & Documented.</h2>
            <p>
              Sumanth Minerals accompanies every shipment with a <strong>Certificate of Analysis (CoA)</strong> from our in-house lab, verified by <strong>Lucid Laboratories Pvt. Ltd.</strong> Third-party inspection via SGS or Intertek is available upon buyer request.
            </p>
            <div className={styles.qualCtas}>
              <Link href="/quality" className="btn btn-white">
                Quality & Testing Protocol <ChevronRight size={16} />
              </Link>
              <Link href="/request-sample" className="btn btn-outline-white">
                Request Certified Sample
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
