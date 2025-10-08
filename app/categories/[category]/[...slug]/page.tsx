import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const sampleProducts = [
  {
    id: 9501,
    name: "Sample Service 1",
    category: "Services",
    price: 5000,
    rating: 4.5,
    reviews: 150,
    vendor: "Service Provider",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
  {
    id: 9502,
    name: "Sample Service 2",
    category: "Services",
    price: 7500,
    rating: 4.6,
    reviews: 200,
    vendor: "Service Provider",
    image: "/placeholder.jpg",
    inStock: true,
    type: "service" as const,
  },
]

export default function CategorySlugPage({ 
  params 
}: { 
  params: { category: string; slug: string[] } 
}) {
  const categoryName = params.category.replace(/-/g, " ")
  const subCategoryName = params.slug.join(" / ").replace(/-/g, " ")
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <CategoryPageTemplate
            title={subCategoryName.charAt(0).toUpperCase() + subCategoryName.slice(1)}
            description={`Explore our ${categoryName} - ${subCategoryName} offerings for your business needs.`}
            products={sampleProducts}
            categoryType="both"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
