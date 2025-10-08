import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">Adminza</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted B2B marketplace for office infrastructure, IT services, and business solutions.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>B-427, Balaji Bhavan, Plot No.42A, Sector-11, CBD Belapur, Navi Mumbai 400614</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91-8433661506</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                <span>customercare@adminza.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Popular Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/it-support"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  IT Support
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/office-furniture"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Office Furniture
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/cleaning"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cleaning Services
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/printing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Printing & Signage
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Adminza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
