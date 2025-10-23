import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const categories = await Category.find({}).sort({ createdAt: 1 })
    return NextResponse.json({ success: true, data: categories })
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    const category = await Category.create(body)
    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
