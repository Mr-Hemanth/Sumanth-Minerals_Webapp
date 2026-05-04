'use client';
import { Download, CheckCircle2, Factory, GlassWater, Cpu, Info, ShieldCheck, Microscope } from 'lucide-react';
import styles from './products.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: 'Quartz 0–12 mm',
    type: 'Fine Grade / Industrial Filler',
    description: 'High-purity fine grade quartz, meticulously screened to ensure zero oversize. Ideal for specialized glass manufacturing and industrial fillers where consistency is paramount.',
    specifications: [
      { label: 'Size Range', value: '0–12 mm' },
      { label: 'SiO2 Purity', value: '99.27%' },
      { label: 'Fe2O3 Content', value: '0.03% - 0.05%' },
      { label: 'Hardness (Mohs)', value: '7.0' },
      { label: 'Specific Gravity', value: '2.65' }
    ],
    applications: ['Precision Glassware', 'Industrial Fillers', 'Silicon Metal Precursor', 'Investment Casting'],
    icon: <Factory size={24} />
  },
  {
    id: 2,
    name: 'Quartz 12–30 mm',
    type: 'Medium Grade / Ceramic Grade',
    description: 'The industry standard for premium ceramic and glass manufacturing. Our 12-30mm grade offers the perfect balance of surface area and purity for high-temperature kilns.',
    specifications: [
      { label: 'Size Range', value: '12–30 mm' },
      { label: 'SiO2 Purity', value: '99.27%' },
      { label: 'Al2O3 Content', value: '0.15% max' },
      { label: 'Whiteness', value: '95%+' },
      { label: 'Moisture', value: '< 0.5%' }
    ],
    applications: ['Vitrified Tiles', 'Sanitaryware', 'Artistic Glass', 'Silicon Carbide Production'],
    icon: <GlassWater size={24} />
  },
  {
    id: 3,
    name: 'Quartz 30–80 mm',
    type: 'Large Grade / Lump Quartz',
    description: 'Premier lump quartz for metallurgical applications. Its high thermal shock resistance and ultra-low impurity profile make it the choice for ferro-alloy production.',
    specifications: [
      { label: 'Size Range', value: '30–80 mm' },
      { label: 'SiO2 Purity', value: '99.27%' },
      { label: 'TiO2 Content', value: 'Trace' },
      { label: 'Fusion Point', value: '1713°C' },
      { label: 'LOI', value: '0.12%' }
    ],
    applications: ['Ferro-Silicon', 'Silicomanganese', 'High-Temp Refractories', 'Water Filtration'],
    icon: <Cpu size={24} />
  }
];

export default function Products() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className={styles.productsPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "ItemList",
            "itemListElement": products.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Product",
                "name": p.name,
                "description": p.description,
                "brand": { "@type": "Brand", "name": "Kanaka Minerals" }
              }
            }))
          })
        }}
      />
      
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 {...fadeInUp}>High-Purity Quartz Grades</motion.h1>
          <motion.p {...fadeInUp} transition={{ delay: 0.1 }}>
            Engineered for precision. Sourced for performance.
          </motion.p>
        </div>
      </section>

      <section className={styles.productList}>
        <div className="container">
          {products.map((product, index) => (
            <motion.div 
              key={product.id} 
              className={`${styles.productRow} ${index % 2 !== 0 ? styles.reverse : ''}`}
              {...fadeInUp}
            >
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>
                  <span>{product.name}</span>
                  <div className={styles.productBadge}>Verified 99.27% SiO2</div>
                </div>
              </div>
              <div className={styles.productDetails}>
                <div className={styles.typeTag}>{product.type}</div>
                <h2>{product.name}</h2>
                <p className={styles.description}>{product.description}</p>
                
                <div className={styles.specs}>
                  <h3><Microscope size={18} /> Technical Profile</h3>
                  <div className={styles.specGrid}>
                    {product.specifications.map((spec, i) => (
                      <div key={i} className={styles.specItem}>
                        <span className={styles.specLabel}>{spec.label}</span>
                        <span className={styles.specValue}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.applications}>
                  <h3><Info size={18} /> Industrial Applications</h3>
                  <div className={styles.appTags}>
                    {product.applications.map((app, i) => (
                      <span key={i} className={styles.appTag}>
                        <CheckCircle2 size={14} /> {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className="btn btn-primary">
                    <Download size={18} /> Download Analysis Report
                  </button>
                  <Link href="/request-sample" className="btn btn-outline">Request Sample</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quality Assurance Section (NEW) */}
      <section className={styles.qualityBanner}>
        <div className="container">
          <motion.div className={styles.qualityBox} {...fadeInUp}>
            <ShieldCheck size={60} />
            <h2>Strict Grading Standards</h2>
            <p>Every batch of Kanaka Minerals quartz undergoes multi-stage screening and magnetic separation to ensure zero metallic contamination and precise particle size distribution.</p>
            <Link href="/quality" className="btn btn-outline-white">Explore Quality Process</Link>
          </motion.div>
        </div>
      </section>

      <section className={styles.customOrders}>
        <div className="container">
          <motion.div className={styles.customBox} {...fadeInUp}>
            <div className={styles.customText}>
              <h2>Bespoke Mineral Processing</h2>
              <p>Do you require a specific mesh size or ultra-low iron profile? Our Tadipatri processing unit can be calibrated to meet your exact laboratory specifications for bulk orders exceeding 500 tons.</p>
              <Link href="/contact" className="btn btn-primary">Start Technical Discussion</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
