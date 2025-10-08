import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OfficeStationeryGrid } from "@/components/office-stationery-grid"

export default function OfficeStationeryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-3">Office Stationery</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Complete range of premium office stationery supplies for your business. 
              From pens and notebooks to desk organizers and filing solutions.
            </p>
          </div>

          <OfficeStationeryGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
