'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Mountain, Pickaxe, Filter, Truck } from 'lucide-react';
import styles from './MiningProcessWorkflow.module.css';

// Only steps the business has confirmed: own mine, lumps + 3 grit sizes,
// weighbridge at the mine (visible in the site photos), truck dispatch.
const steps = [
  {
    title: 'Mined at Lakshupalli',
    icon: <Mountain size={22} />,
    desc: 'Quartz is extracted from the vein at our own mine in Peddavaduguru, Andhra Pradesh.',
  },
  {
    title: 'Sorted at the pit',
    icon: <Pickaxe size={22} />,
    desc: 'Lumps are sorted to keep the quartz clean of host rock and soil.',
  },
  {
    title: 'Sized to order',
    icon: <Filter size={22} />,
    desc: 'Supplied as lumps, or crushed and screened to 0–12, 12–30 or 30–80 mm grit.',
  },
  {
    title: 'Weighed and dispatched',
    icon: <Truck size={22} />,
    desc: 'Each load is weighed on our weighbridge at the mine and trucked to your plant or port.',
  },
];

export default function MiningProcessWorkflow() {
  const reduce = useReducedMotion();
  const reveal = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.55, delay: 0.25 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <div className={styles.workflow}>
      <div className={styles.header}>
        <span className="section-label">From our mine to your plant</span>
        <h2>How your quartz is supplied</h2>
        <p>Everything starts at our own mine, so you deal with one supplier from pit to delivery.</p>
      </div>

      <div className={styles.photo}>
        <Image
          src="/mine-plant.jpg"
          alt="Crushing and screening plant with conveyors and quartz stockpiles at the Sumanth Minerals mine, Lakshupalli"
          fill
          sizes="(max-width: 1240px) 100vw, 1176px"
          className={styles.photoImg}
        />
        <span className={styles.photoTag}>Our mine at Lakshupalli, Peddavaduguru</span>
      </div>

      <ol className={styles.timeline}>
        <motion.span
          className={styles.track}
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {steps.map((s, i) => (
          <motion.li key={s.title} className={styles.step} {...reveal(i)}>
            <span className={styles.marker}>
              {s.icon}
              <span className={styles.num}>{i + 1}</span>
            </span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
