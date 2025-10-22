import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Service from '@/models/Service'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const subSubcategory = searchParams.get('subSubcategory')
    
    let query: any = {}
    
    if (subSubcategory) {
      // Level 2 category - most specific
      query.level2Category = { $regex: subSubcategory, $options: 'i' }
    } else if (subcategory) {
      // Subcategory
      query.subcategory = { $regex: subcategory, $options: 'i' }
    } else if (category) {
      // Main category
      query.category = { $regex: category, $options: 'i' }
    }
    
    const services = await Service.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: services
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const service = new Service(body)
    await service.save()
    
    return NextResponse.json({
      success: true,
      data: service
    })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
