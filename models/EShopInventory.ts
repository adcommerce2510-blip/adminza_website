import mongoose from 'mongoose'

const EShopInventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 }, // Total stock given to customer
  invoicedQuantity: { type: Number, default: 0 }, // Total quantity that has been invoiced
  price: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true })

export default mongoose.models.EShopInventory || mongoose.model('EShopInventory', EShopInventorySchema)

