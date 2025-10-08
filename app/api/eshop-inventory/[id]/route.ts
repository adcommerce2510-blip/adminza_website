import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import EShopInventory from '@/models/EShopInventory'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect()
  try {
    const inventoryItem = await EShopInventory.findById(params.id)
    if (!inventoryItem) {
      return NextResponse.json({ success: false, error: 'Inventory item not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: inventoryItem })
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
    const inventoryItem = await EShopInventory.findByIdAndUpdate(
      params.id, 
      { ...body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    )
    if (!inventoryItem) {
      return NextResponse.json({ success: false, error: 'Inventory item not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: inventoryItem })
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
    const inventoryItem = await EShopInventory.findByIdAndDelete(params.id)
    if (!inventoryItem) {
      return NextResponse.json({ success: false, error: 'Inventory item not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: inventoryItem })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 })
  }
}

