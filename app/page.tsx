import { Header } from "@/components/header"
import { BannerSlider } from "@/components/banner-slider"
import { CategoriesSection } from "@/components/categories-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap, 
  Award,
  ArrowRight,
  Star,
  Quote
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Banner Slider */}
        <BannerSlider />

        {/* Categories Section */}
        <CategoriesSection />

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4" variant="outline">
                <Award className="w-4 h-4 mr-2" />
                Why Choose Adminza
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted <span className="gradient-text">Business Partner</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We provide comprehensive business solutions with verified vendors, competitive pricing, and exceptional service quality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Vendors",
                  description: "All vendors are thoroughly verified and certified to ensure quality and reliability.",
                  color: "text-blue-600"
                },
                {
                  icon: TrendingUp,
                  title: "Competitive Pricing",
                  description: "Get the best deals with transparent pricing and no hidden charges.",
                  color: "text-green-600"
                },
                {
                  icon: Zap,
                  title: "Fast Delivery",
                  description: "Quick turnaround time with pan-India delivery network and tracking.",
                  color: "text-orange-600"
                },
                {
                  icon: Users,
                  title: "Expert Support",
                  description: "24/7 dedicated customer support to assist you at every step.",
                  color: "text-purple-600"
                },
                {
                  icon: CheckCircle2,
                  title: "Quality Assurance",
                  description: "Rigorous quality checks to ensure you get the best products and services.",
                  color: "text-red-600"
                },
                {
                  icon: Award,
                  title: "Trusted by 1000+",
                  description: "Join thousands of satisfied businesses across India.",
                  color: "text-indigo-600"
                }
              ].map((feature, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}/20 to-${feature.color}/10 flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4" variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Simple Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Getting started with Adminza is quick and easy. Follow these simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Browse Categories",
                  description: "Explore our wide range of products and services across 50+ categories."
                },
                {
                  step: "02",
                  title: "Select & Compare",
                  description: "Compare vendors, check reviews, and choose the best option for your needs."
                },
                {
                  step: "03",
                  title: "Place Order",
                  description: "Add to cart, review your order, and proceed with secure payment."
                },
                {
                  step: "04",
                  title: "Get Delivered",
                  description: "Receive your order with tracking updates and quality assurance."
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-accent opacity-30" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/categories">
                <Button size="lg" className="text-lg px-10 py-4 rounded-xl">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4" variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Our <span className="gradient-text">Customers Say</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't just take our word for it. Here's what businesses across India say about us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Rajesh Kumar",
                  company: "Tech Solutions Pvt Ltd",
                  review: "Adminza has been a game-changer for our office supply needs. The quality and service are exceptional!",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  company: "Creative Agency",
                  review: "From furniture to IT solutions, everything we need is available at competitive prices. Highly recommended!",
                  rating: 5
                },
                {
                  name: "Amit Patel",
                  company: "Manufacturing Co",
                  review: "The vendor network is excellent and the customer support team is always ready to help. Great experience!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.review}"</p>
                    <div className="border-t pt-4">
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-10 opacity-90">
                Join thousands of businesses already using Adminza for their office needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/categories">
                  <Button size="lg" variant="secondary" className="text-lg px-10 py-4 rounded-xl">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-4 rounded-xl bg-white/10 border-white/30 hover:bg-white/20 text-white">
                    Become a Vendor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
