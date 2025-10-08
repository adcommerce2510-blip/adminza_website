import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <ProductDetails productId={params.id} />
          <RelatedProducts />
        </div>
      </main>
      <Footer />
    </div>
  )
}
