import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all products with their category information
    const products = await Product.find({}).select('name category subcategory level2Category').sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      message: "All products with category information"
    })
  } catch (error) {
    console.error("Error fetching debug products:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
