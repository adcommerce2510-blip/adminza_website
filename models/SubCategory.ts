import mongoose from 'mongoose'

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainCategory: { type: String, required: true },
  mainUse: { type: String, required: true, enum: ['product', 'service'] },
  description: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema)

