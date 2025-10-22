import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all products without any filtering
    const products = await Product.find({}).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      message: "All products from database"
    })
  } catch (error) {
    console.error("Error fetching all products:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
