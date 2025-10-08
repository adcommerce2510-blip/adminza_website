"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const serviceTypes = [
  { id: "products", name: "Products", count: 856 },
  { id: "services", name: "Services", count: 634 },
  { id: "maintenance", name: "Maintenance", count: 234 },
]

const locations = [
  { id: "mumbai", name: "Mumbai", count: 456 },
  { id: "delhi", name: "Delhi", count: 234 },
  { id: "bangalore", name: "Bangalore", count: 189 },
  { id: "pune", name: "Pune", count: 167 },
]

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  return (
    <div className="space-y-6">
      {/* Service Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {serviceTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTypes([...selectedTypes, type.id])
                  } else {
                    setSelectedTypes(selectedTypes.filter((id) => id !== type.id))
                  }
                }}
              />
              <label
                htmlFor={type.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {type.name}
              </label>
              <span className="text-xs text-muted-foreground">({type.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center space-x-2">
              <Checkbox
                id={location.id}
                checked={selectedLocations.includes(location.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLocations([...selectedLocations, location.id])
                  } else {
                    setSelectedLocations(selectedLocations.filter((id) => id !== location.id))
                  }
                }}
              />
              <label
                htmlFor={location.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
              >
                {location.name}
              </label>
              <span className="text-xs text-muted-foreground">({location.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
