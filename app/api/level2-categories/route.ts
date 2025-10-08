import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Level2Category from '@/models/Level2Category'

export async function GET() {
  try {
    await dbConnect()
    const level2Categories = await Level2Category.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: level2Categories })
  } catch (error) {
    console.error('Error fetching level2 categories:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch level2 categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const { name, mainCategory, subCategory, mainUse, description } = body
    
    if (!name || !mainCategory || !subCategory || !mainUse) {
      return NextResponse.json({ success: false, error: 'Name, main category, sub category, and main use are required' }, { status: 400 })
    }

    // Check if level2 category already exists under the same main and sub category
    const existingLevel2Category = await Level2Category.findOne({ name, mainCategory, subCategory })
    if (existingLevel2Category) {
      return NextResponse.json({ success: false, error: 'Level2 category with this name already exists under the selected main and sub category' }, { status: 400 })
    }

    const level2Category = new Level2Category({
      name,
      mainCategory,
      subCategory,
      mainUse,
      description: description || ''
    })

    const savedLevel2Category = await level2Category.save()
    return NextResponse.json({ success: true, data: savedLevel2Category })
  } catch (error) {
    console.error('Error creating level2 category:', error)
    return NextResponse.json({ success: false, error: 'Failed to create level2 category' }, { status: 500 })
  }
}

