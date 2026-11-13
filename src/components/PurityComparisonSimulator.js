'use client';
import { useState } from "react";
import { Sliders, ShieldCheck, Flame, Sparkles, TrendingUp, CheckCircle, Info } from "lucide-react";
import styles from "./PurityComparisonSimulator.module.css";

export default function PurityComparisonSimulator({ onOpenRFQ }) {
  const [gradeMode, setGradeMode] = useState("sumanth"); // "standard" or "sumanth"

  const metrics = {
    standard: {
      title: "Standard Commercial Quartz (98.0% SiO₂)",
      sio2: "98.0%",
      fe2o3: "0.85% (High Iron)",
      al2o3: "0.80%",
      loi: "0.55% (High Volatiles)",
      conductivity: "18.5 µS/cm",
      kilnEfficiency: "Standard Energy Consumption",
      glassClarity: "Slight Green / Amber Tint Risk",
      stoneWhiteness: "Requires Extra Decolorizing Agents",
      defectRisk: "Moderate (Bubbles & Micro-Inclusions)",
      gradeColor: "#ef4444"
    },
    sumanth: {
      title: "Sumanth Minerals Certified Vein Quartz (99.27% SiO₂)",
      sio2: "99.27% (IS 1917 Certified)",
      fe2o3: "0.30% (Low Iron)",
      al2o3: "0.25% (Controlled)",
      loi: "0.10% (Low LOI)",
      conductivity: "4.42 µS/cm (Pristine)",
      kilnEfficiency: "14% Lower Energy / Fast Homogenization",
      glassClarity: "Crystal Optical Transparency",
      stoneWhiteness: "Brilliant Natural White (95%+ Whiteness)",
      defectRisk: "Near-Zero (Clean Thermal Fusion at 1713°C)",
      gradeColor: "#16a34a"
    }
  };

  const current = metrics[gradeMode];

  return (
    <div className={styles.simulatorContainer}>
      <div className={styles.simHeader}>
        <div className={styles.badgeTag}>TECHNICAL COMPARISON ENGINE</div>
        <h2>Chemical Purity vs Manufacturing Yield</h2>
        <p>See how Sumanth Minerals' 99.27% SiO₂ reduces plant energy, eliminates discoloration, and cuts defect rates in industrial glass, solar, and engineered stone plants.</p>
      </div>

      <div className={styles.toggleRow}>
        <button
          className={`${styles.toggleBtn} ${gradeMode === "standard" ? styles.activeStandard : ""}`}
          onClick={() => setGradeMode("standard")}
        >
          <span>Standard Quartz (98% SiO₂)</span>
        </button>
        <button
          className={`${styles.toggleBtn} ${gradeMode === "sumanth" ? styles.activeSumanth : ""}`}
          onClick={() => setGradeMode("sumanth")}
        >
          <Sparkles size={16} />
          <span>Sumanth Minerals Vein Quartz (99.27% SiO₂)</span>
        </button>
      </div>

      <div className={styles.specDisplayGrid}>
        <div className={styles.displayCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>Silica (SiO₂) Purity</span>
            <span className={styles.standardLabel}>Standard IS 1917</span>
          </div>
          <div className={styles.bigVal} style={{ color: current.gradeColor }}>
            {current.sio2}
          </div>
          <div className={styles.cardDesc}>
            {gradeMode === "sumanth" 
              ? "Guarantees complete thermal fusion at 1713°C with extreme chemical inertness." 
              : "Lower silica requires higher furnace temperatures and leaves unreacted silica grains."}
          </div>
        </div>

        <div className={styles.displayCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>Iron Content (Fe₂O₃)</span>
            <span className={styles.standardLabel}>ICP-OES Verified</span>
          </div>
          <div className={styles.bigVal} style={{ color: gradeMode === "sumanth" ? "#16a34a" : "#ef4444" }}>
            {current.fe2o3}
          </div>
          <div className={styles.cardDesc}>
            {gradeMode === "sumanth" 
              ? "0.30% Fe₂O₃ enables brilliant optical glass light transmittance and pure white engineered slabs." 
              : "High iron leads to undesirable greenish tint in glass and yellowish blotches in quartz slabs."}
          </div>
        </div>

        <div className={styles.displayCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>Loss on Ignition (LOI)</span>
            <span className={styles.standardLabel}>Volatiles & Moisture</span>
          </div>
          <div className={styles.bigVal} style={{ color: gradeMode === "sumanth" ? "#16a34a" : "#f59e0b" }}>
            {current.loi}
          </div>
          <div className={styles.cardDesc}>
            {gradeMode === "sumanth" 
              ? "0.10% LOI eliminates furnace gas outgassing, pinholes, and bubbles in melting kilns." 
              : "High LOI generates gas pores, requiring costly fining agents and slower furnace pulls."}
          </div>
        </div>

        <div className={styles.displayCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>Electrical Conductivity</span>
            <span className={styles.standardLabel}>10% Aqueous Solution</span>
          </div>
          <div className={styles.bigVal} style={{ color: gradeMode === "sumanth" ? "#16a34a" : "#f59e0b" }}>
            {current.conductivity}
          </div>
          <div className={styles.cardDesc}>
            {gradeMode === "sumanth" 
              ? "4.42 µS/cm reflects absence of soluble salts, clay particles, and conductive impurities." 
              : "Soluble salts accelerate refractory corrosion and weaken electrical insulator strength."}
          </div>
        </div>
      </div>

      <div className={styles.roiBanner}>
        <div className={styles.roiLeft}>
          <TrendingUp size={28} className={styles.roiIcon} />
          <div>
            <h4>Manufacturing Impact with Sumanth Minerals:</h4>
            <p>Glass and ceramic plants report up to <strong>14% lower energy consumption</strong>, zero batch discoloration, and <strong>higher first-grade product yields</strong>.</p>
          </div>
        </div>
        <button 
          onClick={() => onOpenRFQ && onOpenRFQ("99.27% Ultra-Purity", "Trial Commercial Batch")} 
          className={styles.roiActionBtn}
        >
          <span>Request Bulk Pricing</span>
        </button>
      </div>
    </div>
  );
}
