"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

const categories = [
  { id: "office-stationery", name: "Office Stationery", count: 245 },
  { id: "it-support", name: "IT Support & Network", count: 189 },
  { id: "cleaning", name: "Cleaning & Maintenance", count: 156 },
  { id: "promotion", name: "Business Promotion", count: 134 },
  { id: "furniture", name: "Office Furniture", count: 298 },
  { id: "printing", name: "Printing & Signage", count: 167 },
  { id: "amc", name: "AMC Services", count: 89 },
  { id: "gifting", name: "Corporate Gifting", count: 123 },
]

export function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
            />
            <label
              htmlFor={category.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
            >
              {category.name}
            </label>
            <span className="text-xs text-muted-foreground">({category.count})</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
