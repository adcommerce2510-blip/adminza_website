import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // In production, this should be hashed
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String, default: "India" },
  isBlocked: { type: Boolean, default: false },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema)

