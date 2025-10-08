import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const officeSupportServices = [
  {
    id: 401,
    name: "Local Courier Service (Mumbai)",
    category: "Courier Services",
    price: 500,
    rating: 4.6,
    reviews: 567,
    vendor: "FastCourier Mumbai",
    image: "/placeholder.jpg",
    badge: "Fast Delivery",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 402,
    name: "National Courier Service (PAN India)",
    category: "Courier Services",
    price: 1500,
    rating: 4.7,
    reviews: 445,
    vendor: "NationWide Express",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 403,
    name: "International Courier Service",
    category: "Courier Services",
    price: 5000,
    originalPrice: 6000,
    rating: 4.8,
    reviews: 234,
    vendor: "GlobalShip Express",
    image: "/placeholder.jpg",
    badge: "Reliable",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 404,
    name: "Complete Office Relocation Service",
    category: "Relocation Services",
    price: 35000,
    rating: 4.9,
    reviews: 156,
    vendor: "MoveIt Professionals",
    image: "/placeholder.jpg",
    badge: "Top Rated",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 405,
    name: "Office Beautification Package",
    category: "Office Beautification",
    price: 25000,
    originalPrice: 30000,
    rating: 4.8,
    reviews: 189,
    vendor: "DecorPro Solutions",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
]

export default function OfficeSupportPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Office Support Solutions"
                description="Comprehensive office support services including courier, relocation, office beautification, co-working spaces, and corporate gifting solutions."
                products={officeSupportServices}
                categoryType="both"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}

