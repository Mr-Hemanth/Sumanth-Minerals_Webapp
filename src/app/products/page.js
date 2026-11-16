'use client';
import { useState } from 'react';
import { Download, CheckCircle2, Factory, ShieldCheck, ChevronRight, FlaskConical, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './products.module.css';
import { CHEMISTRY as C, PHYSICAL as P } from '@/data/specs';
import Link from 'next/link';
import { m } from 'framer-motion';
import RapidRFQModal from '@/components/RapidRFQModal';
import CertificateModal from '@/components/CertificateModal';
import lumpsImg from '../../../public/quartz_lumps.jpg';
import fineImg from '../../../public/quartz_0_12.jpg';
import mediumImg from '../../../public/quartz_12_30.jpg';
import coarseImg from '../../../public/quartz_30_80.jpg';

const products = [
  {
    id: 0,
    name: 'Quartz Lumps',
    type: 'Lump Quartz / Run-of-Mine',
    image: lumpsImg,
    description: 'Natural vein quartz lumps direct from our Lakshupalli mine, supplied in sizes to suit your furnace or crushing plant. With 99.27% SiO₂ and low LOI (0.10%), they suit ferro-silicon, silicomanganese and refractory production, or further crushing at your end.',
    specifications: [
      { label: 'Size Range', value: 'As per buyer requirement' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'Al₂O₃', value: C.Al2O3 },
      { label: 'LOI', value: C.LOI },
      { label: 'Fusion Point', value: '1713°C' },
    ],
    applications: [
      { label: 'Ferro-Silicon', desc: 'Silica source for ferro-silicon smelting' },
      { label: 'Silicomanganese', desc: 'Alloy production for special steels' },
      { label: 'Refractories', desc: 'Silica feed for refractory manufacture' },
      { label: 'Crushing & Grinding', desc: 'Feedstock for your own sizing or quartz powder plant' },
    ],
    tone: 'toneLump',
  },
  {
    id: 1,
    name: 'Quartz Grit 0–12 mm',
    type: 'Fine Grit / Industrial Filler',
    image: fineImg,
    description: 'Fine quartz grit, screened on vibrating sieves to keep oversize out. Suited to coloured glass batches, industrial fillers and foundry use where consistent particle size matters.',
    specifications: [
      { label: 'Size Range', value: '0–12 mm' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'Al₂O₃', value: C.Al2O3 },
      { label: 'Hardness (Mohs)', value: '7.0' },
      { label: 'Specific Gravity', value: '2.65' },
    ],
    applications: [
      { label: 'Container Glass', desc: 'Green and amber bottle and jar glass' },
      { label: 'Industrial Fillers', desc: 'Paints, coatings, and rubber compounding' },
      { label: 'Foundry Sand', desc: 'Moulding and core sand applications' },
      { label: 'Investment Casting', desc: 'Shell mold and ceramic mold applications' },
    ],
    tone: 'toneFine',
  },
  {
    id: 2,
    name: 'Quartz Grit 12–30 mm',
    type: 'Medium Grit / Ceramic Grade',
    image: mediumImg,
    description: 'Our standard grit size for ceramic and glass manufacturing. The 12–30 mm fraction balances handling, purity (99.27% SiO₂) and thermal stability for kilns and furnaces.',
    specifications: [
      { label: 'Size Range', value: '12–30 mm' },
      { label: 'SiO₂ Purity', value: C.SiO2 },
      { label: 'Fe₂O₃ Content', value: C.Fe2O3 },
      { label: 'Al₂O₃', value: C.Al2O3 },
      { label: 'Hardness (Mohs)', value: '7.0' },
      { label: 'Specific Gravity', value: '2.65' },
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
    name: 'Quartz Grit 30–80 mm',
    type: 'Coarse Grit / Metallurgical Grade',
    image: coarseImg,
    description: 'Coarse quartz grit for metallurgical use. Its 99.27% SiO₂ content and low LOI (0.10%) suit ferro-silicon, silicomanganese and refractory production in electric arc and submerged arc furnaces.',
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
    ],
    tone: 'toneCeramic',
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
            <h1 className="rise">High-Purity Quartz Grades</h1>
            <p className="rise" style={{ "--rise-delay": "0.1s" }}>
              Quartz lumps and quartz grit in three sizes (0–12, 12–30 and 30–80 mm), direct from our own mine.
            </p>
            <div className={`${styles.headerBadges} rise`} style={{ "--rise-delay": "0.2s" }}>
              <span className={styles.hBadge}><FlaskConical size={13} /> 99.27% SiO₂</span>
              <span className={styles.hBadge}><ShieldCheck size={13} /> Lab Certified</span>
              <span className={styles.hBadge}><Factory size={13} /> 15,000 MT/Month</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className={styles.productList}>
        <div className="container">
          {products.map((product, index) => (
            <m.div
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
                    placeholder="blur"
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
            </m.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className={styles.comparisonSection}>
        <div className="container">
          <m.div className="section-title" {...fadeUp}>
            <span className="section-label">Grade Comparison</span>
            <h2>Side-by-Side Specifications</h2>
            <p>Lumps and all three grit sizes come from the same vein, analysed at 99.27% SiO₂ by Lucid Laboratories.</p>
          </m.div>
          <m.div className={styles.tableWrap} {...fadeUp}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Lumps</th>
                  <th>Grit 0–12 mm</th>
                  <th>Grit 12–30 mm</th>
                  <th>Grit 30–80 mm</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Size', 'As required', '0–12 mm', '12–30 mm', '30–80 mm'],
                  ['SiO₂ Purity', C.SiO2, C.SiO2, C.SiO2, C.SiO2],
                  ['Fe₂O₃', C.Fe2O3, C.Fe2O3, C.Fe2O3, C.Fe2O3],
                  ['Al₂O₃', C.Al2O3, C.Al2O3, C.Al2O3, C.Al2O3],
                  ['Fusion Point', P.fusionPoint, P.fusionPoint, P.fusionPoint, P.fusionPoint],
                  ['LOI', C.LOI, C.LOI, C.LOI, C.LOI],
                  ['Hardness (Mohs)', '7.0', '7.0', '7.0', '7.0'],
                  ['Specific Gravity', '2.65', '2.65', '2.65', '2.65'],
                  ['MOQ (FCL)', '25–28 MT', '25–28 MT', '25–28 MT', '25–28 MT'],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? styles.evenRow : ''}>
                    <td className={styles.paramCell}>{row[0]}</td>
                    {row.slice(1).map((v, j) => (
                      <td key={j} className={v.includes('99.27') ? styles.highlightCell : ''}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </m.div>
        </div>
      </section>

      {/* Custom Orders Banner */}
      <section className={styles.customSection}>
        <div className="container">
          <m.div
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
          </m.div>
        </div>
      </section>

      {/* Quality Banner */}
      <section className={styles.qualityBanner}>
        <div className="container">
          <m.div
            className={styles.qualityBox}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <FlaskConical size={48} className={styles.qualIcon} />
            <h2>Every Batch. Certified & Documented.</h2>
            <p>
              Sumanth Minerals has its quartz independently analysed by <strong>Lucid Laboratories Pvt. Ltd.</strong>, Hyderabad, and shares the full report with buyers Third-party inspection via SGS or Intertek is available upon buyer request.
            </p>
            <div className={styles.qualCtas}>
              <Link href="/quality" className="btn btn-white">
                Quality & Testing Protocol <ChevronRight size={16} />
              </Link>
              <Link href="/request-sample" className="btn btn-outline-white">
                Request Certified Sample
              </Link>
            </div>
          </m.div>
        </div>
      </section>

    </div>
  );
}
