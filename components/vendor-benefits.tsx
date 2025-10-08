import { Card, CardContent } from "@/components/ui/card"
import { Globe, CreditCard, BarChart3, Headphones, Shield, Zap, Users, Target } from "lucide-react"

const benefits = [
  {
    icon: Globe,
    title: "Nationwide Reach",
    description: "Access to businesses across India through our extensive network and marketing channels.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Fast and secure payment processing with multiple payment options for your customers.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive insights into your sales, customer behavior, and business performance.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated vendor support team to help you succeed and resolve any issues quickly.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Built-in verification system and dispute resolution to protect your business interests.",
  },
  {
    icon: Zap,
    title: "Easy Setup",
    description: "Quick onboarding process with step-by-step guidance to get you selling fast.",
  },
  {
    icon: Users,
    title: "B2B Focus",
    description: "Specialized platform designed specifically for business-to-business transactions.",
  },
  {
    icon: Target,
    title: "Marketing Tools",
    description: "Promotional features and marketing tools to help you reach the right customers.",
  },
]

export function VendorBenefits() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Adminza?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to grow your business and reach more customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon
            return (
              <Card key={benefit.title} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
