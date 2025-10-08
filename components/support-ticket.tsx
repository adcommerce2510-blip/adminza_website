"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Ticket, CheckCircle } from "lucide-react"

export function SupportTicket() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="glass-effect border-2 border-success/20">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-success">Ticket Created Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Your ticket #ADZ-2024-001 has been created. We'll respond within 4 hours.
          </p>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            High Priority
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Ticket className="h-6 w-6 text-primary" />
          <span>Create Support Ticket</span>
        </CardTitle>
        <p className="text-muted-foreground">Submit a detailed support request and we'll get back to you quickly.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name *</label>
              <Input placeholder="Your full name" required className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email *</label>
              <Input type="email" placeholder="your@email.com" required className="rounded-xl" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Order ID (if applicable)</label>
            <Input placeholder="ADZ-2024-001" className="rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order-issue">Order Issue</SelectItem>
                  <SelectItem value="payment">Payment Problem</SelectItem>
                  <SelectItem value="product-defect">Product Defect</SelectItem>
                  <SelectItem value="delivery">Delivery Issue</SelectItem>
                  <SelectItem value="account">Account Problem</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priority *</label>
              <Select required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Subject *</label>
            <Input placeholder="Brief description of the issue" required className="rounded-xl" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              placeholder="Please provide detailed information about your issue..."
              required
              className="min-h-32 rounded-xl"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-xl hover-lift">
            Create Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
