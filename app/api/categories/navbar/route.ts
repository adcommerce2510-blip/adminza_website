import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
import Level2Category from '@/models/Level2Category'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    // Fetch all categories, subcategories, and level2 categories
    const categories = await Category.find().sort({ createdAt: 1 })
    const subcategories = await SubCategory.find().sort({ createdAt: 1 })
    const level2Categories = await Level2Category.find().sort({ createdAt: 1 })

    // Build navbar data structure
    const navbarData = categories.map(category => {
      const categorySubcategories = subcategories.filter(sub => 
        sub.mainCategory === category.title
      ).map(sub => {
        const subLevel2Categories = level2Categories.filter(level2 => 
          level2.mainCategory === category.title && level2.subCategory === sub.title
        )

        return {
          name: sub.title,
          href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}/${sub.title.toLowerCase().replace(/\s+/g, '-')}`,
          nested: subLevel2Categories.length > 0 ? subLevel2Categories.map(level2 => ({
            name: level2.title,
            href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}/${sub.title.toLowerCase().replace(/\s+/g, '-')}/${level2.title.toLowerCase().replace(/\s+/g, '-')}`
          })) : undefined
        }
      })

      return {
        title: category.title,
        subcategories: [
          {
            name: `View All ${category.mainUse?.toLowerCase() === 'service' ? 'Services' : 'Products'}`,
            href: `/categories/${category.title.toLowerCase().replace(/\s+/g, '-')}`
          },
          ...categorySubcategories
        ]
      }
    })

    return NextResponse.json({
      success: true,
      data: navbarData
    })
  } catch (error) {
    console.error('Error fetching navbar data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch navbar data' },
      { status: 500 }
    )
  }
}
