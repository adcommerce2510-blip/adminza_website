import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Level2Category from '@/models/Level2Category'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const level2Category = await Level2Category.findById(params.id)
    if (!level2Category) {
      return NextResponse.json({ success: false, error: 'Level2 category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: level2Category })
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
    const level2Category = await Level2Category.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    if (!level2Category) {
      return NextResponse.json({ success: false, error: 'Level2 category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: level2Category })
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
    const level2Category = await Level2Category.findByIdAndDelete(params.id)
    if (!level2Category) {
      return NextResponse.json({ success: false, error: 'Level2 category not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: level2Category })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}
