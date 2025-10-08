import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, FileText, Video, Users, ArrowRight } from "lucide-react"

const supportOptions = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-600",
    action: "Start Chat",
    available: "Available Now",
  },
  {
    title: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-600",
    action: "Call Now",
    available: "9 AM - 7 PM",
  },
  {
    title: "Email Support",
    description: "Send us detailed questions",
    icon: Mail,
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-600",
    action: "Send Email",
    available: "24 Hours Response",
  },
  {
    title: "Knowledge Base",
    description: "Browse our help articles",
    icon: FileText,
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-600",
    action: "Browse Articles",
    available: "500+ Articles",
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step guides",
    icon: Video,
    color: "from-red-500/20 to-red-600/10",
    iconColor: "text-red-600",
    action: "Watch Videos",
    available: "100+ Videos",
  },
  {
    title: "Community Forum",
    description: "Connect with other users",
    icon: Users,
    color: "from-teal-500/20 to-teal-600/10",
    iconColor: "text-teal-600",
    action: "Join Forum",
    available: "5000+ Members",
  },
]

export function SupportCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Support Channel</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multiple ways to get the help you need, when you need it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => {
            const IconComponent = option.icon
            return (
              <Card
                key={index}
                className="group hover-lift cursor-pointer border-2 hover:border-primary/30 transition-all duration-300 glass-effect"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className={`h-8 w-8 ${option.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{option.title}</h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{option.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary/80">{option.available}</span>
                  </div>

                  <Button className="w-full mt-6 rounded-xl hover-lift group-hover:shadow-lg">
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
