"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Package, Star, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  images?: string[]
  category: string
  stock: number
}

interface Service {
  _id: string
  name: string
  price: number
  description: string
  images?: string[]
  category: string
  duration?: string
  location?: string
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string[]
  
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "products" | "services">("all")
  const [categoryInfo, setCategoryInfo] = useState<any>(null)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true)
        
        // Parse the slug array to get category path
        const category = slug[0]
        const subcategory = slug[1] || null
        const subSubcategory = slug[2] || null
        
        // Build API URL based on the deepest level
        let productsUrl = `/api/products`
        let servicesUrl = `/api/services`
        
        if (subSubcategory) {
          // Level 2 category - filter by subSubcategory
          productsUrl += `?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&subSubcategory=${encodeURIComponent(subSubcategory)}`
          servicesUrl += `?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}&subSubcategory=${encodeURIComponent(subSubcategory)}`
        } else if (subcategory) {
          // Sub category - filter by subcategory (include main category for proper filtering)
          productsUrl += `?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
          servicesUrl += `?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
        } else {
          // Main category - filter by main category
          productsUrl += `?category=${encodeURIComponent(category)}`
          servicesUrl += `?category=${encodeURIComponent(category)}`
        }
        
        // Fetch products and services for this category
        console.log("Fetching from URLs:", productsUrl, servicesUrl)
        
        const [productsRes, servicesRes] = await Promise.all([
          fetch(productsUrl),
          fetch(servicesUrl)
        ])

        let productsData: Product[] = []
        let servicesData: Service[] = []

        if (productsRes.ok) {
          const productsResult = await productsRes.json()
          console.log("Products API result:", productsResult)
          productsData = productsResult.success ? productsResult.data : []
        } else {
          console.error("Products API error:", productsRes.status, productsRes.statusText)
        }

        if (servicesRes.ok) {
          const servicesResult = await servicesRes.json()
          console.log("Services API result:", servicesResult)
          servicesData = servicesResult.success ? servicesResult.data : []
        } else {
          console.error("Services API error:", servicesRes.status, servicesRes.statusText)
        }

        setProducts(productsData)
        setServices(servicesData)

        // Smart category routing logic - only redirect if we have a specific category type
        const shouldRedirect = (
          (slug.length === 1 && productsData.length === 0 && servicesData.length === 0) || // Main category with no items
          (slug.length === 3) // Level2 category (always redirect)
        )
        
        // For subcategories, always show the category page even if no items found
        // This allows users to see the category structure and add items

        console.log("Should redirect:", shouldRedirect)
        console.log("Slug length:", slug.length)
        console.log("Products data length:", productsData.length)
        console.log("Services data length:", servicesData.length)

        if (shouldRedirect) {
          // Only redirect for main categories, not subcategories
          if (slug.length === 1) {
            // Determine if this should go to products or services based on category type
            const categoryName = slug[0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            
            // Define service categories (categories that should go to services page)
            const serviceCategories = [
              'IT Support', 'Cleaning Solutions', 'Business Promotion', 'Office Support Solutions',
              'AMC Services', 'Corporate Gifting', 'Printing Solutions', 'Office Furniture Interior',
              'Cleaning Maintenance', 'IT Services', 'Business Services', 'Support Services',
              'Maintenance Services', 'Promotion Services', 'Gifting Services', 'Printing Services'
            ]
            
            // Check if category should go to services
            const isServiceCategory = serviceCategories.some(serviceCat => 
              categoryName.toLowerCase().includes(serviceCat.toLowerCase()) ||
              serviceCat.toLowerCase().includes(categoryName.toLowerCase())
            )
            
            // Redirect to appropriate page
            const targetPage = isServiceCategory ? 'services' : 'products'
            console.log("Redirecting to:", targetPage, "for category:", categoryName)
            router.push(`/${targetPage}?category=${encodeURIComponent(categoryName)}`)
            return
          }
        }

        // Set category info
        const displayName = subSubcategory 
          ? subSubcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : subcategory 
          ? subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          
        setCategoryInfo({
          name: displayName,
          slug: slug.join('/'),
          parentCategory: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          breadcrumbs: [
            { name: 'Home', href: '/' },
            { name: 'Categories', href: '/allcategories' },
            ...slug.map((part, index) => ({
              name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              href: `/categories/${slug.slice(0, index + 1).join('/')}`
            }))
          ]
        })

      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug && slug.length > 0) {
      fetchCategoryData()
    }
  }, [slug])

  // Filter items based on search and type
  const filteredItems = [...products, ...services].filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === "all" || 
                       (selectedType === "products" && products.some(p => p._id === item._id)) ||
                       (selectedType === "services" && services.some(s => s._id === item._id))
    
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading category...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">


        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products and services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="products">Products Only</SelectItem>
              <SelectItem value="services">Services Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No items found</h2>
            <p className="text-gray-600 mb-8">
              {products.length === 0 && services.length === 0
                ? "No products or services available in this category yet."
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
            {filteredItems.map((item) => {
              const isProduct = products.some(p => p._id === item._id)
              const detailUrl = isProduct ? `/products?id=${item._id}` : `/services?id=${item._id}`
              
              return (
                <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col relative z-0">
                  <Link href={detailUrl} className="flex flex-col h-full">
                    <CardContent className="p-0 flex flex-col h-full relative z-0">
                      {/* Image */}
                      <div className="w-full h-48 bg-gray-100 overflow-hidden relative flex-shrink-0 border border-gray-200" style={{ contain: 'layout style paint' }}>
                        {item.images && item.images.length > 0 ? (
                          <div className="w-full h-full relative overflow-hidden" style={{ contain: 'layout style paint' }}>
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              width={300}
                              height={192}
                              className="w-full h-full object-cover object-center"
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%',
                                objectFit: 'cover',
                                display: 'block'
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant={isProduct ? "default" : "secondary"}>
                            {isProduct ? "Product" : "Service"}
                          </Badge>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">4.5</span>
                            <span className="ml-1 text-xs text-gray-500">(150)</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.name}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Service specific info */}
                        {!isProduct && (
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            {item.duration && (
                              <div className="flex items-center mr-4">
                                <Clock className="h-4 w-4 mr-1" />
                                {item.duration}
                              </div>
                            )}
                            {item.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {item.location}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">
                            ₹{item.price.toLocaleString()}
                          </span>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {isProduct ? "Add to Cart" : "Place Enquiry"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Products
            </Button>
          </div>
        )}

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
