"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Eye } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

interface Order {
  _id: string
  orderNo: string
  items: OrderItem[]
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
  shippingAddress: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
}

export default function MyOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const user = localStorage.getItem("user")
    
    if (!loggedIn || !user) {
      router.push("/")
      return
    }

    setIsLoggedIn(true)

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(user)
        const customerEmail = userData.email

        if (!customerEmail) {
          setLoading(false)
          return
        }

        const response = await fetch(`/api/orders`)
        if (response.ok) {
          const allOrders = await response.json()
          // Filter orders by customer email (more reliable than ID)
          const customerOrders = allOrders.filter((order: any) => {
            // Check if order belongs to this customer by email
            return order.customerEmail && 
                   order.customerEmail.toLowerCase() === customerEmail.toLowerCase()
          })
          setOrders(customerOrders)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Order Placed":
        return "secondary"
      case "Confirmed":
        return "default"
      case "Processing":
        return "default"
      case "Shipped":
        return "default"
      case "Delivered":
        return "default"
      case "Cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (!isLoggedIn) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">View and track all your orders</p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping now!</p>
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.orderNo}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Items</p>
                          <p className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Amount</p>
                          <p className="font-medium text-lg">₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Payment Status</p>
                          <Badge variant={order.paymentStatus === "Paid" ? "default" : "secondary"}>
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">Delivery Address</p>
                        <p className="text-sm">
                          {order.shippingAddress?.street ? `${order.shippingAddress.street}, ` : ''}
                          {order.shippingAddress?.city ? `${order.shippingAddress.city}, ` : ''}
                          {order.shippingAddress?.state || ''} - {order.shippingAddress?.zipCode || ''}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button
                        variant="outline"
                        onClick={() => viewOrderDetails(order)}
                        className="flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View Order Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-medium">#{selectedOrder.orderNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <Badge variant={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <Badge variant={selectedOrder.paymentStatus === "Paid" ? "default" : "secondary"}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
                  <p className="text-sm">
                    {selectedOrder.shippingAddress?.street ? `${selectedOrder.shippingAddress.street}, ` : ''}
                    {selectedOrder.shippingAddress?.city ? `${selectedOrder.shippingAddress.city}, ` : ''}
                    {selectedOrder.shippingAddress?.state || ''} - {selectedOrder.shippingAddress?.zipCode || ''}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Items</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        <p className="font-medium">₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
