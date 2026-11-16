import { randomBytes } from 'node:crypto';

/** Lead type for use mid-sentence: 'Bulk RFQ' -> 'bulk RFQ', 'Sample Request' -> 'sample request'. */
export const typePhrase = (type) =>
  ({ 'Bulk RFQ': 'bulk RFQ', 'Sample Request': 'sample request' }[type] || 'inquiry');

export const newTrackingToken = () => randomBytes(18).toString('base64url');

// Links in buyer emails. In production never fall back to NEXTAUTH_URL, which is
// often left as http://localhost:3000 when .env.local is copied to the host.
export const siteUrl = () =>
  (process.env.SITE_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://www.sumanthminerals.com' : process.env.NEXTAUTH_URL) ||
    'https://www.sumanthminerals.com').replace(/\/$/, '');

export const trackingUrl = (token) => `${siteUrl()}/track/${token}`;

/** Short human reference shown to buyers and on the dashboard, e.g. "SM-4F2A9C". */
export const leadRef = (lead) =>
  `SM-${String(lead?._id || lead?.trackingToken || '').slice(-6).toUpperCase()}`;

// What the buyer sees for each internal pipeline stage.
export const BUYER_STEPS = [
  { key: 'received', label: 'Request received', statuses: ['New'] },
  { key: 'review', label: 'Reviewed by sales', statuses: ['Contacted'] },
  { key: 'sample', label: 'Sample dispatched', statuses: ['Sample Sent'] },
  { key: 'quote', label: 'Quotation sent', statuses: ['Quoted'] },
  { key: 'order', label: 'Order confirmed', statuses: ['Won'] },
];

export function buyerProgress(status) {
  if (status === 'Lost' || status === 'Resolved') return { closed: true, index: -1 };
  const index = BUYER_STEPS.findIndex((s) => s.statuses.includes(status));
  return { closed: false, index: Math.max(0, index) };
}

/**
 * The ONLY fields a buyer may see. Never add email/phone, lead score,
 * internal notes or follow-up dates here.
 */
export function publicView(lead) {
  const q = lead.quote || {};
  const s = lead.sample || {};
  return {
    ref: leadRef(lead),
    type: lead.type,
    name: lead.name,
    company: lead.company,
    country: lead.country,
    industry: lead.industry,
    preferredSize: lead.preferredSize,
    quantity: lead.quantity,
    monthlyRequirement: lead.monthlyRequirement,
    packaging: lead.packaging,
    deliveryPort: lead.deliveryPort,
    status: lead.status,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    statusHistory: (lead.statusHistory || []).map((h) => ({ status: h.status, at: h.at })),
    quote: q.pricePerMT ? {
      pricePerMT: q.pricePerMT, currency: q.currency || 'USD', incoterm: q.incoterm,
      port: q.port, validUntil: q.validUntil, terms: q.terms,
    } : null,
    sample: s.trackingNumber || s.courier ? {
      courier: s.courier, trackingNumber: s.trackingNumber, dispatchedAt: s.dispatchedAt,
    } : null,
    buyerMessage: lead.buyerMessage || '',
  };
}
