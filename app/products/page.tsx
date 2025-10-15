"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield, Clock, Package, ChevronLeft, ChevronRight, Check, Heart, Share2, Award, RefreshCw, Info, Zap, TrendingUp } from "lucide-react"
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
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        setCartItems([])
      }
    }

    const fetchProduct = async () => {
      if (!productId) {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-8 text-xl text-gray-700 font-semibold">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-24">
            <Package className="h-40 w-40 text-gray-300 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-xl text-gray-600 mb-10">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Breadcrumb Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/allcategories" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Column - Images */}
          <div className="space-y-5">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
              <div className="aspect-square relative group">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-10"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <ShoppingCart className="h-32 w-32 text-gray-300" />
                  </div>
                )}
                
                {/* Stock Badge - Top Right */}
                <div className="absolute top-6 right-6 z-10">
                  {product.stock > 0 ? (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2.5 text-sm font-bold shadow-xl border-2 border-white">
                      <Check className="h-4 w-4 mr-1.5 inline" />
                      IN STOCK
                    </Badge>
                  ) : (
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-5 py-2.5 text-sm font-bold shadow-xl border-2 border-white">
                      OUT OF STOCK
                    </Badge>
                  )}
                </div>

                {/* Discount Badge - Top Left */}
                <div className="absolute top-6 left-6 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 text-sm font-bold shadow-xl border-2 border-white">
                    <TrendingUp className="h-4 w-4 mr-1.5 inline" />
                    SAVE 20%
                  </Badge>
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 p-3 rounded-full shadow-2xl border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-blue-50 p-3 rounded-full shadow-2xl border-2 border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Action Icons - Bottom Right */}
                <div className="absolute bottom-6 right-6 flex gap-3">
                  <button className="bg-white hover:bg-red-50 p-3.5 rounded-full shadow-xl border-2 border-gray-200 transition-all hover:scale-110">
                    <Heart className="h-5 w-5 text-red-500" />
                  </button>
                  <button className="bg-white hover:bg-blue-50 p-3.5 rounded-full shadow-xl border-2 border-gray-200 transition-all hover:scale-110">
                    <Share2 className="h-5 w-5 text-blue-500" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 border-t-2">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all hover:scale-105 ${
                          selectedImage === index 
                            ? 'border-blue-600 ring-4 ring-blue-200 shadow-lg' 
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - ${index + 1}`}
                          width={96}
                          height={96}
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
                { icon: Truck, text: "Fast Shipping", color: "from-blue-500 to-blue-600" },
                { icon: Shield, text: "Secure", color: "from-green-500 to-emerald-600" },
                { icon: Award, text: "Premium", color: "from-yellow-500 to-orange-600" },
                { icon: RefreshCw, text: "Easy Return", color: "from-purple-500 to-indigo-600" }
              ].map((item, index) => (
                <div key={index} className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
                  <item.icon className="h-7 w-7 mx-auto mb-2 text-white" />
                  <p className="text-xs font-bold text-white">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm px-5 py-2 font-bold border-2 border-blue-200">
              {product.category?.split('>')[0]?.trim()}
            </Badge>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg text-gray-700 font-bold">4.8/5.0</span>
              <span className="text-gray-400">|</span>
              <span className="text-base text-gray-600 font-medium">124 Reviews</span>
              <Badge className="bg-green-100 text-green-700 font-bold">Bestseller</Badge>
            </div>

            {/* Price Section - PROMINENT */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl border-2 border-blue-400">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white text-sm font-semibold mb-2 opacity-90">Special Price</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-extrabold text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-3xl text-blue-200 line-through">
                      ₹{Math.round(product.price * 1.2).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-white text-blue-600 text-xl px-6 py-3 font-extrabold shadow-lg mb-2">
                    20% OFF
                  </Badge>
                  <p className="text-white text-sm font-medium">You Save ₹{Math.round(product.price * 0.2).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>Inclusive of all taxes • Free shipping on orders above ₹5000</span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Key Highlights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Truck, title: "Fast Delivery", desc: "2-3 business days", color: "blue" },
                  { icon: Shield, title: "100% Genuine", desc: "Quality assured", color: "green" },
                  { icon: Star, title: "Top Rated", desc: "4.8/5 rating", color: "yellow" },
                  { icon: Clock, title: "24/7 Support", desc: "Always available", color: "purple" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                    <div className={`p-2.5 rounded-xl bg-${feature.color}-100`}>
                      <feature.icon className={`h-5 w-5 text-${feature.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.description || "High-quality product designed for your business needs. Built with premium materials and attention to detail."}
              </p>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 space-y-5">
              {/* Quantity */}
              <div>
                <label className="text-base font-bold text-gray-900 mb-3 block">Select Quantity</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-14 w-14 rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-xl font-bold"
                  >
                    −
                  </Button>
                  <span className="text-4xl font-extrabold text-blue-600 w-24 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="h-14 w-14 rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-xl font-bold"
                  >
                    +
                  </Button>
                  {getCartQuantity() > 0 && (
                    <Badge className="bg-green-100 text-green-700 text-base px-4 py-2 ml-auto">
                      {getCartQuantity()} in cart
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  variant="outline"
                  className="flex-1 h-16 border-3 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-400 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold disabled:bg-gray-400 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Stock Info - MOVED TO BOTTOM */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Available Stock</p>
                  <p className={`text-2xl font-extrabold ${product.stock > 10 ? "text-green-600" : "text-orange-600"}`}>
                    {product.stock} units remaining
                  </p>
                </div>
                <Package className="h-12 w-12 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
