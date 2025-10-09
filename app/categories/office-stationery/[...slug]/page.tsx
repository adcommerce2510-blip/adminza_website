import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const sampleProducts = [
  {
    id: 9001,
    name: "Sample Product 1",
    category: "Office Stationery",
    price: 500,
    rating: 4.5,
    reviews: 150,
    vendor: "OfficeSupply Pro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 100,
    type: "product" as const,
  },
  {
    id: 9002,
    name: "Sample Product 2",
    category: "Office Stationery",
    price: 750,
    rating: 4.6,
    reviews: 200,
    vendor: "OfficeSupply Pro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 85,
    type: "product" as const,
  },
]

export default function OfficeStationerySlugPage({ params }: { params: { slug: string[] } }) {
  const categoryName = params.slug.join(" / ").replace(/-/g, " ")
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title={categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            description={`Explore our range of ${categoryName} products for your office needs.`}
            products={sampleProducts}
            categoryType="product"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
