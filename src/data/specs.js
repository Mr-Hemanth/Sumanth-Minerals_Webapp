// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for quartz chemistry shown anywhere on the site.
// Values copied verbatim from Lucid Laboratories Pvt. Ltd. report
// No. LL/25-26/009401/1, issued 29/11/2025 (public/sumanth-minerals-lab-report.pdf).
// When you get a new lab report, update ONLY this file.
// ─────────────────────────────────────────────────────────────────────────

export const LAB_REPORT = {
  lab: 'Lucid Laboratories Pvt. Ltd., Hyderabad',
  reportNo: 'LL/25-26/009401/1',
  issued: '2025-11-29',
  basis: 'Dry basis, sample tested as received',
  pdf: '/sumanth-minerals-lab-report.pdf',
};

export const CHEMISTRY = {
  SiO2: '99.27%',
  Fe2O3: '0.30%',
  Al2O3: '0.25%',
  CaO: '0.01%',
  MgO: '0.01%',
  K2O: '0.03%',
  Na2O: '0.02%',
  TiO2: '<0.01%',
  MnO: '<0.01%',
  V2O5: '<0.01%',
  P2O5: '<0.01%',
  LOI: '0.10%',
  EC: '4.42 µS/cm (10% aqueous)',
};

// Typical physical properties of vein quartz (not from the lab report).
export const PHYSICAL = {
  mohs: '7.0',
  specificGravity: '2.65',
  fusionPoint: '1713°C',
};
