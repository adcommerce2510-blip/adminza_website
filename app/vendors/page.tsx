import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VendorHero } from "@/components/vendor-hero"
import { VendorBenefits } from "@/components/vendor-benefits"
import { VendorRegistrationForm } from "@/components/vendor-registration-form"

export default function VendorsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <VendorHero />
        <VendorBenefits />
        <VendorRegistrationForm />
      </main>
      <Footer />
    </div>
  )
}
