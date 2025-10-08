import { SupportCategories } from "@/components/support-categories"
import { SupportTicket } from "@/components/support-ticket"
import { KnowledgeBase } from "@/components/knowledge-base"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              24/7 Support Available
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">How Can We Help You Today?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get instant help with our comprehensive support resources or connect with our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <SupportCategories />

      {/* Support Ticket and Knowledge Base */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <SupportTicket />
            <KnowledgeBase />
          </div>
        </div>
      </section>
    </div>
  )
}
