import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Service from "@/models/Service"

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
    } else if (subcategory) {
      // Sub category filtering - show services that belong to this subcategory
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
    }
    
    const services = await Service.find(query).sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: services,
      count: services.length
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const service = new Service(body)
    const savedService = await service.save()
    
    return NextResponse.json({
      success: true,
      data: savedService
    })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    )
  }
}