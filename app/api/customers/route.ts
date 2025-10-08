import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function GET() {
  await dbConnect()
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: customers })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function POST(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const customer = await Customer.create(body)
    return NextResponse.json({ success: true, data: customer }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

