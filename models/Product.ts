import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  price: number
  stock: number
  description: string
  images: string[]
  vendor: string
  status: 'Active' | 'Inactive' | 'Out of Stock'
  createdAt: Date
  updatedAt: Date
  orders: number
  featured: boolean
  tags: string[]
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  images: [{
    type: String,
    required: true
  }],
  vendor: {
    type: String,
    required: [true, 'Vendor is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Out of Stock'],
    default: 'Active'
  },
  orders: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

// Update status based on stock
ProductSchema.pre('save', function(next) {
  if (this.stock === 0) {
    this.status = 'Out of Stock'
  } else if (this.status === 'Out of Stock' && this.stock > 0) {
    this.status = 'Active'
  }
  next()
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

