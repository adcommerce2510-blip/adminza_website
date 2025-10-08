import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const products = [
  {
    id: 1201,
    name: "Professional Scissors Set",
    category: "Cutting Tools",
    price: 350,
    rating: 4.7,
    reviews: 456,
    vendor: "ToolPro Office",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    stock: 285,
    type: "product" as const,
  },
  {
    id: 1202,
    name: "Heavy Duty Stapler with Staples",
    category: "Binding Tools",
    price: 650,
    originalPrice: 800,
    rating: 4.8,
    reviews: 567,
    vendor: "StapleMaster",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    stock: 195,
    type: "product" as const,
  },
  {
    id: 1203,
    name: "Paper Punch - 2 Hole",
    category: "Cutting & Measuring",
    price: 280,
    rating: 4.6,
    reviews: 423,
    vendor: "PunchPro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 340,
    type: "product" as const,
  },
  {
    id: 1204,
    name: "Glue Stick Pack of 12",
    category: "Adhesives",
    price: 240,
    rating: 4.5,
    reviews: 678,
    vendor: "GlueFix India",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 520,
    type: "product" as const,
  },
  {
    id: 1205,
    name: "Rubber Stamp Kit - Customizable",
    category: "Stamping Tools",
    price: 890,
    originalPrice: 1100,
    rating: 4.8,
    reviews: 234,
    vendor: "StampCraft",
    image: "/placeholder.jpg",
    badge: "Premium",
    inStock: true,
    stock: 145,
    type: "product" as const,
  },
]

export default function OfficeToolsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Office Tools"
                description="Essential office tools including scissors, staplers, punches, adhesives, binding materials, and stamping equipment."
                products={products}
                categoryType="product"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}


