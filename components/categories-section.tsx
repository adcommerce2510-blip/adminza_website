import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Monitor, Sparkles, Megaphone, Armchair, Printer, Settings, Gift, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Office Stationery",
    icon: FileText,
    description: "Complete range of office supplies and stationery items",
    gradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600",
    href: "/categories/office-stationery",
    items: "2,500+ Products",
  },
  {
    name: "IT Support & Network",
    icon: Monitor,
    description: "Hardware installations, cloud services, and network security",
    gradient: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-600",
    href: "/categories/it-support",
    items: "1,200+ Services",
  },
  {
    name: "Cleaning Solutions",
    icon: Sparkles,
    description: "Professional cleaning and premises maintenance services",
    gradient: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-600",
    href: "/categories/cleaning-solutions",
    items: "800+ Solutions",
  },
  {
    name: "Business Promotion",
    icon: Megaphone,
    description: "Branding solutions, marketing materials, and promotional items",
    gradient: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-600",
    href: "/categories/business-promotion",
    items: "1,500+ Options",
  },
  {
    name: "Office Furniture & Interior",
    icon: Armchair,
    description: "Modern furniture and complete interior fit-out solutions",
    gradient: "from-red-500/20 to-red-600/10",
    iconColor: "text-red-600",
    href: "/categories/furniture-interior",
    items: "3,000+ Items",
  },
  {
    name: "Printing Solutions",
    icon: Printer,
    description: "Professional printing services and custom signage solutions",
    gradient: "from-indigo-500/20 to-indigo-600/10",
    iconColor: "text-indigo-600",
    href: "/categories/printing-solutions",
    items: "900+ Services",
  },
  {
    name: "AMC Services",
    icon: Settings,
    description: "Annual maintenance contracts for all your business equipment",
    gradient: "from-teal-500/20 to-teal-600/10",
    iconColor: "text-teal-600",
    href: "/categories/amc-services",
    items: "600+ Contracts",
  },
  {
    name: "Corporate Gifting",
    icon: Gift,
    description: "Customized corporate gifts and employee recognition items",
    gradient: "from-pink-500/20 to-pink-600/10",
    iconColor: "text-pink-600",
    href: "/categories/corporate-gifting",
    items: "2,000+ Gifts",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Comprehensive Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Explore All Categories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of business solutions and services designed to meet all your enterprise
            needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group hover-lift cursor-pointer border-2 hover:border-primary/30 transition-all duration-300 h-full glass-effect hover:shadow-xl">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
                    </div>

                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                        {category.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>

                    <div className="text-sm font-medium text-primary/80">{category.items}</div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Can't find what you're looking for?</p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="rounded-xl hover-lift bg-transparent">
              Request Custom Solution
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
