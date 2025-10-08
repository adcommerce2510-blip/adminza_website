"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Plus,
  Settings,
  Bell,
  LogOut,
} from "lucide-react"
import { useState } from "react"

const dashboardStats = [
  {
    title: "Total Revenue",
    value: "₹12,45,000",
    change: "+15% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8% from last month",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Active Vendors",
    value: "456",
    change: "+12 new vendors",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Total Products",
    value: "8,901",
    change: "+234 new products",
    icon: Package,
    color: "text-orange-600",
  },
]

const recentOrders = [
  {
    id: "ADZ-001234",
    customer: "ABC Technologies",
    vendor: "ModernOffice Solutions",
    amount: 25000,
    status: "Completed",
    date: "2025-01-15",
  },
  {
    id: "ADZ-001235",
    customer: "XYZ Solutions",
    vendor: "TechPro Services",
    amount: 45000,
    status: "Processing",
    date: "2025-01-14",
  },
  {
    id: "ADZ-001236",
    customer: "PQR Enterprises",
    vendor: "CleanPro Mumbai",
    amount: 8000,
    status: "Pending",
    date: "2025-01-13",
  },
  {
    id: "ADZ-001237",
    customer: "LMN Corp",
    vendor: "BrandCraft Studio",
    amount: 15000,
    status: "Shipped",
    date: "2025-01-12",
  },
]

const vendors = [
  {
    id: 1,
    name: "ModernOffice Solutions",
    email: "contact@modernoffice.com",
    category: "Office Furniture",
    products: 24,
    revenue: "₹2,45,000",
    status: "Active",
    joinDate: "2024-06-15",
  },
  {
    id: 2,
    name: "TechPro Services",
    email: "info@techpro.com",
    category: "IT Support",
    products: 18,
    revenue: "₹3,67,000",
    status: "Active",
    joinDate: "2024-05-20",
  },
  {
    id: 3,
    name: "CleanPro Mumbai",
    email: "hello@cleanpro.com",
    category: "Cleaning Services",
    products: 12,
    revenue: "₹1,89,000",
    status: "Pending",
    joinDate: "2024-07-10",
  },
]

const products = [
  {
    id: 1,
    name: "Professional Office Desk Setup",
    vendor: "ModernOffice Solutions",
    category: "Office Furniture",
    price: 25000,
    stock: 15,
    status: "Active",
    orders: 45,
  },
  {
    id: 2,
    name: "Complete IT Network Setup",
    vendor: "TechPro Services",
    category: "IT Support",
    price: 45000,
    stock: 8,
    status: "Active",
    orders: 23,
  },
  {
    id: 3,
    name: "Office Cleaning Service",
    vendor: "CleanPro Mumbai",
    category: "Cleaning Services",
    price: 8000,
    stock: 0,
    status: "Out of Stock",
    orders: 67,
  },
]

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Adminza Admin</span>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Package className="h-4 w-4 mr-2" />
            Products
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Vendors
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="h-4 w-4 mr-2" />
            Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
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
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Orders</CardTitle>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.vendor}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "secondary"
                                    : order.status === "Shipped"
                                      ? "outline"
                                      : "destructive"
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

                {/* Top Vendors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Vendors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vendors.slice(0, 3).map((vendor) => (
                        <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{vendor.name}</h4>
                            <p className="text-sm text-muted-foreground">{vendor.category}</p>
                            <p className="text-xs text-muted-foreground">{vendor.products} products</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{vendor.revenue}</p>
                            <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
                              {vendor.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Orders</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search orders..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.vendor}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "secondary"
                                    : order.status === "Shipped"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vendors" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Vendor Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search vendors..." className="pl-10 w-64" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vendor
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.email}</p>
                          <p className="text-sm text-muted-foreground">{vendor.category}</p>
                          <p className="text-xs text-muted-foreground">Joined: {vendor.joinDate}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">{vendor.products}</p>
                            <p className="text-xs text-muted-foreground">Products</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{vendor.revenue}</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                          <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
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

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Product Management</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search products..." className="pl-10 w-64" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="furniture">Office Furniture</SelectItem>
                          <SelectItem value="it">IT Support</SelectItem>
                          <SelectItem value="cleaning">Cleaning Services</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">by {product.vendor}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">₹{product.price.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Price</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{product.stock}</p>
                            <p className="text-xs text-muted-foreground">Stock</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{product.orders}</p>
                            <p className="text-xs text-muted-foreground">Orders</p>
                          </div>
                          <Badge
                            variant={
                              product.status === "Active"
                                ? "default"
                                : product.status === "Out of Stock"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {product.status}
                          </Badge>
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
          </Tabs>
        </main>
      </div>
    </div>
  )
}
