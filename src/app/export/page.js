import { Globe, Package, Truck, ShieldCheck, Clock } from 'lucide-react';
import styles from './export.module.css';

export const metadata = {
  title: 'Export & Logistics | Kanaka Minerals',
  description: 'Global export process for high-purity quartz. We ship to international markets with premium packaging and reliable logistics.',
};

export default function Export() {
  return (
    <div className={styles.exportPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Global Export Operations</h1>
          <p>Seamlessly supplying premium minerals to industrial hubs worldwide.</p>
        </div>
      </section>

      <section className={styles.process}>
        <div className="container">
          <div className="section-title">
            <h2>Our Export Process</h2>
            <p>A streamlined workflow designed for international trade efficiency.</p>
          </div>
          <div className={styles.processGrid}>
            {[
              { icon: <Clock size={32} />, title: 'Inquiry & Quote', desc: 'Detailed technical discussion and transparent B2B pricing based on volume.' },
              { icon: <ShieldCheck size={32} />, title: 'Quality Approval', desc: 'Pre-shipment inspection and lab reports shared for buyer approval.' },
              { icon: <Package size={32} />, title: 'Custom Packaging', desc: 'Jumbo bags or custom packaging options to ensure material integrity.' },
              { icon: <Truck size={32} />, title: 'Logistic Sync', desc: 'Coordination with major ports and shipping lines for timely dispatch.' },
              { icon: <Globe size={32} />, title: 'Global Delivery', desc: 'Real-time tracking and documentation support for customs clearance.' }
            ].map((step, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepLine}></div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.packaging}>
        <div className="container">
          <div className={styles.packagingGrid}>
            <div className={styles.packagingText}>
              <h2>Packaging & Logistics</h2>
              <p>We understand that mineral purity must be maintained throughout the journey. Our packaging standards are designed for long-distance international transit.</p>
              <ul className={styles.packList}>
                <li><strong>Jumbo Bags:</strong> 1 Ton / 1.25 Ton UV stabilized PP bags with liners.</li>
                <li><strong>Small Bags:</strong> 25kg / 50kg bags palletized for easy handling.</li>
                <li><strong>Container Load:</strong> Efficient stuffing to maximize container capacity (typically 25-28 Tons).</li>
                <li><strong>Port Access:</strong> Close proximity to Chennai, Krishnapatnam, Ennore, and Vizag ports.</li>
              </ul>
            </div>
            <div className={styles.packagingImage}>
              <div className={styles.placeholderImg}>PACKAGING VISUALS</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.markets}>
        <div className="container">
          <div className={styles.marketBanner}>
            <h2>Serving Global Industries</h2>
            <p>Our quartz is currently exported to and used by industries in:</p>
            <div className={styles.countryGrid}>
              <span>South East Asia</span>
              <span>Middle East</span>
              <span>Europe</span>
              <span>North America</span>
              <span>East Asia</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
