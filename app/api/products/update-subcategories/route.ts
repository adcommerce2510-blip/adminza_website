import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Update products that have category "main" to also have subcategory "sub"
    const result = await Product.updateMany(
      { category: "main" }, // Find products with category "main"
      { 
        $set: { 
          subcategory: "sub" // Set subcategory to "sub"
        } 
      }
    )
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} products with subcategory`,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    })
  } catch (error) {
    console.error("Error updating product subcategories:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update product subcategories" },
      { status: 500 }
    )
  }
}
