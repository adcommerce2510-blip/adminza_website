import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
import Level2Category from '@/models/Level2Category'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const categories = await Category.find().sort({ createdAt: 1 })
    const subCategories = await SubCategory.find().sort({ createdAt: 1 })
    const level2Categories = await Level2Category.find().sort({ createdAt: 1 })
    
    // Build navbar data structure
    const navbarData = categories.map(category => {
      const categorySubCategories = subCategories.filter(sub => 
        sub.mainCategory === category.title
      )
      
      const subCategoriesWithLevel2 = categorySubCategories.map(sub => {
        const level2Items = level2Categories.filter(level2 => 
          level2.mainCategory === category.title && 
          level2.subCategory === sub.title
        )
        
        return {
          name: sub.title,
          href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`,
          nested: level2Items.map(level2 => ({
            name: level2.title,
            href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}/${sub.title.toLowerCase().replace(/\s+/g, '-')}/${level2.title.toLowerCase().replace(/\s+/g, '-')}`
          }))
        }
      })
      
      return {
        title: category.title,
        subcategories: subCategoriesWithLevel2.length > 0 ? subCategoriesWithLevel2 : [
          {
            name: category.mainUse?.toLowerCase() === 'service' ? 'View All Services' : 'View All Products',
            href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`
          }
        ]
      }
    })
    
    return NextResponse.json({
      success: true,
      data: navbarData
    })
  } catch (error) {
    console.error('Error fetching navbar categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
