'use client';
import { useState } from "react";
import { ShieldCheck, FileText, Activity, Microscope, Download, Award } from "lucide-react";
import Link from "next/link";
import styles from "./quality.module.css";
import { motion } from "framer-motion";
import CertificateModal from "@/components/CertificateModal";
import RapidRFQModal from "@/components/RapidRFQModal";
import PurityComparisonSimulator from "@/components/PurityComparisonSimulator";

const headVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const inView = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const chemicalComposition = [
  { component: "Silica (SiO2)", percentage: "99.27%", method: "IS 1917 (Part-3)", key: true },
  { component: "Iron Oxide (Fe2O3)", percentage: "0.30%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Alumina (Al2O3)", percentage: "0.25%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Calcium (CaO)", percentage: "0.01%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Magnesium (MgO)", percentage: "0.01%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Potassium (K2O)", percentage: "0.03%", method: "IS 1917 (Part-2)" },
  { component: "Sodium (Na2O)", percentage: "0.02%", method: "IS 1917 (Part-2)" },
  { component: "Titanium (TiO2)", percentage: "<0.01%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Phosphorus (P2O5)", percentage: "<0.01%", method: "SOP OM-2 (ICP-OES)" },
  { component: "Loss on Ignition (LOI)", percentage: "0.10%", method: "IS 1917 (Part-1)" },
  { component: "Electrical Conductivity", percentage: "4.42 µS/cm", method: "SOP OM 02" }
];

const controlSteps = [
  {
    icon: <Microscope size={22} />,
    title: "Vein Source Assay",
    desc: "Geological mapping and diamond core drilling at our Lakshyampalli mines (Anantapur) to select pure white hydrothermal quartz veins prior to bench extraction."
  },
  {
    icon: <Activity size={22} />,
    title: "Multi-Stage Magnetic Beneficiation",
    desc: "High-gradient magnetic separation removes trace iron filings and tramp metals after primary and secondary crushing."
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Certified Batch Testing",
    desc: "Composite sampling from each 1,000 MT heap lot sent for ICP-OES spectrometry and loss-on-ignition verification."
  }
];

export default function Quality() {
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqSeed, setRfqSeed] = useState({ industry: "", size: "" });

  const openRFQ = (industry = "", size = "") => {
    setRfqSeed({ industry, size });
    setRfqOpen(true);
  };

  return (
    <div className={styles.qualityPage}>
      <CertificateModal isOpen={isCertOpen} onClose={() => setIsCertOpen(false)} />
      <RapidRFQModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        initialIndustry={rfqSeed.industry}
        initialSize={rfqSeed.size}
      />

      <section className={styles.pageHeader}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Quality</span>
          </nav>
          <motion.h1 variants={headVariant} initial="initial" animate="animate">
            Quality Assurance & NABL Analysis
          </motion.h1>
          <motion.p
            variants={headVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.12 }}
          >
            Certified 99.27% silica by Lucid Laboratories Pvt. Ltd. — the same report sheet travels with your container.
          </motion.p>
          <motion.div
            className={styles.headerChips}
            variants={headVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <span>IS 1917 Methods</span>
            <span>ICP-OES Spectrometry</span>
            <span>SGS / Intertek on request</span>
          </motion.div>
        </div>
      </section>

      <section className={styles.testing}>
        <div className="container">
          <div className={styles.grid}>
            <motion.div className={styles.textContent} {...inView}>
              <span className="section-label">Mine to dispatch</span>
              <h2>Three checkpoints, every lot</h2>
              <p>
                Chemical purity and sizing consistency form the foundation of our buyer relationships. Every consignment is sampled and cross-verified against IS 1917 Bureau of Indian Standards and international ASTM glass and ceramic guidelines.
              </p>

              <div className={styles.steps}>
                {controlSteps.map((step) => (
                  <div key={step.title} className={styles.step}>
                    <div className={styles.stepIcon}>{step.icon}</div>
                    <div className={styles.stepText}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.compositionBox}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.compositionHead}>
                <h3>Chemical Composition</h3>
                <span className={styles.purityPill}>99.27% SiO₂</span>
              </div>

              <div className={styles.table}>
                {chemicalComposition.map((item) => (
                  <div key={item.component} className={styles.tableRow}>
                    <span>
                      {item.component}
                      <small className={styles.method}>({item.method})</small>
                    </span>
                    <strong className={item.key ? styles.silicaValue : undefined}>{item.percentage}</strong>
                  </div>
                ))}
              </div>

              <div className={styles.compositionActions}>
                <button type="button" className={styles.inspectBtn} onClick={() => setIsCertOpen(true)}>
                  <Award size={16} />
                  <span>Inspect Certificate</span>
                </button>
                <a
                  href="/sumanth-minerals-lab-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfBtn}
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </a>
              </div>
              <p className={styles.disclaimer}>
                *Tested and certified by Lucid Laboratories Pvt. Ltd., Balanagar, Hyderabad (Authorized Signatory: A.L. Kanta Rao).
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.simulatorSection}>
        <div className="container">
          <PurityComparisonSimulator onOpenRFQ={openRFQ} />
        </div>
      </section>

      <section className={styles.reports}>
        <div className="container">
          <motion.div className="section-title" {...inView}>
            <h2>Official technical documentation</h2>
            <p>Direct mine-to-buyer transparency. Download signed analytical data sheets.</p>
          </motion.div>
          <div className={styles.reportGrid}>
            <motion.div className={styles.reportCard} {...inView} transition={{ delay: 0.1 }}>
              <FileText size={36} />
              <h4>Certified chemical analysis report</h4>
              <p>Full spectrum breakdown of silica, iron, alumina, LOI, and trace alkali oxides verified by ICP-OES.</p>
              <div className={styles.reportActions}>
                <button
                  type="button"
                  onClick={() => setIsCertOpen(true)}
                  className="btn btn-outline btn-sm"
                >
                  View Interactive
                </button>
                <a
                  href="/sumanth-minerals-lab-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Download size={14} /> PDF
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.reportCard} {...inView} transition={{ delay: 0.2 }}>
              <Activity size={36} />
              <h4>Complimentary lab test sample</h4>
              <p>Verify our 99.27% silica quartz directly in your plant laboratory before placing commercial bulk orders.</p>
              <div className={styles.reportActions}>
                <Link href="/request-sample" className="btn btn-primary btn-sm">
                  Request 5kg / 10kg Sample
                </Link>
                <button type="button" className={styles.textBtn} onClick={() => openRFQ("Quality Trial Batch", "")}>
                  Ask about testing →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
