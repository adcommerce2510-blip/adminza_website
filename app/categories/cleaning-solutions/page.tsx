import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const cleaningServices = [
  {
    id: 201,
    name: "Professional Deep Cleaning Service",
    category: "Deep Cleaning",
    price: 12000,
    originalPrice: 15000,
    rating: 4.8,
    reviews: 256,
    vendor: "CleanPro Mumbai",
    image: "/office-cleaning.png",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 202,
    name: "Carpet Shampooing & Deep Cleaning",
    category: "Carpet Cleaning",
    price: 8000,
    rating: 4.7,
    reviews: 189,
    vendor: "CarpetCare Experts",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 203,
    name: "Office Chair Shampooing Service",
    category: "Furniture Cleaning",
    price: 5000,
    rating: 4.6,
    reviews: 145,
    vendor: "FurniCare Solutions",
    image: "/placeholder.jpg",
    badge: "Affordable",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 204,
    name: "Marble Polishing & Restoration",
    category: "Floor Care",
    price: 15000,
    originalPrice: 18000,
    rating: 4.9,
    reviews: 167,
    vendor: "MarbleMasters India",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 205,
    name: "Floor Scrubbing & Polishing",
    category: "Floor Care",
    price: 9000,
    rating: 4.7,
    reviews: 234,
    vendor: "FloorCare Pro",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
]

export default function CleaningSolutionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title="Cleaning Solutions"
            description="Professional cleaning services for offices and commercial spaces. From deep cleaning to carpet shampooing, marble polishing, and regular maintenance services."
            products={cleaningServices}
            categoryType="service"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
