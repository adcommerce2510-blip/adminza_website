import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const products = [
  {
    id: 1001,
    name: "Premium A4 Copier Paper - 500 Sheets",
    category: "Copier Paper",
    price: 350,
    rating: 4.7,
    reviews: 567,
    vendor: "PaperPro India",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    stock: 450,
    type: "product" as const,
  },
  {
    id: 1002,
    name: "Writing Pads A4 - Pack of 10",
    category: "Writing Pads",
    price: 450,
    originalPrice: 600,
    rating: 4.6,
    reviews: 423,
    vendor: "WritePro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 280,
    type: "product" as const,
  },
  {
    id: 1003,
    name: "Notebooks & Register - Hardbound",
    category: "Notebooks",
    price: 250,
    rating: 4.8,
    reviews: 789,
    vendor: "NotebookCraft",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    stock: 520,
    type: "product" as const,
  },
  {
    id: 1004,
    name: "Sticky Notes Multi-Color Pack",
    category: "Sticky Notes",
    price: 349,
    rating: 4.6,
    reviews: 634,
    vendor: "StickyPro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 390,
    type: "product" as const,
  },
]

export default function PaperWritingMaterialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Paper Products & Writing Materials"
                description="Quality paper products including copier paper, writing pads, notebooks, and sticky notes for all your office needs."
                products={products}
                categoryType="product"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}


