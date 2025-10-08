import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { FAQ } from "@/components/faq"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">We're Here to Help Your Business Grow</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about our services? Need a custom solution? Our team of experts is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  )
}
