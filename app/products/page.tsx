"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield, Clock, Package, ChevronLeft, ChevronRight, Check, Minus, Plus } from "lucide-react"
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : []

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-6 py-3 max-w-7xl">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/allcategories" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 group">
              <div className="aspect-square relative">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart className="h-24 w-24 text-gray-300" />
                  </div>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div>
            {/* Category */}
            <p className="text-sm text-gray-600 mb-2">{product.category?.split('>')[0]?.trim()}</p>

            {/* Product Name */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8 (124 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-semibold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{Math.round(product.price * 1.2).toLocaleString()}
                </span>
                <span className="text-sm font-medium text-green-600">20% off</span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">In Stock ({product.stock} units available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About this product</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8 pb-8 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-600">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% safe & secure</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                    <p className="text-xs text-gray-600">Premium products</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">24/7 Support</p>
                    <p className="text-xs text-gray-600">Always available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-900 mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
                {getCartQuantity() > 0 && (
                  <span className="ml-auto text-sm text-gray-600">
                    {getCartQuantity()} in cart
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                variant="outline"
                className="flex-1 h-12 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
