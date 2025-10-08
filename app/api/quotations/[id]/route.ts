import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Quotation from '@/models/Quotation'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const quotation = await Quotation.findById(params.id)
    if (!quotation) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: quotation })
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
    const quotation = await Quotation.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    if (!quotation) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: quotation })
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
    const quotation = await Quotation.findByIdAndDelete(params.id)
    if (!quotation) {
      return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: quotation })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

