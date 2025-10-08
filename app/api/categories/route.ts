import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET() {
  try {
    await dbConnect()
    const categories = await Category.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const { name, mainUse, description } = body
    
    if (!name || !mainUse) {
      return NextResponse.json({ success: false, error: 'Name and main use are required' }, { status: 400 })
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return NextResponse.json({ success: false, error: 'Category with this name already exists' }, { status: 400 })
    }

    const category = new Category({
      name,
      mainUse,
      description: description || ''
    })

    const savedCategory = await category.save()
    return NextResponse.json({ success: true, data: savedCategory })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 })
  }
}

