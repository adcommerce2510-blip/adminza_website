import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const subSubcategory = searchParams.get('subSubcategory')
    
    let query: any = {}
    
    if (subSubcategory) {
      // Level 2 category filtering
      const subSubcategoryName = subSubcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      query = {
        $or: [
          { category: { $regex: subSubcategoryName, $options: 'i' } },
          { subcategory: { $regex: subSubcategoryName, $options: 'i' } },
          { level2Category: { $regex: subSubcategoryName, $options: 'i' } }
        ]
      }
      console.log("Level 2 category filtering:", subSubcategoryName, query)
    } else if (subcategory) {
      // Sub category filtering - show products that belong to this subcategory
      // Handle format like "main/sub" in the category field
      const mainCategory = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || ''
      const subcategoryName = subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      
      if (mainCategory) {
        // If we have both main category and subcategory, search for exact "main/sub" format
        query = {
          $or: [
            { category: { $regex: `^${mainCategory}/${subcategoryName}$`, $options: 'i' } }, // Exact "main/sub" format
            { category: { $regex: `^${mainCategory}/${subcategoryName}/`, $options: 'i' } }, // "main/sub/level2" format
            { subcategory: { $regex: subcategoryName, $options: 'i' } } // Fallback to subcategory field
          ]
        }
      } else {
        // If we only have subcategory, search more broadly
        query = {
          $or: [
            { category: { $regex: `/${subcategoryName}$`, $options: 'i' } }, // Ends with "/sub"
            { category: { $regex: `/${subcategoryName}/`, $options: 'i' } }, // Contains "/sub/"
            { subcategory: { $regex: subcategoryName, $options: 'i' } } // Fallback to subcategory field
          ]
        }
      }
      console.log("Sub category filtering:", subcategoryName, "Main:", mainCategory, query)
    } else if (category) {
      // Main category filtering - handle hierarchical format "main/sub"
      const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      query = {
        $or: [
          { category: { $regex: `^${categoryName}`, $options: 'i' } }, // Starts with main category
          { category: { $regex: `.*${categoryName}/.*`, $options: 'i' } }, // Contains main/sub
          { subcategory: { $regex: categoryName, $options: 'i' } } // Fallback
        ]
      }
      console.log("Main category filtering:", categoryName, query)
    }
    
    let products = await Product.find(query).sort({ createdAt: -1 })
    
    console.log("Query executed:", query)
    console.log("Products found:", products.length)
    console.log("Products data:", products.map(p => ({ name: p.name, category: p.category, subcategory: p.subcategory })))
    
    // If no products found for subcategory, try to find products from main category
    if (products.length === 0 && subcategory) {
      const mainCategoryName = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Main'
      const fallbackQuery = {
        $or: [
          { category: { $regex: mainCategoryName, $options: 'i' } }
        ]
      }
      console.log("No subcategory products found, trying main category:", fallbackQuery)
      products = await Product.find(fallbackQuery).sort({ createdAt: -1 })
      console.log("Fallback products found:", products.length)
    }
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const product = new Product(body)
    const savedProduct = await product.save()
    
    return NextResponse.json({
      success: true,
      data: savedProduct
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}