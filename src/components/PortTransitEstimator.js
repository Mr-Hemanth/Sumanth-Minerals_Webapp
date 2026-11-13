'use client';
import { useState } from "react";
import { Ship, Anchor, Clock, Package, FileCheck, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import styles from "./PortTransitEstimator.module.css";

const routes = [
  {
    id: "uae",
    region: "Middle East",
    destination: "Jebel Ali / Dubai, UAE",
    departurePort: "Krishnapatnam Port (KPCT) / Chennai Port",
    transitTime: "5 – 7 Days",
    mode: "Containerized (20ft) / Bulk Charter",
    containerCapacity: "27 – 28 Metric Tons / 20ft Box",
    docs: ["Bill of Lading", "Certificate of Origin (Chamber)", "NABL COA Lab Report", "Commercial Invoice & Packing List"]
  },
  {
    id: "saudi",
    region: "Middle East",
    destination: "Dammam / Jeddah, Saudi Arabia",
    departurePort: "Krishnapatnam Port (KPCT)",
    transitTime: "8 – 11 Days",
    mode: "20ft Heavy-Duty Containers / Bulk",
    containerCapacity: "28 Metric Tons / 20ft Box",
    docs: ["SABER Clearance Support", "Certificate of Origin", "Certified Chemical Assay", "Commercial Invoice"]
  },
  {
    id: "europe",
    region: "Europe",
    destination: "Rotterdam / Hamburg / Genoa",
    departurePort: "Chennai Port / Krishnapatnam",
    transitTime: "18 – 24 Days",
    mode: "20ft FCL (1 MT Jumbo Bags with Inner Liner)",
    containerCapacity: "26 – 28 Metric Tons / 20ft Box",
    docs: ["EUR1 / REX Origin Declaration", "NABL Certificate of Analysis", "REACH Exemption Statement", "Marine Bill of Lading"]
  },
  {
    id: "seasia",
    region: "South East Asia",
    destination: "Singapore / Port Klang (Malaysia) / Bangkok",
    departurePort: "Chennai Port / Krishnapatnam",
    transitTime: "6 – 9 Days",
    mode: "FCL Containerized / Break Bulk",
    containerCapacity: "28 Metric Tons / 20ft Box",
    docs: ["AIFTA Preferential Origin Certificate", "NABL Lab Analysis", "Inspection Certificate", "Packing List"]
  },
  {
    id: "domestic",
    region: "Domestic India",
    destination: "Morbi (Gujarat) / Firozabad (UP) / Chennai / Hyderabad",
    departurePort: "Direct Tadipatri Mine Pithead (AP)",
    transitTime: "24 – 48 Hours",
    mode: "Multi-Axle Tipper Dumpers / Open Rail Wagons",
    containerCapacity: "35 – 45 MT per Tipper Truck",
    docs: ["E-Way Bill", "AP Mineral Transit Royalty Pass", "NABL Quality Slip", "Electronic Weighbridge Slip"]
  }
];

export default function PortTransitEstimator({ onOpenRFQ }) {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  return (
    <div className={styles.transitContainer}>
      <div className={styles.transitHeader}>
        <div className={styles.badgeTag}>LOGISTICS & FREIGHT CORRIDOR</div>
        <h2>Global Transit Times & Port Connectivity</h2>
        <p>Strategically situated in Andhra Pradesh with direct highway corridors to Krishnapatnam Deep-Water Port and Chennai Port for rapid export turnaround.</p>
      </div>

      <div className={styles.routeTabs}>
        {routes.map((r) => (
          <button
            key={r.id}
            className={`${styles.tabBtn} ${selectedRoute.id === r.id ? styles.activeTab : ""}`}
            onClick={() => setSelectedRoute(r)}
          >
            <span className={styles.tabRegion}>{r.region}</span>
            <span className={styles.tabDest}>{r.destination}</span>
          </button>
        ))}
      </div>

      <div className={styles.routeCard}>
        <div className={styles.cardMain}>
          <div className={styles.routeOverview}>
            <div className={styles.routePill}>
              <Anchor size={16} />
              <span>Gateway: {selectedRoute.departurePort}</span>
            </div>
            <h3>To: {selectedRoute.destination}</h3>
          </div>

          <div className={styles.metricGrid}>
            <div className={styles.metricItem}>
              <Clock size={20} className={styles.metricIcon} />
              <div>
                <span>Estimated Transit Time</span>
                <strong>{selectedRoute.transitTime}</strong>
              </div>
            </div>

            <div className={styles.metricItem}>
              <Package size={20} className={styles.metricIcon} />
              <div>
                <span>Container Payload Capacity</span>
                <strong>{selectedRoute.containerCapacity}</strong>
              </div>
            </div>

            <div className={styles.metricItem}>
              <Ship size={20} className={styles.metricIcon} />
              <div>
                <span>Freight Mode</span>
                <strong>{selectedRoute.mode}</strong>
              </div>
            </div>
          </div>

          <div className={styles.docSection}>
            <h4>Standard Documentation Package Included:</h4>
            <div className={styles.docList}>
              {selectedRoute.docs.map((d, i) => (
                <div key={i} className={styles.docBadge}>
                  <FileCheck size={14} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.cardCTA}>
          <h4>Ship to {selectedRoute.destination}</h4>
          <p>Get a competitive FOB or CIF freight quote with guaranteed container booking confirmation.</p>
          <button 
            className={styles.freightBtn}
            onClick={() => onOpenRFQ && onOpenRFQ(`Freight Route: ${selectedRoute.destination}`, "Containerized 20ft")}
          >
            <span>Request CIF / FOB Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
