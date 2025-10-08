"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
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
  {
    id: 6,
    name: "Large Format Printing Service",
    category: "Printing & Signage",
    price: 12000,
    rating: 4.8,
    reviews: 145,
    vendor: "PrintMaster Solutions",
    image: "/large-format-printing-banners.jpg",
    badge: "Fast Delivery",
    type: "service",
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Showing {products.length} results</p>
        <select className="border rounded-md px-3 py-2 text-sm">
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.badge && (
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {product.badge}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>

              <p className="text-sm text-muted-foreground mb-3">by {product.vendor}</p>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.type === "service" ? "Book Now" : "Add to Cart"}
                </Button>
              </div>
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
