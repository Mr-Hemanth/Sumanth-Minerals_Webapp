'use client';
import Link from 'next/link';
import { 
  ChevronRight, Award, ShieldCheck, Truck, BarChart, Zap, Globe, 
  Layers, Droplets, Mountain, Factory, Activity, Microscope 
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className={styles.home}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Kanaka Minerals",
            "image": "https://kanakaminerals.com/logo.png",
            "@id": "",
            "url": "https://kanakaminerals.com",
            "telephone": "+919876543210",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Lakshayampalli, Tadipatri Mandal",
              "addressLocality": "Anantapur",
              "addressRegion": "AP",
              "postalCode": "515411",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 15.027,
              "longitude": 77.722
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className={styles.heroBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ESTABLISHED 2025 • TADIPATRI, INDIA
            </motion.span>
            <h1>Unmatched Purity. <br /><span>Global Industrial Scale.</span></h1>
            <p>Direct mine-to-manufacturer supply of 99% pure silica quartz. Strategically located near major shipping hubs for seamless global export.</p>
            <div className={styles.heroBtns}>
              <Link href="/contact" className="btn btn-primary">Bulk Inquiry</Link>
              <Link href="/request-sample" className="btn btn-outline">Request Sample</Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <h3>99.27%</h3>
                <p>Silica (SiO2)</p>
              </div>
              <div className={styles.statItem}>
                <h3>10,000</h3>
                <p>Tons / Month</p>
              </div>
              <div className={styles.statItem}>
                <h3>4+</h3>
                <p>Global Ports</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustSection}>
        <div className="container">
          <motion.div 
            className={styles.trustGrid}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { icon: <ShieldCheck size={40} />, title: 'Certified Purity', desc: 'Lab-tested 99% silica with minimal iron content (0.3%).' },
              { icon: <BarChart size={40} />, title: 'Supply Stability', desc: 'Large-scale mining rights ensuring 24/7 industrial supply.' },
              { icon: <Award size={40} />, title: 'Expert Grading', desc: 'Precision screening for 0-12mm, 12-30mm, and 30-80mm sizes.' },
              { icon: <Truck size={40} />, title: 'Export Ready', desc: 'Proximity to Chennai, Krishnapatnam, Ennore & Vizag ports.' }
            ].map((item, i) => (
              <motion.div key={i} className={styles.trustItem} variants={fadeInUp}>
                {item.icon}
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industrial Applications Section */}
      <section className={styles.applicationsSection}>
        <div className="container">
          <motion.div className="section-title" {...fadeInUp} viewport={{ once: false, amount: 0.2 }}>
            <h2>Industry-Specific Solutions</h2>
            <p>Our high-purity quartz is the foundational material for the world's most demanding sectors.</p>
          </motion.div>
          <div className={styles.appGrid}>
            <motion.div className={styles.appCard} {...fadeInUp} viewport={{ once: false, amount: 0.2 }}>
              <Zap size={32} />
              <h3>Solar & Semi-conductors</h3>
              <p>Ultra-low iron content makes our quartz ideal for high-transparency solar glass and silicon wafers.</p>
            </motion.div>
            <motion.div className={styles.appCard} {...fadeInUp} transition={{ delay: 0.1 }} viewport={{ once: false, amount: 0.2 }}>
              <Layers size={32} />
              <h3>Engineered Stone</h3>
              <p>Consistent whiteness and hardness (Mohs 7) for premium kitchen countertops and surfaces.</p>
            </motion.div>
            <motion.div className={styles.appCard} {...fadeInUp} transition={{ delay: 0.2 }} viewport={{ once: false, amount: 0.2 }}>
              <Droplets size={32} />
              <h3>Advanced Ceramics</h3>
              <p>High thermal stability for sanitaryware, tiles, and specialized electrical insulators.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className={styles.productsOverview}>
        <div className="container">
          <motion.div className="section-title" {...fadeInUp} viewport={{ once: false, amount: 0.2 }}>
            <h2>Our Quartz Grades</h2>
            <p>Meticulously graded minerals for diverse industrial applications.</p>
          </motion.div>
          <div className={styles.productGrid}>
            {[
              { size: '0–12 mm', icon: <Microscope size={60} />, desc: 'Fine grade quartz for specialized industrial applications and fillers.' },
              { size: '12–30 mm', icon: <Factory size={60} />, desc: 'Medium grade quartz ideal for ceramics and glass manufacturing.' },
              { size: '30–80 mm', icon: <Mountain size={60} />, desc: 'Large grade quartz for heavy industrial processes and metallurgy.' }
            ].map((p, i) => (
              <motion.div key={i} className={styles.productCard} {...fadeInUp} viewport={{ once: false, amount: 0.2 }}>
                <div className={styles.productVisual}>
                  {p.icon}
                  <div className={styles.visualOverlay}></div>
                </div>
                <h3>{p.size}</h3>
                <p>{p.desc}</p>
                <Link href="/products" className={styles.learnMore}>
                  Technical Details <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className={styles.globalReach}>
        <div className="container">
          <div className={styles.reachGrid}>
            <motion.div className={styles.reachContent} {...fadeInUp} viewport={{ once: false, amount: 0.2 }}>
              <h2>Gateway to Global Markets</h2>
              <p>Strategically positioned in Andhra Pradesh, we leverage India's most efficient logistics corridor.</p>
              <div className={styles.portList}>
                <div className={styles.portItem}>
                  <strong>Chennai Port</strong>
                  <span>Main hub for South East Asia & Europe</span>
                </div>
                <div className={styles.portItem}>
                  <strong>Krishnapatnam</strong>
                  <span>Modern deep-water port for large bulk vessels</span>
                </div>
                <div className={styles.portItem}>
                  <strong>Vizag Port</strong>
                  <span>Direct connectivity to East Asian industrial zones</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className={styles.reachVisual}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className={styles.worldMap}>
                <Globe size={180} strokeWidth={1} />
                <div className={styles.ping}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyUs}>
        <div className="container">
          <div className={styles.whyGrid}>
            <motion.div 
              className={styles.whyImage}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.visualBox}>
                <Activity size={80} className={styles.floatingIcon} />
                <div className={styles.gridPattern}></div>
                <div className={styles.boxTag}>TADIPATRI MINING HUB</div>
              </div>
            </motion.div>
            <motion.div 
              className={styles.whyContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={styles.accentTitle}>The Kanaka Advantage</h2>
              <h3>Scale, Purity, and Performance</h3>
              <p>
                As a direct mine owner in the Tadipatri cluster, we eliminate middlemen, ensuring you receive the highest quality quartz at competitive B2B rates with guaranteed supply continuity.
              </p>
              <ul className={styles.featuresList}>
                <li><span>✓</span> Direct ownership of 50+ acres of high-yield mines</li>
                <li><span>✓</span> In-house washing and screening facility</li>
                <li><span>✓</span> Zero-contamination magnetic separators</li>
                <li><span>✓</span> Dedicated quality control laboratory</li>
              </ul>
              <Link href="/about" className="btn btn-primary">Our Full Capability</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Empowering Global Industries with Premium Silica.</h2>
            <p>Join our network of international manufacturers. Request a lab sample today.</p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btn btn-white">Contact Sales</Link>
              <Link href="/request-sample" className="btn btn-outline-white">Request Sample</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
