import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // Stored as plain text per requirement
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String, default: "India" },
  gstNumber: { type: String },
  status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  isBlocked: { type: Boolean, default: false },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastLogin: { type: Date },
}, { timestamps: true })

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema)

