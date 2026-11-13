'use client';
import { useState } from "react";
import { 
  Zap, Layers, Droplets, Factory, Cpu, Flame, 
  CheckCircle2, ArrowRight, ShieldCheck, Box, Download, MessageSquare
} from "lucide-react";
import styles from "./InteractiveGradeMatcher.module.css";

const industries = [
  {
    id: "solar",
    name: "Solar & Photovoltaic Glass",
    icon: <Zap size={22} />,
    recommendedGrade: "Quartz 0–12 mm / 12–30 mm",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "Ultra-low iron natural vein quartz ensuring maximum light transmittance for solar glass, photovoltaic panels, and quartz crucibles.",
    packaging: "1 Ton UV-Treated Jumbo FIBC Bags / 50kg HDPE",
    keyBenefits: [
      "High solar optical transmittance",
      "Thermal stability with uniform 1713°C fusion",
      "Trace titanium (<0.01%) and phosphorus (<0.01%)"
    ],
    recommendedSize: "0–12 mm or 12–30 mm"
  },
  {
    id: "engineered-stone",
    name: "Engineered Quartz Slabs & Countertops",
    icon: <Layers size={22} />,
    recommendedGrade: "Quartz 0–12 mm (Grit & Fine Sand)",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "Superior natural crystal whiteness and Mohs 7 hardness, with optimized particle distribution for zero-void resin binding in luxury surfaces.",
    packaging: "1000 kg Bulk Jumbo Bags with inner polythene liner",
    keyBenefits: [
      "Consistent brilliant whiteness (95%+)",
      "Zero oversized particles for uniform slab polishing",
      "High chemical resistance against household acids and stains"
    ],
    recommendedSize: "0–12 mm (Screened Fractions Available)"
  },
  {
    id: "glass",
    name: "Float & Container Glass",
    icon: <Droplets size={22} />,
    recommendedGrade: "Quartz 12–30 mm / 0–12 mm",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "Premium low-impurity raw material for high-clarity architectural glass, beverage containers, tableware, and lighting bulbs.",
    packaging: "Bulk loose in tippers / 1MT Jumbo Bags",
    keyBenefits: [
      "Strict iron control prevents green hue distortion",
      "Consistent grain size reduces melting kiln energy consumption",
      "Ultra-low LOI (0.10%) minimizes furnace gas bubbles"
    ],
    recommendedSize: "12–30 mm (Industrial Furnace Standard)"
  },
  {
    id: "ceramics",
    name: "Ceramics & Sanitaryware",
    icon: <Factory size={22} />,
    recommendedGrade: "Quartz 12–30 mm / 0–12 mm",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "Imparts structural rigidity and thermal shock resistance to porcelain tiles, vitrified ceramics, and high-tension electrical insulators.",
    packaging: "50kg Bags / 1 MT Bags / Loose Bulk",
    keyBenefits: [
      "Prevents crazing and warping during high-temp firing",
      "Enhances white-body tile brilliance and glaze adhesion",
      "High dielectric strength for electrical insulators"
    ],
    recommendedSize: "12–30 mm & 0–12 mm"
  },
  {
    id: "metallurgy",
    name: "Ferro-Silicon & Silicon Metal",
    icon: <Cpu size={22} />,
    recommendedGrade: "Quartz 30–80 mm (Lump Quartz)",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "Large, dense lump quartz with extreme thermal decrepitation resistance for submerged electric arc furnace smelting.",
    packaging: "Bulk Dumpers / 1 MT Jumbo Bags",
    keyBenefits: [
      "High thermal shock resistance without furnace dusting",
      "Ultra-low phosphorus (<0.01%) and calcium (0.01%)",
      "High recovery rate of elemental silicon"
    ],
    recommendedSize: "30–80 mm (Lumps)"
  },
  {
    id: "refractories",
    name: "Refractories & High-Temp Foundry",
    icon: <Flame size={22} />,
    recommendedGrade: "Quartz 30–80 mm & 12–30 mm",
    sio2: "99.27%",
    fe2o3: "0.30%",
    loi: "0.10%",
    summary: "High refractoriness under load and resistance to acidic slag erosion for foundry furnace linings, ramming mass, and mortars.",
    packaging: "1 MT Bags / Bulk Tippers",
    keyBenefits: [
      "Pyrometric Cone Equivalent (PCE) above Orton 32",
      "Minimal thermal expansion and volumetric stability",
      "Ideal grain morphology for foundry sand formulations"
    ],
    recommendedSize: "12–30 mm & 30–80 mm"
  }
];

export default function InteractiveGradeMatcher({ onOpenRFQ, onOpenCert }) {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <div className={styles.matcherContainer}>
      <div className={styles.matcherHeader}>
        <div className={styles.headerTag}>BUYER SPECIFICATION MATCHER</div>
        <h2>Select Your Industrial Application</h2>
        <p>Find the exact quartz grade, size fraction, and chemical tolerances certified for your manufacturing process.</p>
      </div>

      <div className={styles.industryTabs}>
        {industries.map((ind) => (
          <button
            key={ind.id}
            className={`${styles.tabBtn} ${selectedIndustry.id === ind.id ? styles.activeTab : ""}`}
            onClick={() => setSelectedIndustry(ind)}
          >
            <span className={styles.tabIcon}>{ind.icon}</span>
            <span className={styles.tabText}>{ind.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.resultCard}>
        <div className={styles.resultLeft}>
          <div className={styles.gradeHeader}>
            <span className={styles.gradeBadge}>RECOMMENDED SPECIFICATION</span>
            <h3>{selectedIndustry.recommendedGrade}</h3>
            <p className={styles.industryDesc}>{selectedIndustry.summary}</p>
          </div>

          <div className={styles.benefitsList}>
            <h4>Verified Chemical Advantages:</h4>
            <ul>
              {selectedIndustry.keyBenefits.map((b, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.packagingInfo}>
            <Box size={18} className={styles.boxIcon} />
            <div>
              <strong>Standard Packaging:</strong>
              <p>{selectedIndustry.packaging}</p>
            </div>
          </div>
        </div>

        <div className={styles.resultRight}>
          <div className={styles.specBox}>
            <div className={styles.specBoxHeader}>
              <ShieldCheck size={20} className={styles.shieldIcon} />
              <span>Certified NABL Lab Values</span>
            </div>

            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Silica (SiO₂)</span>
                <span className={styles.specValueHighlight}>{selectedIndustry.sio2}</span>
                <span className={styles.specMethod}>IS 1917 (Part-3)</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Iron (Fe₂O₃)</span>
                <span className={styles.specValue}>{selectedIndustry.fe2o3}</span>
                <span className={styles.specMethod}>ICP-OES</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Alumina (Al₂O₃)</span>
                <span className={styles.specValue}>0.25%</span>
                <span className={styles.specMethod}>ICP-OES</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Loss on Ignition</span>
                <span className={styles.specValue}>{selectedIndustry.loi}</span>
                <span className={styles.specMethod}>IS 1917 (Part-1)</span>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                className={styles.rfqBtn}
                onClick={() => onOpenRFQ && onOpenRFQ(selectedIndustry.name, selectedIndustry.recommendedSize)}
              >
                <span>Request Quote for this Grade</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className={styles.certBtn}
                onClick={() => onOpenCert && onOpenCert()}
              >
                <Download size={16} />
                <span>View NABL Lab Certificate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
