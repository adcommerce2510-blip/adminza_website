"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Edit, Trash2 } from "lucide-react"

const dashboardStats = [
  {
    title: "Total Products",
    value: "24",
    change: "+3 this month",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "156",
    change: "+12% from last month",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    title: "Revenue",
    value: "₹2,45,000",
    change: "+18% from last month",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Customers",
    value: "89",
    change: "+7 new customers",
    icon: Users,
    color: "text-orange-600",
  },
]

const recentProducts = [
  {
    id: 1,
    name: "Professional Office Desk Setup",
    category: "Office Furniture",
    price: 25000,
    status: "Active",
    orders: 12,
  },
  {
    id: 2,
    name: "Complete IT Network Setup",
    category: "IT Support",
    price: 45000,
    status: "Active",
    orders: 8,
  },
  {
    id: 3,
    name: "Corporate Branding Package",
    category: "Business Promotion",
    price: 15000,
    status: "Draft",
    orders: 0,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "ABC Technologies",
    product: "Office Desk Setup",
    amount: 25000,
    status: "Completed",
    date: "2025-01-15",
  },
  {
    id: "ORD-002",
    customer: "XYZ Solutions",
    product: "IT Network Setup",
    amount: 45000,
    status: "Processing",
    date: "2025-01-14",
  },
  {
    id: "ORD-003",
    customer: "PQR Enterprises",
    product: "Branding Package",
    amount: 15000,
    status: "Pending",
    date: "2025-01-13",
  },
]

export function VendorDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, ModernOffice Solutions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm font-medium">₹{product.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{product.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.product}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Products</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm font-medium">₹{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{order.id}</h4>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and reporting features will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
