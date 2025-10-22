import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
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
    
    const products = await Product.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const product = new Product(body)
    await product.save()
    
    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
