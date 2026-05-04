import { Leaf, Recycle, ShieldCheck, Heart } from 'lucide-react';
import styles from './sustainability.module.css';

export const metadata = {
  title: 'Sustainability & ESG | Kanaka Minerals',
  description: 'Our commitment to responsible mining, environmental stewardship, and community development in Anantapur, Andhra Pradesh.',
};

export default function Sustainability() {
  return (
    <div className={styles.sustainabilityPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Sustainability & ESG</h1>
          <p>Mining with responsibility for a better future.</p>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introContent}>
            <h2>Responsible Mining</h2>
            <p>At Kanaka Minerals, we believe that industrial growth must go hand-in-hand with environmental preservation. Our ESG (Environmental, Social, and Governance) framework is integrated into every aspect of our quartz mining operations.</p>
          </div>
          <div className={styles.pillars}>
            <div className={styles.pillar}>
              <Leaf size={40} />
              <h3>Environmental Stewardship</h3>
              <p>Minimizing our ecological footprint through efficient mining techniques and land restoration programs.</p>
            </div>
            <div className={styles.pillar}>
              <Heart size={40} />
              <h3>Social Impact</h3>
              <p>Supporting the local community in Lakshayampalli through education, healthcare, and employment.</p>
            </div>
            <div className={styles.pillar}>
              <ShieldCheck size={40} />
              <h3>Ethical Governance</h3>
              <p>Maintaining transparency in our supply chain and adhering to strict international safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.restoration}>
        <div className="container">
          <div className={styles.restoreGrid}>
            <div className={styles.restoreImage}>
              <div className={styles.placeholderImg}>GREEN MINING VISUALS</div>
            </div>
            <div className={styles.restoreText}>
              <h2>Land Restoration Program</h2>
              <p>We don't just extract; we restore. Our mining plan includes a phased reclamation process where worked-out areas are backfilled and re-vegetated with local flora.</p>
              <ul>
                <li><span>✓</span> Systematic backfilling of pits</li>
                <li><span>✓</span> Native tree plantation drives</li>
                <li><span>✓</span> Soil conservation techniques</li>
                <li><span>✓</span> Water table monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.water}>
        <div className="container">
          <div className={styles.waterBox}>
            <Recycle size={50} />
            <h2>Zero Water Discharge</h2>
            <p>Our processing units utilize advanced water recycling systems. 95% of the water used in quartz washing is filtered and reused in the same cycle, ensuring zero wastage of local water resources.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
