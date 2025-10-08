import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Calendar, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

const orderDetails = {
  orderNumber: "ADZ-2025-001234",
  orderDate: "January 15, 2025",
  estimatedDelivery: "January 18-20, 2025",
  total: 82600,
  items: [
    {
      id: 1,
      name: "Professional Office Desk Setup",
      vendor: "ModernOffice Solutions",
      price: 25000,
      quantity: 1,
      image: "/modern-office-desk-setup.jpg",
    },
    {
      id: 2,
      name: "Complete IT Network Setup",
      vendor: "TechPro Services",
      price: 45000,
      quantity: 1,
      image: "/it-network-setup-office.jpg",
    },
  ],
}

export function OrderConfirmation() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">Thank you for your order. We'll send you a confirmation email shortly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{orderDetails.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{orderDetails.orderDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{orderDetails.estimatedDelivery}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">by {item.vendor}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">₹{item.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">ABC Technologies Pvt Ltd</p>
                <p>John Doe</p>
                <p>123 Business Park, Sector 15</p>
                <p>Navi Mumbai, Maharashtra 400614</p>
                <p>Phone: +91-9876543210</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹70,000</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹12,600</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{orderDetails.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Shipping</p>
                  <p className="text-sm text-muted-foreground">We'll notify you when shipped</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Delivery</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Link href="/categories">
              <Button variant="outline" className="w-full bg-transparent">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
