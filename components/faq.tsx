"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "How do I place a bulk order?",
    answer:
      "You can place bulk orders by contacting our sales team directly or using our bulk order form. We offer special pricing for large quantities and can provide customized quotes based on your requirements.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept various payment methods including credit/debit cards, UPI, net banking, and bank transfers. For bulk orders, we also offer credit terms for verified businesses with NET 30/60 payment options.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "Yes, we provide professional installation services for IT equipment, office furniture, and other products that require setup. Our certified technicians ensure proper installation and configuration.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "We offer a 30-day return policy for most products. Items must be in original condition with packaging. For services, we provide satisfaction guarantee and will work to resolve any issues.",
  },
  {
    question: "How can I become a vendor on Adminza?",
    answer:
      "You can apply to become a vendor by filling out our vendor registration form. We review applications based on product quality, business credentials, and service capabilities. The approval process typically takes 5-7 business days.",
  },
  {
    question: "Do you offer AMC services?",
    answer:
      "Yes, we provide comprehensive Annual Maintenance Contracts (AMC) for IT equipment, office equipment, HVAC systems, and more. Our AMC services include regular maintenance, repairs, and technical support.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve businesses across India with our headquarters in Gurgaon. We have a network of vendors and service providers in major cities and can arrange services in most locations.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is confirmed, you'll receive a tracking number via email and SMS. You can track your order status in real-time through our website or mobile app.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our services and platform
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="rounded-xl hover-lift bg-transparent">
                Contact Support
              </Button>
              <Button className="rounded-xl hover-lift">Schedule a Call</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
