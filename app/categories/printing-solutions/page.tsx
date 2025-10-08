import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const printingServices = [
  {
    id: 601,
    name: "Sign Board Printing - LED/Acrylic",
    category: "Signage",
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    reviews: 234,
    vendor: "SignCraft India",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 602,
    name: "Pamphlet Printing (1000 pcs)",
    category: "Marketing Materials",
    price: 2500,
    rating: 4.6,
    reviews: 456,
    vendor: "PrintMasters Mumbai",
    image: "/placeholder.jpg",
    badge: "Budget Friendly",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 603,
    name: "Premium Visiting Card Printing",
    category: "Business Cards",
    price: 1500,
    rating: 4.7,
    reviews: 789,
    vendor: "CardPrint Pro",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 604,
    name: "Letter Head Printing (500 pcs)",
    category: "Corporate Stationery",
    price: 3500,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 345,
    vendor: "CorporatePrint India",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 605,
    name: "Brochure Design & Printing",
    category: "Marketing Materials",
    price: 8000,
    rating: 4.9,
    reviews: 234,
    vendor: "BrochureCraft Studios",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
]

export default function PrintingSolutionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Printing Solutions"
                description="Professional printing services for all your business needs including visiting cards, brochures, signage, letterheads, certificates, and large format printing."
                products={printingServices}
                categoryType="service"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}

