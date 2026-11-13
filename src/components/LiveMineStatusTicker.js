'use client';
import styles from "./LiveMineStatusTicker.module.css";
import { Activity, ShieldCheck, Truck, Award, Clock } from "lucide-react";

export default function LiveMineStatusTicker() {
  const items = [
    { text: "Tadipatri Vein Bench #2: ACTIVE EXTRACTION", icon: <Activity size={14} /> },
    { text: "NABL Certified Purity: 99.27% SiO2", icon: <ShieldCheck size={14} /> },
    { text: "Low Iron Fe2O3: 0.30% • LOI: 0.10%", icon: <Award size={14} /> },
    { text: "Monthly Mining Run: 10,000 MT Capacity", icon: <Clock size={14} /> },
    { text: "Ready Dispatched Stock (12–30mm): 3,500 MT", icon: <Truck size={14} /> },
    { text: "Fast Port Dispatch: 48h to Krishnapatnam (KPCT) & Chennai", icon: <Truck size={14} /> },
    { text: "Direct Quarry Ownership • Zero Trading Middlemen", icon: <ShieldCheck size={14} /> }
  ];

  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerTrack}>
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className={styles.tickerItem}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemText}>{item.text}</span>
            <span className={styles.dot}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
