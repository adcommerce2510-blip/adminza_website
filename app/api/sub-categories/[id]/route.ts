import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import SubCategory from '@/models/SubCategory'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const subCategory = await SubCategory.findById(params.id)
    if (!subCategory) {
      return NextResponse.json({ success: false, error: 'Sub-category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: subCategory })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const body = await request.json()
    const subCategory = await SubCategory.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    if (!subCategory) {
      return NextResponse.json({ success: false, error: 'Sub-category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: subCategory })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const subCategory = await SubCategory.findByIdAndDelete(params.id)
    if (!subCategory) {
      return NextResponse.json({ success: false, error: 'Sub-category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: subCategory })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}
