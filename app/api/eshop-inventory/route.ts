import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import EShopInventory from '@/models/EShopInventory'

export async function GET() {
  await dbConnect()
  try {
    const inventory = await EShopInventory.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: inventory })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

export async function POST(request: Request) {
  await dbConnect()
  try {
    const body = await request.json()
    const inventoryItem = await EShopInventory.create(body)
    return NextResponse.json({ success: true, data: inventoryItem }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

