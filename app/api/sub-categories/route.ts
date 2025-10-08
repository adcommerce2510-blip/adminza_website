import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import SubCategory from '@/models/SubCategory'

export async function GET() {
  try {
    await dbConnect()
    const subCategories = await SubCategory.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: subCategories })
  } catch (error) {
    console.error('Error fetching sub-categories:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch sub-categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const { name, mainCategory, mainUse, description } = body
    
    if (!name || !mainCategory || !mainUse) {
      return NextResponse.json({ success: false, error: 'Name, main category, and main use are required' }, { status: 400 })
    }

    // Check if sub-category already exists under the same main category
    const existingSubCategory = await SubCategory.findOne({ name, mainCategory })
    if (existingSubCategory) {
      return NextResponse.json({ success: false, error: 'Sub-category with this name already exists under the selected main category' }, { status: 400 })
    }

    const subCategory = new SubCategory({
      name,
      mainCategory,
      mainUse,
      description: description || ''
    })

    const savedSubCategory = await subCategory.save()
    return NextResponse.json({ success: true, data: savedSubCategory })
  } catch (error) {
    console.error('Error creating sub-category:', error)
    return NextResponse.json({ success: false, error: 'Failed to create sub-category' }, { status: 500 })
  }
}

