import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const products = [
  {
    id: 1301,
    name: "Premium Desk Organizer Set",
    category: "Desk Organizers",
    price: 1850,
    originalPrice: 2200,
    rating: 4.8,
    reviews: 345,
    vendor: "OrganizerPro",
    image: "/desk-organizer-set.jpg",
    badge: "Best Seller",
    inStock: true,
    stock: 85,
    type: "product" as const,
  },
  {
    id: 1302,
    name: "Wooden Desk Organizer - 5 Compartments",
    category: "Desk Organizers",
    price: 1250,
    rating: 4.7,
    reviews: 267,
    vendor: "WoodCraft Office",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    stock: 120,
    type: "product" as const,
  },
  {
    id: 1303,
    name: "Executive Name Plate - Acrylic",
    category: "Name Plates",
    price: 450,
    rating: 4.6,
    reviews: 456,
    vendor: "NameCraft India",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 230,
    type: "product" as const,
  },
  {
    id: 1304,
    name: "Metal Mesh Desk Organizer",
    category: "Desk Organizers",
    price: 980,
    originalPrice: 1200,
    rating: 4.7,
    reviews: 389,
    vendor: "MetalCraft Pro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 150,
    type: "product" as const,
  },
  {
    id: 1305,
    name: "Personalized Name Plate with Logo",
    category: "Name Plates",
    price: 650,
    rating: 4.9,
    reviews: 234,
    vendor: "CustomPlates India",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    stock: 95,
    type: "product" as const,
  },
]

export default function DeskEssentialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Office Accessories & Desk Essentials"
                description="Keep your desk organized with our range of desk organizers, name plates, and essential desk accessories for a productive workspace."
                products={products}
                categoryType="product"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}


