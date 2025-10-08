import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react"

export function VendorHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Grow Your Business with <span className="text-primary">Adminza</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Join thousands of vendors who trust Adminza to connect with businesses across India. Expand your reach and
            increase your revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              Start Selling Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Vendor Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">300%</h3>
              <p className="text-muted-foreground">Average Revenue Growth</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Active Business Customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">₹50L+</h3>
              <p className="text-muted-foreground">Monthly Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
