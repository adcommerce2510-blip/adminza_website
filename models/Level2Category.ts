import mongoose from 'mongoose'

const Level2CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  mainUse: { type: String, required: true, enum: ['product', 'service'] },
  description: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.models.Level2Category || mongoose.model('Level2Category', Level2CategorySchema)

