"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { NavigationDropdown } from "./navigation-dropdown"
import { CartDropdown } from "./cart-dropdown"
import { useState, useRef } from "react"

const navigationData = [
  {
    title: "Office Stationery",
    href: "/office-stationery",
    subcategories: [
      { name: "View All Products", href: "/office-stationery" },
      { 
        name: "Paper Products & Writing Materials", 
        href: "/categories/office-stationery/paper-writing-materials",
        nested: [
          { name: "Copier Paper", href: "/categories/office-stationery/paper-writing-materials/copier-paper" },
          { name: "Writing Pads & Accessories", href: "/categories/office-stationery/paper-writing-materials/writing-pads" },
          { name: "Notebooks & Register", href: "/categories/office-stationery/paper-writing-materials/notebooks-register" },
          { name: "Sticky Note", href: "/categories/office-stationery/paper-writing-materials/sticky-note" },
        ]
      },
      { 
        name: "Files & Documents Holder", 
        href: "/categories/office-stationery/files-documents-holder",
        nested: [
          { name: "Files & Folders", href: "/categories/office-stationery/files-documents-holder/files-folders" },
          { name: "Clips & Fasteners", href: "/categories/office-stationery/files-documents-holder/clips-fasteners" },
          { name: "Box Files", href: "/categories/office-stationery/files-documents-holder/box-files" },
          { name: "Button Bag", href: "/categories/office-stationery/files-documents-holder/button-bag" },
          { name: "Card Holder", href: "/categories/office-stationery/files-documents-holder/card-holder" },
          { name: "Clip & Lamina File", href: "/categories/office-stationery/files-documents-holder/clip-lamina-file" },
          { name: "Display File", href: "/categories/office-stationery/files-documents-holder/display-file" },
          { name: "Document Bag", href: "/categories/office-stationery/files-documents-holder/document-bag" },
          { name: "Folder File", href: "/categories/office-stationery/files-documents-holder/folder-file" },
          { name: "Khadi Bag", href: "/categories/office-stationery/files-documents-holder/khadi-bag" },
          { name: "Lamina File", href: "/categories/office-stationery/files-documents-holder/lamina-file" },
          { name: "Office File", href: "/categories/office-stationery/files-documents-holder/office-file" },
          { name: "Plastic Folder", href: "/categories/office-stationery/files-documents-holder/plastic-folder" },
          { name: "Spring File", href: "/categories/office-stationery/files-documents-holder/spring-file" },
        ]
      },
      { 
        name: "Office Tools", 
        href: "/categories/office-stationery/office-tools",
        nested: [
          { name: "Cutting & Measuring", href: "/categories/office-stationery/office-tools/cutting-measuring" },
          { name: "Adhesives & Binding", href: "/categories/office-stationery/office-tools/adhesives-binding" },
          { name: "Stamping & Labeling", href: "/categories/office-stationery/office-tools/stamping-labeling" },
          { name: "Rubber Bands", href: "/categories/office-stationery/office-tools/rubber-bands" },
        ]
      },
      { 
        name: "Office Accessories & Desk Essentials", 
        href: "/categories/office-stationery/desk-essentials",
        nested: [
          { name: "Desk Organizers", href: "/categories/office-stationery/desk-essentials/desk-organizers" },
          { name: "Name Plate", href: "/categories/office-stationery/desk-essentials/name-plate" },
        ]
      },
      { 
        name: "Notice Boards & Accessories", 
        href: "/categories/office-stationery/notice-boards",
        nested: [
          { name: "Boards & Accessories", href: "/categories/office-stationery/notice-boards/boards-accessories" },
          { name: "Whiteboard Accessories", href: "/categories/office-stationery/notice-boards/whiteboard-accessories" },
        ]
      },
      { 
        name: "Tapes & Dispensers", 
        href: "/categories/office-stationery/tapes-dispensers",
        nested: [
          { name: "Thread", href: "/categories/office-stationery/tapes-dispensers/thread" },
          { name: "Correction Pen", href: "/categories/office-stationery/tapes-dispensers/correction-pen" },
        ]
      },
      { name: "Digital & Electronic Devices", href: "/categories/office-stationery/digital-electronic" },
      { name: "Office Hygiene & Maintenance", href: "/categories/office-stationery/hygiene-maintenance" },
      { name: "Stationery Sets & Miscellaneous", href: "/categories/office-stationery/sets-miscellaneous" },
    ],
  },
  {
    title: "IT Support",
    subcategories: [
      { 
        name: "Data Solutions", 
        href: "/categories/it-support/data-solutions",
        nested: [
          { name: "Cloud Service", href: "/categories/it-support/data-solutions/cloud-service" },
          { name: "Backup Solutions", href: "/categories/it-support/data-solutions/backup-solutions" },
        ]
      },
      { 
        name: "Network Solutions", 
        href: "/categories/it-support/network-solutions",
        nested: [
          { name: "Building Firewalls", href: "/categories/it-support/network-solutions/building-firewalls" },
        ]
      },
      { 
        name: "Network Security", 
        href: "/categories/it-support/network-security",
        nested: [
          { name: "Installing Antivirus", href: "/categories/it-support/network-security/installing-antivirus" },
        ]
      },
      { name: "Software & App Development", href: "/categories/it-support/software-app-development" },
      { name: "Hardware Installations", href: "/categories/it-support/hardware-installations" },
      { name: "LAN Support", href: "/categories/it-support/lan-support" },
      { name: "AMC for Laptop & Desktop", href: "/categories/it-support/amc-laptop-desktop" },
      { 
        name: "Safety System", 
        href: "/categories/it-support/safety-system",
        nested: [
          { name: "Pan Tilt & Zoom CCTV (PTZ)", href: "/categories/it-support/safety-system/ptz-cctv" },
          { name: "Infrared Night Version CCTV", href: "/categories/it-support/safety-system/infrared-night-cctv" },
          { name: "Dome CCTV", href: "/categories/it-support/safety-system/dome-cctv" },
          { name: "Bullet Camara CCTV", href: "/categories/it-support/safety-system/bullet-camera-cctv" },
          { name: "C Mount Surveillance Camaras", href: "/categories/it-support/safety-system/c-mount-cameras" },
          { name: "IP CCTV", href: "/categories/it-support/safety-system/ip-cctv" },
          { name: "Wireless CCTV", href: "/categories/it-support/safety-system/wireless-cctv" },
          { name: "Day & Night CCTV", href: "/categories/it-support/safety-system/day-night-cctv" },
        ]
      },
      { name: "Setting up of IT Structure", href: "/categories/it-support/it-structure-setup" },
    ],
  },
  {
    title: "Cleaning Solutions",
    subcategories: [
      { name: "Professional Premises Deep Cleaning", href: "/categories/cleaning-solutions/professional-deep-cleaning" },
      { name: "Carpet Shampooing", href: "/categories/cleaning-solutions/carpet-shampooing" },
      { name: "Chair Shampooing", href: "/categories/cleaning-solutions/chair-shampooing" },
      { name: "Marble Polishing", href: "/categories/cleaning-solutions/marble-polishing" },
      { name: "Floor Scrubbing", href: "/categories/cleaning-solutions/floor-scrubbing" },
      { name: "Cleaning Materials", href: "/categories/cleaning-solutions/cleaning-materials" },
    ],
  },
  {
    title: "Business Promotion",
    subcategories: [
      { name: "Email Promotions", href: "/categories/business-promotion/email-promotions" },
      { name: "Logo and Branding Solutions", href: "/categories/business-promotion/logo-branding" },
      { name: "Digital Marketing Solutions", href: "/categories/business-promotion/digital-marketing-solutions" },
      { name: "Website Design Solution", href: "/categories/business-promotion/website-design" },
      { name: "2D/3D Animation Videos", href: "/categories/business-promotion/animation-videos" },
    ],
  },
  {
    title: "Office Support Solutions",
    subcategories: [
      { 
        name: "Courier Service", 
        href: "/categories/office-support/courier-service",
        nested: [
          { name: "Local (Within Mumbai)", href: "/categories/office-support/courier-service/local-mumbai" },
          { name: "National (PAN India)", href: "/categories/office-support/courier-service/national" },
          { name: "International (USA, UK, UAE, Canada)", href: "/categories/office-support/courier-service/international" },
        ]
      },
      { 
        name: "Packaging & Premise Relocation Service", 
        href: "/categories/office-support/packaging-relocation",
        nested: [
          { name: "Relocation of office furniture & goods", href: "/categories/office-support/packaging-relocation/furniture-goods" },
          { name: "Relocation of Office Assets", href: "/categories/office-support/packaging-relocation/office-assets" },
        ]
      },
      { 
        name: "Office Beautification", 
        href: "/categories/office-support/office-beautification",
        nested: [
          { name: "Live/Artificial Plant Set-up", href: "/categories/office-support/office-beautification/plant-setup" },
          { name: "Wall Paintings/Portraits", href: "/categories/office-support/office-beautification/wall-paintings" },
          { name: "Artifacts", href: "/categories/office-support/office-beautification/artifacts" },
          { name: "Customised Wallpapers", href: "/categories/office-support/office-beautification/customised-wallpapers" },
          { name: "Odour Repellant Systems", href: "/categories/office-support/office-beautification/odour-repellant" },
          { name: "Customized Hand Painted Walls or Passageway", href: "/categories/office-support/office-beautification/hand-painted-walls" },
        ]
      },
      { 
        name: "Office Space", 
        href: "/categories/office-support/office-space",
        nested: [
          { name: "Rent (Commercial Premises)", href: "/categories/office-support/office-space/rent-commercial" },
          { name: "Buy & Sale (Office)", href: "/categories/office-support/office-space/buy-sale-office" },
          { name: "Co-Work Space", href: "/categories/office-support/office-space/cowork-space" },
        ]
      },
      { 
        name: "Corporate Gifting", 
        href: "/categories/office-support/corporate-gifting",
        nested: [
          { name: "Corporate Gifting", href: "/categories/office-support/corporate-gifting/corporate-gifting" },
          { name: "Client/Partner/Employee Appreciation", href: "/categories/office-support/corporate-gifting/appreciation" },
        ]
      },
    ],
  },
  {
    title: "Office Furniture & Interior",
    subcategories: [
      { name: "Office Chairs", href: "/categories/furniture-interior/office-chairs" },
      { name: "Fit-outs & Interiors", href: "/categories/furniture-interior/fitouts-interiors" },
      { 
        name: "Other Office Furniture", 
        href: "/categories/furniture-interior/other-furniture",
        nested: [
          { name: "Workstations", href: "/categories/furniture-interior/other-furniture/workstations" },
          { name: "Racks", href: "/categories/furniture-interior/other-furniture/racks" },
          { name: "Shelves", href: "/categories/furniture-interior/other-furniture/shelves" },
          { name: "Coffee Tables", href: "/categories/furniture-interior/other-furniture/coffee-tables" },
          { name: "Conference Tables", href: "/categories/furniture-interior/other-furniture/conference-tables" },
          { name: "File Cabinets", href: "/categories/furniture-interior/other-furniture/file-cabinets" },
          { name: "Refurbished Office Furniture", href: "/categories/furniture-interior/other-furniture/refurbished" },
        ]
      },
    ],
  },
  {
    title: "Printing Solutions",
    subcategories: [
      { name: "Sign Board Printing", href: "/categories/printing-solutions/sign-board-printing" },
      { name: "Pamphlet Printing", href: "/categories/printing-solutions/pamphlet-printing" },
      { name: "Visiting Card Printing", href: "/categories/printing-solutions/visiting-card-printing" },
      { name: "Letter Head Printing", href: "/categories/printing-solutions/letter-head-printing" },
      { name: "Brochure Printing", href: "/categories/printing-solutions/brochure-printing" },
      { name: "Label & Sticker Printing", href: "/categories/printing-solutions/label-sticker-printing" },
      { name: "Envelope Printing", href: "/categories/printing-solutions/envelope-printing" },
      { name: "Office Voucher", href: "/categories/printing-solutions/office-voucher" },
      { name: "Share Certificate", href: "/categories/printing-solutions/share-certificate" },
      { name: "Customised Files Printing", href: "/categories/printing-solutions/customised-files-printing" },
      { name: "Canopy", href: "/categories/printing-solutions/canopy" },
      { name: "Award Certificate", href: "/categories/printing-solutions/award-certificate" },
      { name: "Package Printing", href: "/categories/printing-solutions/package-printing" },
    ],
  },
  {
    title: "AMC Services",
    subcategories: [
      { name: "Plumbing Service", href: "/categories/amc-services/plumbing-service" },
      { name: "Carpentry Service", href: "/categories/amc-services/carpentry-service" },
      { name: "Electrician Service", href: "/categories/amc-services/electrician-service" },
      { name: "AC Servicing", href: "/categories/amc-services/ac-servicing" },
    ],
  },
  {
    title: "Corporate Gifting",
    subcategories: [
      { name: "Promotional Items", href: "/categories/corporate-gifting/promotional-items" },
      { name: "Custom Merchandise", href: "/categories/corporate-gifting/custom-merchandise" },
      { name: "Executive Gifts", href: "/categories/corporate-gifting/executive-gifts" },
      { name: "Employee Recognition", href: "/categories/corporate-gifting/employee-recognition" },
      { name: "Festival Gifts", href: "/categories/corporate-gifting/festival-gifts" },
    ],
  },
]

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <header className="sticky top-0 z-40 shadow-lg">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-primary/20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-primary">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <Mail className="h-4 w-4" />
                <span className="font-medium">support@adminza.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="font-medium">Free shipping on orders above ₹5,000</span>
              <span>•</span>
              <span className="font-medium">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
              <div className="w-32 h-32 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Adminza Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col items-start -ml-6">
                <span className="text-2xl font-bold bg-clip-text text-transparent" style={{background: 'linear-gradient(135deg, #000000 0%, #0300ff 100%)', WebkitBackgroundClip: 'text'}}>Adminza.in</span>
                <div className="text-xs text-gray-600 -mt-1">Business Solutions</div>
              </div>
            </Link>

          <div className="hidden md:flex flex-1 max-w-4xl mx-8">
              <div className="flex w-full items-center bg-white/15 backdrop-blur-sm rounded-2xl border-2 border-primary/30 overflow-hidden shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                  <Input
                    placeholder="Search for products, services, or vendors..."
                    className="pl-12 pr-4 h-12 text-base bg-transparent border-0 focus:ring-0 focus:outline-none w-full placeholder:text-gray-500"
                  />
                </div>
                <Button size="sm" className="rounded-l-none rounded-r-2xl px-6 h-12 text-sm font-medium flex-shrink-0">
                  Search
                </Button>
              </div>
            </div>

          <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              
              {/* Cart Button with Dropdown */}
              <div 
                className="cart-dropdown-container"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <Button 
                  ref={cartButtonRef}
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl relative"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center bg-red-500">
                    1
                  </span>
                </Button>
                
                <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} triggerRef={cartButtonRef} />
              </div>
              
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
        </div>
      </div>

      <div className="border-t bg-card relative overflow-visible">
        <div className="w-full px-4 overflow-visible">
          <nav className="hidden lg:flex items-center justify-start space-x-0 h-16 overflow-visible">
            {navigationData.map((item, index) => (
              <div key={index} className="relative overflow-visible">
                <NavigationDropdown title={item.title} subcategories={item.subcategories} />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
