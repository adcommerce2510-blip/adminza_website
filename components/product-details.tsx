"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, Clock } from "lucide-react"
import { useState } from "react"

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch based on productId
  const product = {
    id: productId,
    name: "Professional Office Desk Setup",
    category: "Office Furniture",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 124,
    vendor: "ModernOffice Solutions",
    images: ["/modern-office-desk-front-view.jpg", "/modern-office-desk-side-view.jpg", "/modern-office-desk-detail-view.jpg"],
    badge: "Best Seller",
    inStock: true,
    description:
      "Complete professional office desk setup including ergonomic chair, spacious desk with storage, and premium accessories. Perfect for modern office environments.",
    features: [
      "Ergonomic design for maximum comfort",
      "Premium quality materials",
      "Easy assembly with included tools",
      "5-year warranty included",
      "Free installation service",
    ],
    specifications: {
      "Desk Dimensions": "150cm x 75cm x 75cm",
      "Chair Height": "Adjustable 42-52cm",
      Material: "Premium engineered wood with steel frame",
      "Weight Capacity": "Up to 80kg",
      "Assembly Time": "2-3 hours",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Product Images */}
      <div>
        <div className="mb-4">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="flex space-x-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                selectedImage === index ? "border-primary" : "border-border"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <div className="mb-4">
          <Badge variant="secondary" className="mb-2">
            {product.badge}
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground">by {product.vendor}</p>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 font-medium">{product.rating}</span>
          </div>
          <span className="text-muted-foreground ml-2">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground mb-6">{product.description}</p>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center border rounded-md">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">
              -
            </button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">
              +
            </button>
          </div>
          <Button size="lg" className="flex-1">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Truck className="h-4 w-4 text-primary" />
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>5 Year Warranty</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>2-3 Days Delivery</span>
          </div>
        </div>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="font-medium">{key}:</dt>
                      <dd className="text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
