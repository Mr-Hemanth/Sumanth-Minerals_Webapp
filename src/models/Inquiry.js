import mongoose from 'mongoose';

export const INQUIRY_TYPES = ['Inquiry', 'Sample Request', 'Bulk RFQ'];
export const INQUIRY_STATUSES = ['New', 'Contacted', 'Sample Sent', 'Quoted', 'Won', 'Lost', 'Resolved'];

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
  type: {
    type: String,
    enum: INQUIRY_TYPES,
    default: 'Inquiry',
  },
  leadScore: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: INQUIRY_STATUSES,
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
