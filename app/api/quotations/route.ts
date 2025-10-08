import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Quotation from '@/models/Quotation'

export async function GET() {
  await dbConnect()
  try {
    const quotations = await Quotation.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: quotations })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function POST(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const quotation = await Quotation.create(body)
    return NextResponse.json({ success: true, data: quotation }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

