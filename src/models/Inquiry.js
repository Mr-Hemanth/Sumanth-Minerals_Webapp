import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  company: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  whatsapp: {
    type: String,
    required: [true, 'Please provide a WhatsApp number'],
  },
  quantity: {
    type: String,
  },
  country: {
    type: String,
  },
  message: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Inquiry', 'Sample Request'],
    default: 'Inquiry',
  },
  leadScore: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Sample Sent', 'Resolved'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
