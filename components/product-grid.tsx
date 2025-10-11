"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Search } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Professional Office Desk Setup",
    category: "Office Furniture",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 124,
    vendor: "ModernOffice Solutions",
    image: "/modern-office-desk-setup.jpg",
    badge: "Best Seller",
    type: "product",
  },
  {
    id: 2,
    name: "Complete IT Network Setup",
    category: "IT Support",
    price: 45000,
    rating: 4.9,
    reviews: 89,
    vendor: "TechPro Services",
    image: "/it-network-setup-office.jpg",
    badge: "Premium",
    type: "service",
  },
  {
    id: 3,
    name: "Office Cleaning Service (Monthly)",
    category: "Cleaning Services",
    price: 8000,
    rating: 4.7,
    reviews: 256,
    vendor: "CleanPro Mumbai",
    image: "/office-cleaning.png",
    badge: "Popular",
    type: "service",
  },
  {
    id: 4,
    name: "Corporate Branding Package",
    category: "Business Promotion",
    price: 15000,
    originalPrice: 20000,
    rating: 4.6,
    reviews: 67,
    vendor: "BrandCraft Studio",
    image: "/corporate-branding-materials.jpg",
    type: "service",
  },
  {
    id: 5,
    name: "Premium Stationery Bundle",
    category: "Office Stationery",
    price: 3500,
    rating: 4.5,
    reviews: 189,
    vendor: "OfficeSupply Pro",
    image: "/office-stationery-bundle.jpg",
    type: "product",
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div>
      {/* Horizontal Filter Bar */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* All Types Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]">
              <option>All Types</option>
              <option>Products</option>
              <option>Services</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* All Categories Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]">
              <option>All Categories</option>
              <option>Office Stationery</option>
              <option>IT Support & Network</option>
              <option>Cleaning & Maintenance</option>
              <option>Business Promotion</option>
              <option>Office Furniture</option>
              <option>Printing & Signage</option>
              <option>AMC Services</option>
              <option>Corporate Gifting</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* All Places Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]">
              <option>All Places</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Ahmedabad</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-muted-foreground">Showing {products.length} results</p>
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 p-0 overflow-hidden">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-2 left-2 text-xs" variant="secondary">
                  {product.badge}
                </Badge>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-sm mb-1 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              
              <div className="w-full h-px bg-gray-300 mb-2"></div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <Button className="w-full text-white text-sm font-medium py-2 rounded-md transition-colors" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
