"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Wrench, Truck, Star, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const sliderImages = [
    "/slider1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg",
    "/slider5.jpg",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [sliderImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  return (
    <section className="relative overflow-hidden h-[600px] md:h-[700px]">
      {/* Image Slider Background */}
      <div className="absolute inset-0 w-full h-full">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slider ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ArrowRight className="w-6 h-6 text-white rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 py-12 h-full flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-30 w-full">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 fade-in border border-white/30">
              <Star className="w-4 h-4 mr-2" />
              India's Leading B2B Marketplace
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-4 fade-in text-white drop-shadow-lg">
              Your One-Stop <span className="text-primary-foreground">Business Solution</span> Hub
            </h1>
          </div>

          <p className="text-lg md:text-xl text-white/90 text-balance mb-8 max-w-3xl mx-auto leading-relaxed fade-in drop-shadow-md">
            From office essentials to enterprise solutions - discover everything your business needs with trusted
            vendors, competitive prices, and seamless service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 fade-in">
            <Link href="/categories">
              <Button
                size="lg"
                className="text-lg px-10 py-4 rounded-xl hover-lift shadow-lg text-white font-bold"
                style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)'}}
              >
                Explore Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/vendors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-4 rounded-xl hover-lift border-2 glass-effect bg-transparent"
              >
                Join as Vendor
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center group hover-lift fade-in">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/30">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white">500+</h3>
              <p className="text-white/90 font-medium text-sm">Verified Vendors</p>
            </div>

            <div className="flex flex-col items-center group hover-lift fade-in">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/30">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white">50+</h3>
              <p className="text-white/90 font-medium text-sm">Service Categories</p>
            </div>

            <div className="flex flex-col items-center group hover-lift fade-in">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/30">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1 text-white">24/7</h3>
              <p className="text-white/90 font-medium text-sm">Customer Support</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/30">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-2 text-white/80">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-medium">Pan-India Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Star className="h-5 w-5" />
                <span className="text-sm font-medium">Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
