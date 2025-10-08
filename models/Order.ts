import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
})

const OrderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: "India" }
  },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Order Placed' 
  },
  paymentMethod: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  notes: { type: String }
}, { timestamps: true })

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)

