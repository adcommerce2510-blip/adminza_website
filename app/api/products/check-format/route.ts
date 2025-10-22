import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all products to see their current category format
    const allProducts = await Product.find({})
    
    return NextResponse.json({
      success: true,
      data: allProducts.map(p => ({ 
        _id: p._id,
        name: p.name, 
        category: p.category,
        subcategory: p.subcategory,
        level2Category: p.level2Category
      })),
      count: allProducts.length,
      message: "Check your product category formats. Expected format: 'main > sub' for hierarchical categories."
    })
  } catch (error) {
    console.error("Error fetching products for format check:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products for format check" },
      { status: 500 }
    )
  }
}
