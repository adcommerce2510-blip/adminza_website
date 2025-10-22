"use client"

import { useState, useEffect } from "react"
import { NavigationDropdown } from "./navigation-dropdown"

interface SubCategory {
  name: string
  href: string
  nested?: SubCategory[]
}

interface NavbarCategory {
  title: string
  href: string
  subcategories: SubCategory[]
}

export function DynamicNavbar() {
  const [categories, setCategories] = useState<NavbarCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching navbar categories...")
        const response = await fetch('/api/categories/navbar')
        console.log("Response status:", response.status)
        
        if (response.ok) {
          const result = await response.json()
          console.log("API result:", result)
          
          if (result.success) {
            console.log("Categories loaded:", result.data.length)
            console.log("Categories in order:", result.data.map(c => c.title))
            setCategories(result.data)
          } else {
            console.error("API returned error:", result.error)
          }
        } else {
          console.error("Failed to fetch categories, status:", response.status)
        }
      } catch (error) {
        console.error("Error fetching navbar categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <nav className="hidden lg:flex items-center justify-start w-full overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-1 min-w-max">
          <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-6 w-28 rounded"></div>
        </div>
      </nav>
    )
  }

  if (categories.length === 0) {
    return (
      <nav className="hidden lg:flex items-center justify-start w-full">
        <span className="text-gray-500 text-sm">No categories found</span>
      </nav>
    )
  }

  return (
    <nav className="hidden lg:flex items-center justify-start w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center space-x-1 min-w-max">
        {categories.map((category, index) => (
          <NavigationDropdown
            key={index}
            title={category.title}
            subcategories={category.subcategories}
          />
        ))}
      </div>
    </nav>
  )
}
