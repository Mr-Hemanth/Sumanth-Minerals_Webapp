import mongoose from 'mongoose';

export const INQUIRY_TYPES = ['Inquiry', 'Sample Request', 'Bulk RFQ'];
// Order matters: this is the sales pipeline, left to right.
export const PIPELINE = ['New', 'Contacted', 'Sample Sent', 'Quoted', 'Won', 'Lost'];
// 'Resolved' is kept so leads saved before the pipeline existed stay valid.
export const INQUIRY_STATUSES = [...PIPELINE, 'Resolved'];
export const INCOTERMS = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'DAP'];
export const CURRENCIES = ['USD', 'INR', 'EUR', 'AED'];

const str = (max) => ({ type: String, trim: true, maxlength: max });

const InquirySchema = new mongoose.Schema({
  name: { ...str(120), required: [true, 'Please provide a name'] },
  company: str(160),
  email: { ...str(160), lowercase: true, required: [true, 'Please provide an email'] },
  whatsapp: { ...str(40), required: [true, 'Please provide a WhatsApp number'] },
  quantity: str(60),
  country: str(80),
  address: str(500),
  message: str(3000),
  industry: str(120),
  jobTitle: str(120),
  website: str(200),
  monthlyRequirement: str(60),
  preferredSize: str(60),
  packaging: str(120),
  deliveryPort: str(160),
  type: { type: String, enum: INQUIRY_TYPES, default: 'Inquiry' },
  leadScore: { type: Number, default: 0 },
  status: { type: String, enum: INQUIRY_STATUSES, default: 'New' },
  statusHistory: [{ status: String, at: { type: Date, default: Date.now }, _id: false }],

  // ── Sales desk (internal) ──
  followUpAt: Date,
  notes: [{ text: str(2000), at: { type: Date, default: Date.now } }],

  // ── Shared with the buyer on their tracking page ──
  trackingToken: { type: String, index: { unique: true, sparse: true } },
  quote: {
    pricePerMT: { type: Number, min: 0 },
    currency: { type: String, enum: CURRENCIES },
    incoterm: { type: String, enum: INCOTERMS },
    port: str(120),
    validUntil: Date,
    terms: str(1000),
  },
  sample: {
    courier: str(80),
    trackingNumber: str(80),
    dispatchedAt: Date,
  },
  buyerMessage: str(1500),

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
