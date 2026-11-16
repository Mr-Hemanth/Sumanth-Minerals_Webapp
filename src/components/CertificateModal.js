'use client';
import { useState } from "react";
import { ShieldCheck, Download, ExternalLink, X, FileCheck, CheckCircle2, Award } from "lucide-react";
import styles from "./CertificateModal.module.css";

export default function CertificateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const testResults = [
    { param: "Silica as SiO2", result: "99.27%", method: "IS 1917 (Part-3)", unit: "% by mass" },
    { param: "Iron as Fe2O3", result: "0.30%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Aluminium as Al2O3", result: "0.25%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Loss on Ignition (LOI)", result: "0.10%", method: "IS 1917 (Part-1)", unit: "% by mass" },
    { param: "Calcium as CaO", result: "0.01%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Magnesium as MgO", result: "0.01%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Potassium as K2O", result: "0.03%", method: "IS 1917 (Part-2)", unit: "% by mass" },
    { param: "Sodium as Na2O", result: "0.02%", method: "IS 1917 (Part-2)", unit: "% by mass" },
    { param: "Titanium as TiO2", result: "<0.01%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Manganese as MnO", result: "<0.01%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Phosphorus as P2O5", result: "<0.01%", method: "SOP OM-2 (ICP-OES)", unit: "% by mass" },
    { param: "Electrical Conductivity", result: "4.42 us/cm", method: "SOP OM 02", unit: "10% aqueous" }
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Award className={styles.badgeIcon} size={28} />
            <div>
              <h3>Independent Laboratory Analysis</h3>
              <p>Lucid Laboratories Pvt. Ltd. • Sample: Quartz</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.certMeta}>
            <div className={styles.metaBadge}>
              <CheckCircle2 size={16} />
              <span>Report No. LL/25-26/009401/1</span>
            </div>
            <div className={styles.metaBadge}>
              <FileCheck size={16} />
              <span>Analysis Date: 29/11/2025</span>
            </div>
            <div className={styles.metaBadge}>
              <ShieldCheck size={16} />
              <span>Entity: Sumanth Minerals</span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Test Parameter</th>
                  <th>Certified Result</th>
                  <th>Test Method</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((row, idx) => (
                  <tr key={idx} className={row.param.includes("Silica") ? styles.highlightRow : ""}>
                    <td className={styles.paramCell}>
                      <strong>{row.param}</strong>
                    </td>
                    <td className={styles.resultCell}>
                      <span className={styles.resultBadge}>{row.result}</span>
                    </td>
                    <td className={styles.methodCell}>{row.method}</td>
                    <td className={styles.unitCell}>{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.previewBox}>
            <div className={styles.previewInfo}>
              <h4>Official Physical Certificate Scan</h4>
              <p>Verified laboratory seal and authorized chemical signature on record.</p>
            </div>
            <a 
              href="/sumanth-minerals-lab-report.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.pdfBtn}
            >
              <Download size={18} />
              <span>Download Signed Report (PDF)</span>
            </a>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            Tested at Plot No. 3, IDA, Balanagar, Hyderabad. Authentic mine lot analysis.
          </span>
          <button className={styles.actionBtn} onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
