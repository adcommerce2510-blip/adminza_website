import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        error: 'MONGODB_URI environment variable is not defined',
        timestamp: new Date().toISOString()
      })
    }
    
    // Try to connect to database
    await dbConnect()
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
