"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  vendor: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  category: string
  type: "product" | "service"
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Professional Office Desk Setup",
    vendor: "ModernOffice Solutions",
    price: 25000,
    originalPrice: 30000,
    quantity: 1,
    image: "/modern-office-desk-setup.jpg",
    category: "Office Furniture",
    type: "product",
  },
  {
    id: 2,
    name: "Complete IT Network Setup",
    vendor: "TechPro Services",
    price: 45000,
    quantity: 1,
    image: "/it-network-setup-office.jpg",
    category: "IT Support",
    type: "service",
  },
  {
    id: 3,
    name: "Premium Stationery Bundle",
    vendor: "OfficeSupply Pro",
    price: 3500,
    quantity: 2,
    image: "/office-stationery-bundle.jpg",
    category: "Office Stationery",
    type: "product",
  },
]

export function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)
  const shipping = subtotal > 50000 ? 0 : 500
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link href="/categories">
            <Button size="lg">
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                        <Badge variant="outline" className="mt-1">
                          {item.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-muted"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x min-w-[60px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-muted"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        {item.type === "service" && <Badge variant="secondary">Service</Badge>}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{(item.originalPrice * item.quantity).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>You save</span>
                  <span>-₹{savings.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
