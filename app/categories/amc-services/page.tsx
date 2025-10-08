import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const amcServices = [
  {
    id: 701,
    name: "Plumbing AMC - Annual Contract",
    category: "Plumbing Services",
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    reviews: 345,
    vendor: "PlumbPro Services",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 702,
    name: "Carpentry AMC - Annual Maintenance",
    category: "Carpentry Services",
    price: 12000,
    rating: 4.7,
    reviews: 267,
    vendor: "WoodCraft Masters",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 703,
    name: "Electrician AMC - Annual Contract",
    category: "Electrical Services",
    price: 18000,
    originalPrice: 22000,
    rating: 4.9,
    reviews: 456,
    vendor: "ElectroPro Solutions",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 704,
    name: "AC Servicing AMC - 4 Services/Year",
    category: "AC Maintenance",
    price: 8000,
    rating: 4.8,
    reviews: 589,
    vendor: "CoolCare Services",
    image: "/placeholder.jpg",
    badge: "Top Rated",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 705,
    name: "Complete Office AMC Package",
    category: "Comprehensive",
    price: 45000,
    originalPrice: 55000,
    rating: 4.9,
    reviews: 234,
    vendor: "OfficeCare Pro",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
]

export default function AMCServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title="AMC Services"
            description="Annual Maintenance Contract services for your office including plumbing, carpentry, electrical work, and AC servicing. Keep your office running smoothly all year round."
            products={amcServices}
            categoryType="service"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
