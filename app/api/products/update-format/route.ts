import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all products to see their current structure
    const allProducts = await Product.find({})
    console.log("Products before update:", allProducts.map(p => ({ 
      name: p.name, 
      category: p.category 
    })))
    
    // Update products that have category format "main > sub" to "main/sub"
    const result = await Product.updateMany(
      { category: { $regex: ".*>.*" } }, // Find products with ">" in category
      [
        {
          $set: {
            category: {
              $replaceAll: {
                input: "$category",
                find: " > ",
                replacement: "/"
              }
            }
          }
        }
      ]
    )
    
    // Get updated products to verify
    const updatedProducts = await Product.find({})
    console.log("Products after update:", updatedProducts.map(p => ({ 
      name: p.name, 
      category: p.category 
    })))
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} products to use "main/sub" format`,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
      beforeUpdate: allProducts.length,
      afterUpdate: updatedProducts.length,
      updatedProducts: updatedProducts.map(p => ({ 
        name: p.name, 
        category: p.category 
      }))
    })
  } catch (error) {
    console.error("Error updating product category format:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update product category format" },
      { status: 500 }
    )
  }
}
