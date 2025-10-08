import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const promotionServices = [
  {
    id: 301,
    name: "Email Marketing Campaign Package",
    category: "Email Promotions",
    price: 15000,
    originalPrice: 20000,
    rating: 4.7,
    reviews: 198,
    vendor: "DigitalReach India",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 302,
    name: "Complete Logo & Branding Package",
    category: "Branding",
    price: 25000,
    rating: 4.9,
    reviews: 267,
    vendor: "BrandCraft Studio",
    image: "/corporate-branding-materials.jpg",
    badge: "Premium",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 303,
    name: "Digital Marketing Solutions - Monthly",
    category: "Digital Marketing",
    price: 35000,
    originalPrice: 45000,
    rating: 4.8,
    reviews: 345,
    vendor: "MarketMinds Digital",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 304,
    name: "Professional Website Design & Development",
    category: "Web Design",
    price: 55000,
    rating: 4.9,
    reviews: 234,
    vendor: "WebCraft Studios",
    image: "/placeholder.jpg",
    badge: "Top Rated",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 305,
    name: "2D/3D Animation Video Production",
    category: "Video Production",
    price: 45000,
    rating: 4.8,
    reviews: 156,
    vendor: "AnimateX Studios",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
]

export default function BusinessPromotionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title="Business Promotion Services"
            description="Boost your business with our comprehensive marketing solutions including digital marketing, branding, website design, video production, and email campaigns."
            products={promotionServices}
            categoryType="service"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
