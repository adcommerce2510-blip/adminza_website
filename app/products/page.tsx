"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Package, Star, Truck, Shield, Clock } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images?: string[]
  category: string
  subCategory?: string
  level2Category?: string
  stock: number
}

export default function ProductsPage() {
  const router = useRouter()
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
        const response = await fetch("/api/products?limit=1000")
        if (response.ok) {
          const result = await response.json()
          
          let productsArray: Product[] = []
          
          if (result.success && Array.isArray(result.data)) {
            productsArray = result.data
          } else if (Array.isArray(result)) {
            productsArray = result
          }
          
          setProducts(productsArray)
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(productsArray.map((p: Product) => {
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
      const updatedItems = cartItems.map(item =>
        item.id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    } else {
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

    alert(`${product.name} added to cart!`)
  }

  const handleBuyNow = (product: Product) => {
    // Add to cart first
    addToCart(product)
    // Then redirect to cart/checkout
    router.push('/cart')
  }

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  // Filter products
  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           product.category?.split('>')[0]?.trim() === selectedCategory
    return matchesSearch && matchesCategory
  }) : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Premium Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated collection of high-quality office supplies, furniture, and equipment for your business needs.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-72 h-12">
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
        </div>

        {filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <Package className="h-32 w-32 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">No products found</h2>
            <p className="text-lg text-gray-600 mb-8">
              {products.length === 0 
                ? "No products available yet. Check back soon!" 
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Product Image */}
                    <div className="relative h-80 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingCart className="h-24 w-24 text-gray-400" />
                      )}
                      {product.stock > 0 && (
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                          In Stock
                        </Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                          Out of Stock
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <CardContent className="p-6 flex flex-col justify-between">
                      <div>
                        {/* Category Badge */}
                        <Badge variant="secondary" className="mb-3 text-xs">
                          {product.category?.split('>')[0]?.trim()}
                        </Badge>

                        {/* Product Name */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Product Description */}
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {product.description || "High-quality product for your business needs."}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <span>Fast Delivery</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span>Quality Assured</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <span>Top Rated</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span>24/7 Support</span>
                          </div>
                        </div>

                        {/* Stock Info */}
                        <div className="mb-4">
                          <span className="text-sm text-gray-500">
                            Available Stock: <span className={product.stock > 10 ? "text-green-600 font-semibold" : "text-orange-600 font-semibold"}>
                              {product.stock} units
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Price</p>
                            <p className="text-3xl font-bold text-blue-600">
                              ₹{product.price.toLocaleString()}
                            </p>
                          </div>
                          {getCartQuantity(product._id) > 0 && (
                            <Badge className="bg-green-100 text-green-700 text-sm">
                              {getCartQuantity(product._id)} in cart
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            variant="outline"
                            className="flex-1 h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-400"
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            onClick={() => handleBuyNow(product)}
                            disabled={product.stock === 0}
                            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:bg-gray-400"
                          >
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Results count */}
            <div className="text-center py-6">
              <p className="text-lg text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
              </p>
            </div>
          </>
        )}

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Truck className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Free Delivery</h4>
              <p className="text-sm text-gray-600">On orders above ₹5000</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Quality Products</h4>
              <p className="text-sm text-gray-600">Verified & tested</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
