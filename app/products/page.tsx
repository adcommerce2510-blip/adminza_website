"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield, Clock, Package, ChevronLeft, ChevronRight, Check, Heart, Share2, Award, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

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

export default function ProductDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
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

    // Fetch product details
    const fetchProduct = async () => {
      if (!productId) {
        // Show dummy data if no product ID
        setProduct({
          _id: "dummy-product-1",
          name: "Premium Office Chair - Ergonomic Design",
          price: 12500,
          description: "Experience ultimate comfort with our premium ergonomic office chair. Designed for long working hours, this chair features adjustable height, lumbar support, breathable mesh back, and smooth-rolling casters. Perfect for home offices and corporate environments. Built with high-quality materials to ensure durability and long-lasting comfort.",
          images: [
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
            "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800",
            "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800"
          ],
          category: "Office Furniture > Chairs > Executive Chairs",
          subCategory: "Chairs",
          level2Category: "Executive Chairs",
          stock: 45
        })
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            setProduct(result.data)
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const addToCart = () => {
    if (!product) return

    const existingItem = cartItems.find(item => item.id === product._id)
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product._id 
          ? { ...item, quantity: item.quantity + quantity }
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
        quantity: quantity
      }]
      setCartItems(newItems)
      localStorage.setItem("cart", JSON.stringify(newItems))
    }

    alert(`${quantity} x ${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    if (!product) return
    addToCart()
    router.push('/cart')
  }

  const getCartQuantity = () => {
    if (!product) return 0
    const item = cartItems.find(item => item.id === product._id)
    return item ? item.quantity : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-8 text-xl text-gray-600 font-medium">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-24">
            <Package className="h-40 w-40 text-gray-300 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-xl text-gray-600 mb-10">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/allcategories" className="text-gray-600 hover:text-blue-600 transition-colors">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="aspect-square relative group">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ShoppingCart className="h-32 w-32 text-gray-300" />
                  </div>
                )}
                
                {/* Stock Badge */}
                <div className="absolute top-6 right-6">
                  {product.stock > 0 ? (
                    <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                      <Check className="h-4 w-4 mr-1 inline" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-xl border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Action Icons */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <button className="bg-white hover:bg-red-50 p-3 rounded-full shadow-lg border border-gray-200 transition-colors">
                    <Heart className="h-5 w-5 text-gray-700 hover:text-red-500" />
                  </button>
                  <button className="bg-white hover:bg-blue-50 p-3 rounded-full shadow-lg border border-gray-200 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700 hover:text-blue-500" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-blue-600 ring-2 ring-blue-200 shadow-md' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Truck, text: "Fast Delivery", color: "blue" },
                { icon: Shield, text: "Secure", color: "green" },
                { icon: Award, text: "Quality", color: "yellow" },
                { icon: RefreshCw, text: "Easy Return", color: "purple" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <item.icon className={`h-6 w-6 mx-auto mb-2 text-${item.color}-600`} />
                  <p className="text-xs font-medium text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            {/* Category & Rating */}
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-1.5 font-medium">
                {product.category?.split('>')[0]?.trim()}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">4.8/5.0</span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">124 Reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-blue-600">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.2).toLocaleString()}
                </span>
                <Badge className="bg-green-500 text-white text-base px-3 py-1">
                  Save 20%
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes • Free shipping on orders above ₹5000</p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description || "High-quality product designed for your business needs. Built with premium materials and attention to detail."}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Truck, title: "Fast Delivery", desc: "2-3 business days", color: "blue" },
                  { icon: Shield, title: "Quality Assured", desc: "100% genuine", color: "green" },
                  { icon: Star, title: "Top Rated", desc: "4.8/5 rating", color: "yellow" },
                  { icon: Clock, title: "24/7 Support", desc: "Always available", color: "purple" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className={`p-2 rounded-lg bg-${feature.color}-50`}>
                      <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{feature.title}</p>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock & Cart Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Stock</p>
                  <p className={`text-2xl font-bold ${product.stock > 10 ? "text-green-600" : "text-orange-600"}`}>
                    {product.stock} units
                  </p>
                </div>
                {getCartQuantity() > 0 && (
                  <Badge className="bg-green-100 text-green-700 text-base px-4 py-2">
                    {getCartQuantity()} in cart
                  </Badge>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">Select Quantity</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-12 w-12 rounded-lg border-2"
                  >
                    <span className="text-xl">−</span>
                  </Button>
                  <span className="text-3xl font-bold text-gray-900 w-20 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="h-12 w-12 rounded-lg border-2"
                  >
                    <span className="text-xl">+</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                variant="outline"
                className="flex-1 h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-400 text-lg font-semibold rounded-xl"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold disabled:bg-gray-400 rounded-xl shadow-lg"
              >
                Buy Now
              </Button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-xs text-gray-600">Above ₹5000</p>
                </div>
                <div>
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% Safe</p>
                </div>
                <div>
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">24/7 Support</p>
                  <p className="text-xs text-gray-600">Always Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
