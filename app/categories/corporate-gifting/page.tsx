import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const giftingProducts = [
  {
    id: 801,
    name: "Premium Corporate Gift Hamper",
    category: "Gift Hampers",
    price: 5500,
    originalPrice: 7000,
    rating: 4.9,
    reviews: 456,
    vendor: "GiftCraft Corporate",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    stock: 125,
    type: "product" as const,
  },
  {
    id: 802,
    name: "Promotional Items - Branded Pens Set",
    category: "Promotional Items",
    price: 2500,
    rating: 4.6,
    reviews: 678,
    vendor: "PromoGifts India",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    stock: 250,
    type: "product" as const,
  },
  {
    id: 803,
    name: "Custom Merchandise - T-Shirts (50 pcs)",
    category: "Custom Merchandise",
    price: 15000,
    rating: 4.7,
    reviews: 234,
    vendor: "MerchPro Solutions",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 85,
    type: "product" as const,
  },
  {
    id: 804,
    name: "Executive Gift Set - Premium",
    category: "Executive Gifts",
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviews: 189,
    vendor: "LuxuryGifts India",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    stock: 45,
    type: "product" as const,
  },
  {
    id: 805,
    name: "Employee Recognition Trophy Set",
    category: "Employee Recognition",
    price: 3500,
    rating: 4.8,
    reviews: 345,
    vendor: "AwardCraft India",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 150,
    type: "product" as const,
  },
]

export default function CorporateGiftingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Corporate Gifting"
                description="Premium corporate gifts for employees, clients, and partners. Choose from promotional items, executive gifts, custom merchandise, and festival gift hampers."
                products={giftingProducts}
                categoryType="product"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}

