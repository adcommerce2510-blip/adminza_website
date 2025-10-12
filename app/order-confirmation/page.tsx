"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, CreditCard, ShoppingBag, Download, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
}

interface OrderData {
  id: string
  items: OrderItem[]
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    company: string
    gstNumber: string
    notes: string
  }
  checkoutType: "billing" | "quotation"
  totalAmount: number
  orderDate: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = searchParams.get("orderId")
    const orderType = searchParams.get("type")

    console.log("Order confirmation page - orderId:", orderId, "orderType:", orderType)

    if (orderId && orderId !== "undefined") {
      // In a real app, you would fetch the order from an API
      // For now, we'll get it from localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      console.log("Available orders in localStorage:", orders)
      
      const foundOrder = orders.find((o: OrderData) => o.id === orderId)
      console.log("Found order:", foundOrder)
      
      if (foundOrder) {
        setOrder(foundOrder)
      }
    } else {
      console.log("No valid orderId found in URL parameters")
    }
    
    setLoading(false)
  }, [searchParams])

  const downloadInvoice = () => {
    if (!order) return

    // Create a simple invoice HTML content
    const invoiceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .invoice-details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .total { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${order.checkoutType === "billing" ? "Invoice" : "Quotation Request"}</h1>
          <p>Order ID: ${order.id}</p>
          <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
        
        <div class="invoice-details">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${order.customerInfo.name}</p>
          <p><strong>Email:</strong> ${order.customerInfo.email}</p>
          <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
          <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city}, ${order.customerInfo.state} - ${order.customerInfo.zipCode}</p>
          ${order.customerInfo.company ? `<p><strong>Company:</strong> ${order.customerInfo.company}</p>` : ''}
          ${order.customerInfo.gstNumber ? `<p><strong>GST Number:</strong> ${order.customerInfo.gstNumber}</p>` : ''}
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>₹${(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="total">
              <td colspan="3">Total Amount</td>
              <td>₹${order.totalAmount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        ${order.customerInfo.notes ? `
          <div>
            <h3>Notes</h3>
            <p>${order.customerInfo.notes}</p>
          </div>
        ` : ''}
      </body>
      </html>
    `

    // Create and download the file
    const blob = new Blob([invoiceContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${order.id}-${order.checkoutType === "billing" ? "invoice" : "quotation"}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const sendEmailConfirmation = () => {
    if (!order) return
    
    const subject = encodeURIComponent(`${order.checkoutType === "billing" ? "Invoice" : "Quotation Request"} - ${order.id}`)
    const body = encodeURIComponent(`
Order ID: ${order.id}
Type: ${order.checkoutType === "billing" ? "Invoice" : "Quotation Request"}
Date: ${new Date(order.orderDate).toLocaleDateString()}

Customer: ${order.customerInfo.name}
Email: ${order.customerInfo.email}
Phone: ${order.customerInfo.phone}

Total Amount: ₹${order.totalAmount.toLocaleString()}

Items:
${order.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`).join('\n')}

${order.customerInfo.notes ? `Notes: ${order.customerInfo.notes}` : ''}
    `)
    
    window.open(`mailto:${order.customerInfo.email}?subject=${subject}&body=${body}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
  return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order not found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {order.checkoutType === "billing" ? "Order Confirmed!" : "Quotation Requested!"}
          </h1>
          <p className="text-gray-600">
            {order.checkoutType === "billing" 
              ? "Thank you for your purchase. Your order has been confirmed." 
              : "Thank you for your quotation request. We'll get back to you soon with a customized quote."
            }
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {order.checkoutType === "billing" ? (
                      <CreditCard className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                    <span>Order Details</span>
                  </CardTitle>
                  <Badge variant={order.checkoutType === "billing" ? "default" : "secondary"}>
                    {order.checkoutType === "billing" ? "Invoice" : "Quotation Request"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Customer Information</p>
                  <div className="mt-2 space-y-1">
                    <p><strong>{order.customerInfo.name}</strong></p>
                    <p>{order.customerInfo.email}</p>
                    <p>{order.customerInfo.phone}</p>
                    <p>{order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.zipCode}</p>
                    {order.customerInfo.company && <p>Company: {order.customerInfo.company}</p>}
                    {order.customerInfo.gstNumber && <p>GST: {order.customerInfo.gstNumber}</p>}
                  </div>
                </div>

                {order.customerInfo.notes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="mt-1">{order.customerInfo.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingBag className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        {item.category && (
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{order.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {order.checkoutType === "billing" ? "Payment completed" : "Quote requested"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={downloadInvoice}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {order.checkoutType === "billing" ? "Invoice" : "Quote"}
                </Button>
                
                <Button
                  onClick={sendEmailConfirmation}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Confirmation
                </Button>

                <Link href="/" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {order.checkoutType === "quotation" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Our team will review your quotation request</p>
                    <p>• We'll prepare a customized quote for your order</p>
                    <p>• You'll receive the quote via email within 24-48 hours</p>
                    <p>• You can then decide to proceed with the purchase</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}