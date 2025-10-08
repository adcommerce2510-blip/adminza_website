import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryPageTemplate } from "@/components/category-page-template"

const products = [
  {
    id: 1101,
    name: "Premium File Folders - Pack of 25",
    category: "Files & Folders",
    price: 850,
    originalPrice: 1000,
    rating: 4.8,
    reviews: 456,
    vendor: "FileMaster",
    image: "/placeholder.jpg",
    badge: "Best Seller",
    inStock: true,
    stock: 220,
    type: "product" as const,
  },
  {
    id: 1102,
    name: "Metal Paper Clips - 500 pcs",
    category: "Clips & Fasteners",
    price: 150,
    rating: 4.5,
    reviews: 789,
    vendor: "ClipPro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 680,
    type: "product" as const,
  },
  {
    id: 1103,
    name: "Box File - Heavy Duty",
    category: "Box Files",
    price: 450,
    rating: 4.7,
    reviews: 345,
    vendor: "BoxFile India",
    image: "/placeholder.jpg",
    badge: "Popular",
    inStock: true,
    stock: 195,
    type: "product" as const,
  },
  {
    id: 1104,
    name: "Transparent Document Bags - 10 Pack",
    category: "Document Bags",
    price: 320,
    rating: 4.6,
    reviews: 234,
    vendor: "DocuBag Pro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 310,
    type: "product" as const,
  },
  {
    id: 1105,
    name: "Display File - 40 Pockets",
    category: "Display Files",
    price: 280,
    originalPrice: 350,
    rating: 4.7,
    reviews: 423,
    vendor: "DisplayPro",
    image: "/placeholder.jpg",
    inStock: true,
    stock: 175,
    type: "product" as const,
  },
]

export default function FilesDocumentsHolderPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          
              <CategoryPageTemplate
                title="Files & Documents Holder"
                description="Complete range of file storage solutions including folders, box files, document bags, display files, and filing accessories."
                products={products}
                categoryType="product"
              />

        </div>
      </main>
      <Footer />
    </div>
  )
}


