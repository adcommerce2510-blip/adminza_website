"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLElement>
}

export function CartDropdown({ isOpen, onClose, triggerRef }: CartDropdownProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Office Stationery Bundle",
      price: 214.29,
      quantity: 1,
      image: "/office-stationery-bundle.jpg"
    }
  ])

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, change: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  const [position, setPosition] = useState({ top: 0, right: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 60,
        right: window.innerWidth - rect.right + window.scrollX
      })
    }
  }, [isOpen, triggerRef])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && triggerRef?.current && !triggerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, triggerRef])

  if (!isOpen || !mounted) return null

  const dropdownContent = (
    <div 
      className="fixed w-80 bg-white border border-gray-200 rounded-lg shadow-xl"
      style={{
        top: `${position.top + 140}px`,
        right: position.right,
        width: '320px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '8px',
        zIndex: 999999
      }}
    >
      {/* Cart Items */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">{item.quantity} × ₹{item.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Cart Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{tax.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-bold">
                  <span>Grand Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                  View cart
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return createPortal(dropdownContent, document.body)
}
