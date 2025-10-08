import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Service from '@/models/Service'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const service = await Service.findById(params.id)
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: service
    })
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, category, price, duration, description, location, status, images, features, requirements } = body
    
    const service = await Service.findByIdAndUpdate(
      params.id,
      {
        ...(name && { name }),
        ...(category && { category }),
        ...(price && { price: parseFloat(price) }),
        ...(duration && { duration }),
        ...(description && { description }),
        ...(location && { location }),
        ...(status && { status }),
        ...(images && { images }),
        ...(features && { features }),
        ...(requirements && { requirements })
      },
      { new: true, runValidators: true }
    )
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const service = await Service.findByIdAndDelete(params.id)
    
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}


