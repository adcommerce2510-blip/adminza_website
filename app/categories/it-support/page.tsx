import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const itSupportServices = [
  {
    id: 101,
    name: "Cloud Service Setup & Management",
    category: "Data Solutions",
    price: 35000,
    originalPrice: 45000,
    rating: 4.8,
    reviews: 145,
    vendor: "TechPro Services",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 102,
    name: "Complete Network Infrastructure Setup",
    category: "Network Solutions",
    price: 85000,
    rating: 4.9,
    reviews: 89,
    vendor: "NetworkMasters India",
    image: "/it-network-setup-office.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 103,
    name: "Enterprise Firewall Installation",
    category: "Network Security",
    price: 55000,
    rating: 4.7,
    reviews: 67,
    vendor: "SecureNet Solutions",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 104,
    name: "Custom Software Development",
    category: "Software & App Development",
    price: 125000,
    rating: 4.9,
    reviews: 234,
    vendor: "CodeCraft Studios",
    image: "/placeholder.jpg",
    badge: "Top Rated",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 105,
    name: "Server Installation & Configuration",
    category: "Hardware Installations",
    price: 45000,
    originalPrice: 55000,
    rating: 4.6,
    reviews: 98,
    vendor: "ServerPro India",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
]

export default function ITSupportPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title="IT Support & Network Solutions"
            description="Comprehensive IT solutions for your business including network setup, cybersecurity, software development, CCTV surveillance, and complete infrastructure management."
            products={itSupportServices}
            categoryType="service"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
