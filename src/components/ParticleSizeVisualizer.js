'use client';
import { useState } from "react";
import Image from "next/image";
import { Layers, Microscope, ShieldCheck, Box, ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./ParticleSizeVisualizer.module.css";

const grades = [
  {
    id: "0-12mm",
    name: "0–12 mm (Quartz Sand & Grits)",
    fractionTag: "Ultra-Fine to Fine Grain",
    sio2: "99.27%",
    fe2o3: "0.30%",
    bulkDensity: "1.65 g/cm³",
    mohs: "7.0 (Extreme Scratch Resistance)",
    screenType: "Multi-Deck High Frequency Vibratory Sieve",
    applications: "Engineered quartz slab countertops, artificial marble tiles, refractory mortars, investment casting.",
    packaging: "1 Ton UV Jumbo Bags / 50kg Bags",
    highlight: "Zero oversize grains guarantees flawless slab polishing without surface pits."
  },
  {
    id: "12-30mm",
    name: "12–30 mm (Quartz Granules)",
    fractionTag: "Medium Furnace Standard",
    sio2: "99.27%",
    fe2o3: "0.30%",
    bulkDensity: "1.60 g/cm³",
    mohs: "7.0",
    screenType: "Rotary Trommel & Grizzly Screen",
    applications: "Architectural float glass, container bottles, tableware, vitrified porcelain tiles, sanitaryware.",
    packaging: "Bulk Tipper Dumpers / 1 MT FIBC Bags",
    highlight: "Uniform melting kinetics at 1713°C fusion temp prevents kiln cold-spots."
  },
  {
    id: "30-80mm",
    name: "30–80 mm (Lump Quartz Chunks)",
    fractionTag: "Submerged Arc Smelting Lump",
    sio2: "99.27%",
    fe2o3: "0.30%",
    bulkDensity: "1.55 g/cm³",
    mohs: "7.0",
    screenType: "Heavy-Duty Grizzly Feeder & Sizer",
    applications: "Ferro-Silicon alloys, Silico-Manganese, Silicon Metal smelting, high-alumina refractory bricks.",
    packaging: "Bulk Open Dumpers / 1 MT Bags",
    highlight: "Non-decrepitating hydrothermal rock maintains gas permeability in electric furnaces."
  },
  {
    id: "boulders",
    name: "Raw Hydrothermal Boulders",
    fractionTag: "Direct Quarry Bench Run (100–400mm)",
    sio2: "99.27%",
    fe2o3: "0.30%",
    bulkDensity: "Solid Rock",
    mohs: "7.0",
    screenType: "Visual & Hydraulic Sorter",
    applications: "Secondary crushing plants, specialized silica grinding mills, custom processors.",
    packaging: "Heavy Mine Dumpers / Rail Wagons",
    highlight: "Direct pit-head extraction without trading markups."
  }
];

export default function ParticleSizeVisualizer({ onOpenRFQ, onSelectGrade }) {
  const [activeGrade, setActiveGrade] = useState(grades[1]); // Default to 12-30mm

  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.visualizerHeader}>
        <div className={styles.badgeTag}>MICRON & FRACTION INSPECTOR</div>
        <h2>Precision Screened Particle Distribution</h2>
        <p>Explore our laboratory-verified quartz sizing. Every metric ton is processed through multi-deck vibratory screens to meet tight industrial tolerances.</p>
      </div>

      <div className={styles.imageShowcase}>
        <div className={styles.imageWrapper}>
          <img 
            src="/quartz_grain_grades.jpg" 
            alt="Sumanth Minerals Quartz Grades: Sand, Granules, Lump Quartz" 
            className={styles.mainImg}
          />
          <div className={styles.imageOverlayTag}>
            <span>Authentic Laboratory Petri Specimen Inspection</span>
          </div>
        </div>
      </div>

      <div className={styles.gradeSelectorRow}>
        {grades.map((g) => (
          <button
            key={g.id}
            className={`${styles.gradeBtn} ${activeGrade.id === g.id ? styles.activeGradeBtn : ""}`}
            onClick={() => {
              setActiveGrade(g);
              onSelectGrade && onSelectGrade(g.id, g.name);
            }}
          >
            <span className={styles.gradeBtnName}>{g.name}</span>
            <span className={styles.gradeBtnTag}>{g.fractionTag}</span>
          </button>
        ))}
      </div>

      <div className={styles.detailCard}>
        <div className={styles.detailLeft}>
          <div className={styles.detailTitleRow}>
            <h3>{activeGrade.name}</h3>
            <span className={styles.statusPill}>NABL Certified Lot</span>
          </div>
          <p className={styles.highlightText}>
            <CheckCircle2 size={18} className={styles.checkIcon} />
            <span>{activeGrade.highlight}</span>
          </p>

          <div className={styles.specsRow}>
            <div className={styles.specBoxMini}>
              <span>Silica (SiO₂)</span>
              <strong>{activeGrade.sio2}</strong>
            </div>
            <div className={styles.specBoxMini}>
              <span>Iron (Fe₂O₃)</span>
              <strong>{activeGrade.fe2o3}</strong>
            </div>
            <div className={styles.specBoxMini}>
              <span>Hardness</span>
              <strong>{activeGrade.mohs}</strong>
            </div>
            <div className={styles.specBoxMini}>
              <span>Bulk Density</span>
              <strong>{activeGrade.bulkDensity}</strong>
            </div>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaBlock}>
              <strong>Key Applications:</strong>
              <p>{activeGrade.applications}</p>
            </div>
            <div className={styles.metaBlock}>
              <strong>Standard Packaging:</strong>
              <p>{activeGrade.packaging}</p>
            </div>
          </div>
        </div>

        <div className={styles.detailRight}>
          <div className={styles.ctaBox}>
            <h4>Need this specific fraction?</h4>
            <p>Request an immediate bulk pricing quotation or order a complimentary 5kg testing parcel.</p>
            <button 
              className={styles.quoteBtn}
              onClick={() => onOpenRFQ && onOpenRFQ("Specific Fraction Order", activeGrade.name, activeGrade.id)}
            >
              <span>Get Quotation for {activeGrade.name}</span>
              <ArrowRight size={16} />
            </button>
            <a href="/request-sample" className={styles.sampleLink}>
              Order 5kg / 10kg Lab Sample
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
