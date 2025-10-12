"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ShoppingCart, Search, Package } from "lucide-react"
import Image from "next/image"

interface Service {
  _id: string
  name: string
  price: number
  description: string
  images?: string[]
  category: string
  stock: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Load services from database
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services?limit=1000") // Get all services
        if (response.ok) {
          const result = await response.json()
          
          // Handle both API response formats
          let servicesArray: Service[] = []
          
          if (result.success && Array.isArray(result.data)) {
            // New format: { success: true, data: [...], pagination: {...} }
            servicesArray = result.data
          } else if (Array.isArray(result)) {
            // Old format: [...]
            servicesArray = result
          }
          
          setServices(servicesArray)
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(servicesArray.map((s: Service) => {
            // Get the main category (before the first >)
            return s.category?.split('>')[0]?.trim() || 'Uncategorized'
          })))
          setCategories(uniqueCategories as string[])
        } else {
          setServices([])
        }
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()

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
  }, [])

  const addToCart = (service: Service) => {
    const existingItem = cartItems.find(item => item.id === service._id)
    
    if (existingItem) {
      // Update quantity
      const updatedItems = cartItems.map(item =>
        item.id === service._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedItems)
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    } else {
      // Add new item
      const newItems = [...cartItems, { 
        id: service._id,
        name: service.name,
        price: service.price,
        image: service.images?.[0],
        category: service.category,
        quantity: 1 
      }]
      setCartItems(newItems)
      localStorage.setItem("cart", JSON.stringify(newItems))
    }

    // Show success message
    alert(`${service.name} added to cart!`)
  }

  const getCartQuantity = (serviceId: string) => {
    const item = cartItems.find(item => item.id === serviceId)
    return item ? item.quantity : 0
  }

  // Filter services - ensure services is always an array
  const filteredServices = Array.isArray(services) ? services.filter((service) => {
    const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           service.category?.split('>')[0]?.trim() === selectedCategory
    return matchesSearch && matchesCategory
  }) : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of business services to support your company's growth and operations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredServices.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No services found</h2>
            <p className="text-gray-600 mb-8">
              {services.length === 0 
                ? "No services available yet. Check back soon!" 
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      {service.images && service.images.length > 0 ? (
                        <Image
                          src={service.images[0]}
                          alt={service.name}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingCart className="h-16 w-16 text-gray-400" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{service.category?.split('>')[0]?.trim()}</Badge>
                      <span className="text-2xl font-bold text-blue-600">
                        ₹{service.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <CardTitle className="text-xl mb-3">{service.name}</CardTitle>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Stock: <span className={service.stock > 10 ? "text-green-600" : "text-orange-600"}>
                          {service.stock} units
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {getCartQuantity(service._id) > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          In cart: {getCartQuantity(service._id)}
                        </span>
                      )}
                      
                      <Button
                        onClick={() => addToCart(service)}
                        disabled={service.stock === 0}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
                      >
                        <Plus className="h-4 w-4" />
                        <span>{service.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Results count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredServices.length} of {services.length} services
            </div>
          </>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
              <p className="text-gray-600 mb-4">
                {cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.location.href = '/cart'}
              >
                View Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
