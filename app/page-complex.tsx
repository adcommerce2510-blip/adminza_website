import { Header } from "@/components/header"
import { BannerSlider } from "@/components/banner-slider"
import { DynamicCategoriesSection } from "@/components/dynamic-categories-section"
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
import { AnimatedWrapper, StaggeredContainer } from "@/components/animated-wrapper"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Banner Slider */}
        <BannerSlider />

        {/* Categories Section */}
        <DynamicCategoriesSection />

        {/* Why Choose Us Section */}
        <section className="pt-2 pb-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedWrapper animation="fade-in-up">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <AnimatedWrapper animation="fade-in" delay={200}>
                  <Badge className="mb-4" variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Why Choose Adminza
                  </Badge>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={400}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Trusted <span className="gradient-text bg-clip-text text-transparent" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)', WebkitBackgroundClip: 'text'}}>Business Partner</span>
                  </h2>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={600}>
                  <p className="text-lg text-muted-foreground">
                    We provide comprehensive business solutions with verified vendors, competitive pricing, and exceptional service quality.
                  </p>
                </AnimatedWrapper>
              </div>
            </AnimatedWrapper>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={150}>
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Vendors",
                  description: "All vendors are thoroughly verified and certified to ensure quality and reliability.",
                  color: "text-blue-600",
                  bgImage: "/office-stationery-bundle.jpg",
                  bgGradient: "from-blue-500/20 to-blue-600/10"
                },
                {
                  icon: TrendingUp,
                  title: "Competitive Pricing",
                  description: "Get the best deals with transparent pricing and no hidden charges.",
                  color: "text-green-600",
                  bgImage: "/modern-office-desk-setup.jpg",
                  bgGradient: "from-green-500/20 to-green-600/10"
                },
                {
                  icon: Zap,
                  title: "Fast Delivery",
                  description: "Quick turnaround time with pan-India delivery network and tracking.",
                  color: "text-orange-600",
                  bgImage: "/desk-organizer-set.jpg",
                  bgGradient: "from-orange-500/20 to-orange-600/10"
                },
                {
                  icon: Users,
                  title: "Expert Support",
                  description: "24/7 dedicated customer support to assist you at every step.",
                  color: "text-purple-600",
                  bgImage: "/it-network-setup-office.jpg",
                  bgGradient: "from-purple-500/20 to-purple-600/10"
                },
                {
                  icon: CheckCircle2,
                  title: "Quality Assurance",
                  description: "Rigorous quality checks to ensure you get the best products and services.",
                  color: "text-red-600",
                  bgImage: "/corporate-branding-materials.jpg",
                  bgGradient: "from-red-500/20 to-red-600/10"
                },
                {
                  icon: Award,
                  title: "Trusted by 1000+",
                  description: "Join thousands of satisfied businesses across India.",
                  color: "text-indigo-600",
                  bgImage: "/large-format-printing-banners.jpg",
                  bgGradient: "from-indigo-500/20 to-indigo-600/10"
                }
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer overflow-hidden h-[280px] relative feature-card-premium">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-85 hover:opacity-75 transition-all duration-300`}></div>
                    
                    {/* Content */}
                    <CardContent className="relative z-10 h-full p-8 flex flex-col justify-between">
                      <div>
                        <div className={`w-20 h-20 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center mb-8 hover-bounce feature-icon-premium shadow-lg`}>
                          <feature.icon className={`w-10 h-10 text-white drop-shadow-lg`} />
                        </div>
                        <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-xl feature-title-premium leading-tight">{feature.title}</h3>
                        <p className="text-white text-base leading-relaxed drop-shadow-lg font-medium">{feature.description}</p>
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/30 rounded-full animate-pulse shadow-lg"></div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedWrapper animation="fade-in-down">
              <div className="text-center max-w-4xl mx-auto mb-20">
                <AnimatedWrapper animation="scale-in" delay={200}>
                  <Badge className="mb-6 px-4 py-2 text-white font-semibold rounded-full hover-bounce how-it-works-badge" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Simple Process
                  </Badge>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={400}>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    How It <span className="gradient-text bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
                  </h2>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={600}>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    Getting started with Adminza is quick and easy. Follow these simple steps.
                  </p>
                </AnimatedWrapper>
              </div>
            </AnimatedWrapper>

            <StaggeredContainer className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto" staggerDelay={200}>
              {[
                {
                  step: "01",
                  title: "Browse Categories",
                  description: "Explore our wide range of products and services across 50+ categories.",
                  icon: "🔍"
                },
                {
                  step: "02",
                  title: "Select & Compare",
                  description: "Compare vendors, check reviews, and choose the best option for your needs.",
                  icon: "⚖️"
                },
                {
                  step: "03",
                  title: "Place Order",
                  description: "Add to cart, review your order, and proceed with secure payment.",
                  icon: "🛒"
                },
                {
                  step: "04",
                  title: "Get Delivered",
                  description: "Receive your order with tracking updates and quality assurance.",
                  icon: "🚚"
                }
              ].map((step, index) => (
                <div key={index} className="relative how-it-works-step">
                  <div className="text-center relative">
                    {/* Step number circle */}
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl how-it-works-circle relative overflow-hidden" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                      <span className="relative z-10">{step.step}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Step title */}
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 how-it-works-title">{step.title}</h3>
                    
                    {/* Step description */}
                    <p className="text-slate-600 leading-relaxed text-base font-medium how-it-works-description">{step.description}</p>
                    
                    {/* Decorative icon */}
                    <div className="mt-6 text-3xl opacity-20 hover-bounce">{step.icon}</div>
                  </div>
                  
                  {/* Connecting line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-[75%] w-[50%] h-1 rounded-full opacity-40 how-it-works-line" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                      <div className="absolute inset-0 rounded-full animate-pulse opacity-60" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}></div>
                    </div>
                  )}
                </div>
              ))}
            </StaggeredContainer>

            <AnimatedWrapper animation="fade-in-up" delay={800}>
              <div className="text-center mt-16">
                <Link href="/categories">
                  <Button size="lg" className="text-xl px-12 py-6 rounded-2xl text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 how-it-works-button" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                    Get Started Now
                    <ArrowRight className="ml-3 h-6 w-6 animate-bounce" />
                  </Button>
                </Link>
              </div>
            </AnimatedWrapper>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-20 w-40 h-40 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-primary/3 to-accent/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedWrapper animation="fade-in-down">
              <div className="text-center max-w-4xl mx-auto mb-20">
                <AnimatedWrapper animation="scale-in" delay={200}>
                  <Badge className="mb-6 px-4 py-2 text-white font-semibold rounded-full hover-bounce testimonials-badge" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}>
                    <Star className="w-4 h-4 mr-2" />
                    Testimonials
                  </Badge>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={400}>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    What Our <span className="gradient-text bg-clip-text text-transparent" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)', WebkitBackgroundClip: 'text'}}>Customers Say</span>
                  </h2>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in-up" delay={600}>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    Don't just take our word for it. Here's what businesses across India say about us.
                  </p>
                </AnimatedWrapper>
              </div>
            </AnimatedWrapper>

            <StaggeredContainer className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto" staggerDelay={200}>
              {[
                {
                  name: "Rajesh Kumar",
                  company: "Tech Solutions Pvt Ltd",
                  review: "Adminza has been a game-changer for our office supply needs. The quality and service are exceptional!",
                  rating: 5,
                  avatar: "👨‍💼"
                },
                {
                  name: "Priya Sharma",
                  company: "Creative Agency",
                  review: "From furniture to IT solutions, everything we need is available at competitive prices. Highly recommended!",
                  rating: 5,
                  avatar: "👩‍💻"
                },
                {
                  name: "Amit Patel",
                  company: "Manufacturing Co",
                  review: "The vendor network is excellent and the customer support team is always ready to help. Great experience!",
                  rating: 5,
                  avatar: "👨‍🏭"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] cursor-pointer overflow-hidden testimonials-card">
                  <CardContent className="p-8 relative">
                    {/* Background decorative pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-bl-3xl"></div>
                    
                    {/* Quote icon */}
                    <div className="w-16 h-16 text-primary/20 mb-6 testimonials-quote">
                      <Quote className="w-full h-full" />
                    </div>
                    
                    {/* Star rating */}
                    <div className="flex mb-6 testimonials-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 hover-bounce" style={{animationDelay: `${i * 0.1}s`}} />
                      ))}
                    </div>
                    
                    {/* Review text */}
                    <p className="text-slate-700 mb-8 italic text-lg leading-relaxed font-medium testimonials-review">"{testimonial.review}"</p>
                    
                    {/* Customer info */}
                    <div className="border-t border-slate-200 pt-6 flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-2xl mr-4 testimonials-avatar">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg testimonials-name">{testimonial.name}</p>
                        <p className="text-slate-600 font-medium testimonials-company">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    {/* Decorative corner element */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredContainer>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
