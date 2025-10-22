import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import SubCategory from "@/models/SubCategory"
import Level2Category from "@/models/Level2Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Fetch all categories, subcategories, and level2 categories
    // Sort by creation date (first come, first served - newer categories after older ones)
    const [categories, subCategories, level2Categories] = await Promise.all([
      Category.find().sort({ createdAt: 1 }), // Sort by creation date ascending (oldest first)
      SubCategory.find().sort({ createdAt: 1 }),
      Level2Category.find().sort({ createdAt: 1 })
    ])
    
    console.log("Categories found:", categories.length)
    console.log("Categories with creation dates:", categories.map(c => ({ name: c.name, createdAt: c.createdAt })))
    console.log("SubCategories found:", subCategories.length)
    console.log("Level2Categories found:", level2Categories.length)
    
    // Build hierarchical structure
    const navbarData = categories.map(category => {
      const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-')
      
      // Find subcategories for this category (using string matching)
      // Sort subcategories by creation date (oldest first)
      const categorySubCategories = subCategories
        .filter(sub => sub.mainCategory === category.name)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      
      // Build subcategories with their level2 categories
      const subCategoriesWithLevel2 = categorySubCategories.map(sub => {
        const subSlug = sub.name.toLowerCase().replace(/\s+/g, '-')
        
        // Find level2 categories for this subcategory (using string matching)
        // Sort level2 categories by creation date (oldest first)
        const subLevel2Categories = level2Categories
          .filter(level2 => level2.mainCategory === category.name && level2.subCategory === sub.name)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        
        const level2Items = subLevel2Categories.map(level2 => ({
          name: level2.name,
          href: `/categories/${categorySlug}/${subSlug}/${level2.name.toLowerCase().replace(/\s+/g, '-')}`
        }))
        
        return {
          name: sub.name,
          href: `/categories/${categorySlug}/${subSlug}`,
          nested: level2Items.length > 0 ? level2Items : undefined
        }
      })
      
      // Determine the button text based on category type (case insensitive)
      const viewAllText = category.mainUse?.toLowerCase() === 'service' ? "View All Services" : "View All Products"
      console.log(`Category "${category.name}" (${category.mainUse}) -> Button text: "${viewAllText}"`)
      
      return {
        title: category.name,
        href: `/categories/${categorySlug}`,
        subcategories: [
          { name: viewAllText, href: `/categories/${categorySlug}` },
          ...subCategoriesWithLevel2
        ]
      }
    })
    
    console.log("Navbar data:", navbarData)
    
    return NextResponse.json({
      success: true,
      data: navbarData
    })
  } catch (error) {
    console.error("Error fetching navbar categories:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}
