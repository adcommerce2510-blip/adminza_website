"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { NavigationDropdown } from "./navigation-dropdown"

const navigationData = [
  {
    title: "Office Stationery",
    subcategories: [
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
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b shadow-sm">
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3" />
                <span>support@adminza.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-xs">
              <span>Free shipping on orders above ₹5,000</span>
              <span>•</span>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover-lift">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div>
              <span className="text-2xl font-bold gradient-text">Adminza</span>
              <div className="text-xs text-muted-foreground -mt-1">Business Solutions</div>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for products, services, or vendors..."
                className="pl-12 pr-4 h-12 text-base border-2 border-border focus:border-primary transition-colors duration-200 rounded-xl"
              />
              <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg">
                Search
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex hover-lift rounded-xl">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift rounded-xl relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden hover-lift rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t bg-card">
        <div className="w-full px-4">
          <nav className="hidden lg:flex items-center justify-start space-x-0 h-16">
            {navigationData.map((item, index) => (
              <NavigationDropdown key={index} title={item.title} subcategories={item.subcategories} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
