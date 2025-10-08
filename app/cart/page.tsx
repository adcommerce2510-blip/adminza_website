import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCartComponent } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <ShoppingCartComponent />
        </div>
      </main>
      <Footer />
    </div>
  )
}
