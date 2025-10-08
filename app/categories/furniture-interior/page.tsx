import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const furnitureProducts = [
  {
    id: 501,
    name: "Ergonomic Executive Office Chair",
    category: "Office Chairs",
    price: 18000,
    originalPrice: 22000,
    rating: 4.8,
    reviews: 345,
    vendor: "ErgoComfort India",
    image: "/ergonomic-office-chair.png",
    badge: "Best Seller",
    inStock: true,
    stock: 67,
    type: "product" as const,
  },
  {
    id: 502,
    name: "Modern Office Desk - L-Shape",
    category: "Office Desks",
    price: 25000,
    originalPrice: 30000,
    rating: 4.7,
    reviews: 234,
    vendor: "ModernOffice Solutions",
    image: "/modern-office-desk-setup.jpg",
    badge: "Popular",
    inStock: true,
    stock: 45,
    type: "product" as const,
  },
  {
    id: 503,
    name: "Complete Office Fit-out & Interior",
    category: "Fit-outs & Interiors",
    price: 250000,
    rating: 4.9,
    reviews: 89,
    vendor: "InteriorPro Designs",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 504,
    name: "Modular Workstation Set (4 Person)",
    category: "Workstations",
    price: 85000,
    originalPrice: 95000,
    rating: 4.8,
    reviews: 167,
    vendor: "WorkSpace Solutions",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 28,
    type: "product" as const,
  },
  {
    id: 505,
    name: "Steel Storage Rack System",
    category: "Racks & Shelves",
    price: 15000,
    rating: 4.6,
    reviews: 234,
    vendor: "StorageMasters India",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 52,
    type: "product" as const,
  },
]

export default function FurnitureInteriorPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Office Furniture & Interior"
                description="Premium office furniture including ergonomic chairs, desks, workstations, storage solutions, and complete interior fit-out services for modern offices."
                products={furnitureProducts}
                categoryType="both"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}

