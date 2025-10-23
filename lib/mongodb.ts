import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://adminzaa:adminzaa123@cluster0.mongodb.net/adminzaa?retryWrites=true&w=majority'

// Temporarily disable MongoDB connection check for debugging
// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable')
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null
    promise: Promise<mongoose.Mongoose> | null
  } | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached && cached.conn) {
    return cached.conn
  }

  if (!cached || !cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    if (cached) {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose
      })
    }
  }

  try {
    if (cached) {
      cached.conn = await cached.promise
    }
  } catch (e) {
    if (cached) {
      cached.promise = null
    }
    throw e
  }

  return cached?.conn
}

export default dbConnect

