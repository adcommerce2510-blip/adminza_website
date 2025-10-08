import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { SearchFilters } from "@/components/search-filters"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Categories</h1>
            <p className="text-muted-foreground">Browse our complete range of business products and services</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <CategoryFilter />
              <SearchFilters />
            </aside>
            <div className="flex-1">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
