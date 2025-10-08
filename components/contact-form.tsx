"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="glass-effect border-2 border-success/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-success">Message Sent Successfully!</h3>
          <p className="text-muted-foreground">Thank you for contacting us. We'll get back to you within 24 hours.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
        <p className="text-muted-foreground">Fill out the form below and we'll respond as soon as possible.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">First Name *</label>
              <Input placeholder="John" required className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Last Name *</label>
              <Input placeholder="Doe" required className="rounded-xl" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email Address *</label>
            <Input type="email" placeholder="john@company.com" required className="rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Phone Number</label>
            <Input type="tel" placeholder="+91 98765 43210" className="rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Company Name</label>
            <Input placeholder="Your Company Ltd." className="rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Inquiry Type *</label>
            <Select required>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="vendor">Vendor Partnership</SelectItem>
                <SelectItem value="bulk-order">Bulk Order</SelectItem>
                <SelectItem value="custom-solution">Custom Solution</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Message *</label>
            <Textarea
              placeholder="Tell us about your requirements or how we can help you..."
              required
              className="min-h-32 rounded-xl"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-xl hover-lift">
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
