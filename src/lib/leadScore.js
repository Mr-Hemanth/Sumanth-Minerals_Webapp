// Lead scoring: decides which inquiries the sales desk should call first.
// Score is shown in the admin dashboard; leads scoring > 50 are highlighted.

const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "rediffmail.com", "icloud.com", "proton.me"];

/** "1,500 Tons" -> 1500, "2k" -> 2000, "" -> 0 */
export function parseTonnes(value) {
  if (!value) return 0;
  const s = String(value).toLowerCase().replace(/,/g, "");
  const n = parseFloat(s);
  if (Number.isNaN(n)) return 0;
  return /\d\s*k\b/.test(s) ? n * 1000 : n;
}

/**
 * @param {object} lead  sanitized inquiry (name, company, email, country,
 *                       industry, quantity, monthlyRequirement, type, ...)
 * @returns {number} 0–100
 */
export function scoreLead(lead) {
  let score = 0;
  const tonnes = Math.max(parseTonnes(lead.quantity), parseTonnes(lead.monthlyRequirement));
  const domain = String(lead.email || "").split("@")[1]?.toLowerCase() || "";

  // ── Baseline rules (the original site logic, with the ">500" bug fixed) ──
  if (tonnes >= 500) score += 50;
  if (lead.type === "Sample Request") score += 20;
  if (lead.company) score += 10;
  if (domain && !FREE_EMAIL_DOMAINS.includes(domain)) score += 30;

  // TODO(owner): add your own business rules here — e.g. which industries,
  // countries, or order sizes actually turn into paying customers for you.

  return Math.min(100, score);
}
