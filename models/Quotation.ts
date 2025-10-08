import mongoose from 'mongoose'

const QuotationItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  specifications: { type: String },
  additionalNotes: { type: String }
})

const QuotationSchema = new mongoose.Schema({
  quotationNo: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: "India" }
  },
  companyName: { type: String },
  items: [QuotationItemSchema],
  totalEstimatedValue: { type: Number },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewing', 'Quoted', 'Accepted', 'Rejected'], 
    default: 'Pending' 
  },
  adminNotes: { type: String },
  quotedAmount: { type: Number },
  quotedDate: { type: Date }
}, { timestamps: true })

export default mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema)

