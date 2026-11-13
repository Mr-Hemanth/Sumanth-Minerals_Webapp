'use client';
import { useState } from "react";
import Image from "next/image";
import { Pickaxe, Mountain, Magnet, Filter, Droplets, Scale, CheckCircle2 } from "lucide-react";
import styles from "./MiningProcessWorkflow.module.css";

const steps = [
  {
    step: "01",
    title: "Vein Mapping & Controlled Bench Extraction",
    icon: <Mountain size={24} />,
    desc: "Targeting pure white hydrothermal quartz veins in the Tadipatri mineral belt with diamond-core assay before systematic bench extraction."
  },
  {
    step: "02",
    title: "Pit-Head Boulder Sorting",
    icon: <Pickaxe size={24} />,
    desc: "Heavy hydraulic excavators and rock-breakers select clean, unweathered vein boulders while discarding host country rock and clay."
  },
  {
    step: "03",
    title: "Two-Stage Low-Attrition Crushing",
    icon: <Filter size={24} />,
    desc: "Primary jaw and secondary cone crushers calibrated to maintain cubic grain morphology, minimizing friable dust generation."
  },
  {
    step: "04",
    title: "High-Gradient Magnetic Beneficiation",
    icon: <Magnet size={24} />,
    desc: "Rare-earth neodymium cross-belt magnetic separators continuously extract microscopic tramp iron particles to safeguard 0.30% Fe2O3 purity."
  },
  {
    step: "05",
    title: "Multi-Deck Vibratory Sizing & Dust Washing",
    icon: <Droplets size={24} />,
    desc: "High-frequency screening decks classify material precisely into 0–12mm, 12–30mm, and 30–80mm with pressurized de-dusting sprays."
  },
  {
    step: "06",
    title: "Electronic Weighbridge & Lot COA Certification",
    icon: <Scale size={24} />,
    desc: "Certified digital weighbridge gross-tare measurement and lot sampling for NABL testing before stuffing in 1 MT UV Jumbo Bags."
  }
];

export default function MiningProcessWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.workflowContainer}>
      <div className={styles.workflowHeader}>
        <div className={styles.badgeTag}>BENCH-TO-PORT QUALITY PIPELINE</div>
        <h2>Integrated Mining & Beneficiation Workflow</h2>
        <p>Direct mine-to-plant control ensures that every shipment meets verified 99.27% SiO₂ standards with zero intermediate handling contamination.</p>
      </div>

      <div className={styles.aerialBox}>
        <div className={styles.aerialWrapper}>
          <Image
            src="/quartz_mine_aerial.jpg"
            alt="Sumanth Minerals Tadipatri open-cast quartz quarry bench face"
            fill
            priority
            sizes="(max-width: 992px) 100vw, 900px"
            className={styles.aerialImg}
          />
          <div className={styles.aerialTag}>
            <span>Direct Pit-Head Extraction: Tadipatri Quartz Belt, Andhra Pradesh</span>
          </div>
        </div>
      </div>

      <div className={styles.stepGrid}>
        {steps.map((s, idx) => (
          <div 
            key={idx} 
            className={`${styles.stepCard} ${activeStep === idx ? styles.activeCard : ""}`}
            onClick={() => setActiveStep(idx)}
          >
            <div className={styles.stepCardHeader}>
              <span className={styles.stepNum}>{s.step}</span>
              <div className={styles.stepIconBox}>{s.icon}</div>
            </div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
