import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, Building2, Users } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Head Office</h4>
                <p className="text-muted-foreground">
                  123 Business District, Sector 18
                  <br />
                  Gurgaon, Haryana 122015
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone Numbers</h4>
                <p className="text-muted-foreground">
                  Sales: +91 98765 43210
                  <br />
                  Support: +91 98765 43211
                  <br />
                  Toll Free: 1800-123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email Addresses</h4>
                <p className="text-muted-foreground">
                  General: info@adminza.com
                  <br />
                  Sales: sales@adminza.com
                  <br />
                  Support: support@adminza.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Business Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 7:00 PM
                  <br />
                  Saturday: 10:00 AM - 5:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass-effect border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start rounded-xl hover-lift bg-transparent">
              <MessageCircle className="h-5 w-5 mr-3" />
              Start Live Chat
            </Button>

            <Button variant="outline" className="w-full justify-start rounded-xl hover-lift bg-transparent">
              <Headphones className="h-5 w-5 mr-3" />
              Schedule a Call
            </Button>

            <Button variant="outline" className="w-full justify-start rounded-xl hover-lift bg-transparent">
              <Building2 className="h-5 w-5 mr-3" />
              Request Site Visit
            </Button>

            <Button variant="outline" className="w-full justify-start rounded-xl hover-lift bg-transparent">
              <Users className="h-5 w-5 mr-3" />
              Book Demo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Support */}
      <Card className="glass-effect border-2 border-destructive/20 bg-destructive/5">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-2 text-destructive">Emergency Support</h3>
          <p className="text-sm text-muted-foreground mb-4">For urgent issues outside business hours</p>
          <Button variant="destructive" size="sm" className="rounded-xl">
            Call Emergency Line
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
