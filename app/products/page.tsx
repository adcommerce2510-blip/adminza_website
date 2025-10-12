"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ShoppingCart, Search, Package } from "lucide-react"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images?: string[]
  category: string
  stock: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Load products from database
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?limit=1000") // Get all products
        if (response.ok) {
          const result = await response.json()
          
          // Handle both API response formats
          let productsArray: Product[] = []
          
          if (result.success && Array.isArray(result.data)) {
            // New format: { success: true, data: [...], pagination: {...} }
            productsArray = result.data
          } else if (Array.isArray(result)) {
            // Old format: [...]
            productsArray = result
          }
          
          setProducts(productsArray)
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(productsArray.map((p: Product) => {
            // Get the main category (before the first >)
            return p.category?.split('>')[0]?.trim() || 'Uncategorized'
          })))
          setCategories(uniqueCategories as string[])
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    // Load cart items from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        setCartItems([])
      }
    }
  }, [])

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product._id)
    
    if (existingItem) {
      // Update quantity
      const updatedItems = cartItems.map(item =>
        item.id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    } else {
      // Add new item
      const newItems = [...cartItems, { 
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        category: product.category,
        quantity: 1 
      }]
      setCartItems(newItems)
      localStorage.setItem("cart", JSON.stringify(newItems))
    }

    // Show success message
    alert(`${product.name} added to cart!`)
  }

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  // Filter products - ensure products is always an array
  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           product.category?.split('>')[0]?.trim() === selectedCategory
    return matchesSearch && matchesCategory
  }) : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of office supplies, furniture, and equipment for your business needs.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              {products.length === 0 
                ? "No products available yet. Check back soon!" 
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingCart className="h-16 w-16 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{product.category?.split('>')[0]?.trim()}</Badge>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <CardTitle className="text-xl mb-3">{product.name}</CardTitle>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Stock: <span className={product.stock > 10 ? "text-green-600" : "text-orange-600"}>
                          {product.stock} units
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {getCartQuantity(product._id) > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          In cart: {getCartQuantity(product._id)}
                        </span>
                      )}
                      
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
              <p className="text-gray-600 mb-4">
                {cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = '/cart'}
              >
                View Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}