"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Truck, Shield, Clock, Package, ChevronLeft, ChevronRight, Check } from "lucide-react"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-20">
            <Package className="h-32 w-32 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/allcategories" className="hover:text-blue-600">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail Card */}
        <Card className="overflow-hidden shadow-2xl border-2">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Product Images */}
            <div className="bg-white p-8">
              {/* Main Image */}
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <ShoppingCart className="h-32 w-32 text-gray-400" />
                )}
                
                {/* Stock Badge */}
                {product.stock > 0 ? (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 text-sm">
                    <Check className="h-4 w-4 mr-1 inline" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 text-sm">
                    Out of Stock
                  </Badge>
                )}

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'
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
              )}
            </div>

            {/* Right Side - Product Details */}
            <CardContent className="p-8 bg-white flex flex-col">
              {/* Category Badge */}
              <Badge variant="secondary" className="mb-4 w-fit text-sm px-3 py-1">
                {product.category?.split('>')[0]?.trim()}
              </Badge>

              {/* Product Name */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8/5.0 - 124 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-bold text-blue-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{Math.round(product.price * 1.2).toLocaleString()}
                  </span>
                  <Badge className="bg-green-100 text-green-700 text-sm">
                    Save 20%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "High-quality product designed for your business needs. Built with premium materials and attention to detail."}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-600">2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Quality Assured</p>
                    <p className="text-xs text-gray-600">100% genuine</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Top Rated</p>
                    <p className="text-xs text-gray-600">4.8/5 rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
                    <p className="text-xs text-gray-600">Always available</p>
                  </div>
                </div>
              </div>

              {/* Stock Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Available Stock:</span>
                  <span className={`text-lg font-bold ${product.stock > 10 ? "text-green-600" : "text-orange-600"}`}>
                    {product.stock} units
                  </span>
                </div>
                {getCartQuantity() > 0 && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t">
                    <span className="text-sm text-gray-700">In your cart:</span>
                    <Badge className="bg-green-100 text-green-700">
                      {getCartQuantity()} items
                    </Badge>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Quantity</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-12 w-12"
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold text-gray-900 w-16 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="h-12 w-12"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <Button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  variant="outline"
                  className="flex-1 h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-300 disabled:text-gray-400 text-lg font-semibold"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold disabled:bg-gray-400"
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Free Delivery</h3>
            <p className="text-sm text-gray-600">On orders above ₹5000</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% secure transactions</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Always here to help</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
