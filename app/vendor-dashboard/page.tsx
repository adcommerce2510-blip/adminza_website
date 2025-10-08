import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VendorDashboard } from "@/components/vendor-dashboard"

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <VendorDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
