import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, ArrowRight, TrendingUp } from "lucide-react"

const popularArticles = [
  {
    title: "How to Place Your First Order",
    category: "Getting Started",
    views: "2.5k views",
    badge: "Popular",
  },
  {
    title: "Understanding Our Payment Options",
    category: "Payments",
    views: "1.8k views",
    badge: "Updated",
  },
  {
    title: "Vendor Registration Process",
    category: "Vendors",
    views: "1.2k views",
    badge: "New",
  },
  {
    title: "Bulk Order Discounts",
    category: "Orders",
    views: "980 views",
    badge: "Popular",
  },
  {
    title: "AMC Service Guidelines",
    category: "Services",
    views: "750 views",
    badge: "Updated",
  },
]

const categories = [
  { name: "Getting Started", count: 25 },
  { name: "Orders & Payments", count: 18 },
  { name: "Vendor Guide", count: 15 },
  { name: "Technical Support", count: 22 },
  { name: "Account Management", count: 12 },
  { name: "Policies", count: 8 },
]

export function KnowledgeBase() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Knowledge Base</span>
          </CardTitle>
          <p className="text-muted-foreground">Search our comprehensive help articles and guides.</p>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search for help articles..." className="pl-10 rounded-xl" />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>Popular Articles</span>
            </h4>

            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div className="flex-1">
                  <h5 className="font-medium group-hover:text-primary transition-colors">{article.title}</h5>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">{article.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{article.views}</span>
                    <Badge variant="secondary" className="text-xs">
                      {article.badge}
                    </Badge>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category, index) => (
              <Button key={index} variant="ghost" className="justify-between h-auto p-4 rounded-xl hover:bg-muted/50">
                <span className="font-medium">{category.name}</span>
                <Badge variant="outline">{category.count} articles</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
