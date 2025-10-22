"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, FolderOpen } from "lucide-react"
import Link from "next/link"

interface Category {
  _id: string
  name: string
  use: string
  createdAt: string
}

interface SubCategory {
  _id: string
  name: string
  mainCategory: string
  use: string
  createdAt: string
}

interface Level2Category {
  _id: string
  name: string
  mainCategory: string
  subCategory: string
  use: string
  createdAt: string
}

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [level2Categories, setLevel2Categories] = useState<Level2Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUse, setSelectedUse] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories, sub-categories, and level2 categories
        const [categoriesRes, subCategoriesRes, level2Res] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/sub-categories"),
          fetch("/api/level2-categories")
        ])

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData.success ? categoriesData.data : categoriesData)
        }

        if (subCategoriesRes.ok) {
          const subCategoriesData = await subCategoriesRes.json()
          setSubCategories(subCategoriesData.success ? subCategoriesData.data : subCategoriesData)
        }

        if (level2Res.ok) {
          const level2Data = await level2Res.json()
          setLevel2Categories(level2Data.success ? level2Data.data : level2Data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Combine all categories for display
  const allCategories = [
    ...categories.map(cat => ({
      id: cat._id,
      name: cat.name,
      type: 'Main Category',
      use: cat.use,
      createdAt: cat.createdAt,
      level: 1,
      path: cat.name
    })),
    ...subCategories.map(sub => ({
      id: sub._id,
      name: sub.name,
      type: 'Sub Category',
      use: sub.use,
      createdAt: sub.createdAt,
      level: 2,
      path: `${sub.mainCategory} > ${sub.name}`
    })),
    ...level2Categories.map(l2 => ({
      id: l2._id,
      name: l2.name,
      type: 'Level 2 Category',
      use: l2.use,
      createdAt: l2.createdAt,
      level: 3,
      path: `${l2.mainCategory} > ${l2.subCategory} > ${l2.name}`
    }))
  ]

  // Filter categories
  const filteredCategories = allCategories.filter((category) => {
    const matchesSearch = category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.path?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUse = selectedUse === "all" || category.use === selectedUse
    const matchesLevel = selectedLevel === "all" || category.level.toString() === selectedLevel
    return matchesSearch && matchesUse && matchesLevel
  })

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-blue-100 text-blue-800"
      case 2: return "bg-green-100 text-green-800"
      case 3: return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getUseColor = (use: string) => {
    return use === 'Product' ? "bg-orange-100 text-orange-800" : "bg-cyan-100 text-cyan-800"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our comprehensive category structure for products and services.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedUse} onValueChange={setSelectedUse}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Product">Products</SelectItem>
              <SelectItem value="Service">Services</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="1">Main Categories</SelectItem>
              <SelectItem value="2">Sub Categories</SelectItem>
              <SelectItem value="3">Level 2 Categories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredCategories.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <FolderOpen className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No categories found</h2>
            <p className="text-gray-600 mb-8">
              {allCategories.length === 0 
                ? "No categories available yet. Check back soon!" 
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getLevelColor(category.level)}>
                        Level {category.level}
                      </Badge>
                      <Badge className={getUseColor(category.use)}>
                        {category.use}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Type:</span> {category.type}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Path:</span> 
                        <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                          {category.path}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Created:</span> {new Date(category.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Link 
                        href={category.use === 'Product' ? '/products' : '/services'}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View {category.use}s →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredCategories.length} of {allCategories.length} categories
            </div>

            {/* Category Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {categories.length}
                  </div>
                  <div className="text-gray-600">Main Categories</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {subCategories.length}
                  </div>
                  <div className="text-gray-600">Sub Categories</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {level2Categories.length}
                  </div>
                  <div className="text-gray-600">Level 2 Categories</div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
