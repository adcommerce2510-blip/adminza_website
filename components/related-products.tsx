import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart } from "lucide-react"

const relatedProducts = [
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 8500,
    rating: 4.7,
    image: "/ergonomic-office-chair.png",
  },
  {
    id: 3,
    name: "Desk Organizer Set",
    price: 1200,
    rating: 4.5,
    image: "/desk-organizer-set.jpg",
  },
  {
    id: 4,
    name: "LED Desk Lamp",
    price: 2500,
    rating: 4.8,
    image: "/led-desk-lamp-modern.jpg",
  },
  {
    id: 5,
    name: "Wireless Keyboard & Mouse",
    price: 3500,
    rating: 4.6,
    image: "/wireless-keyboard-mouse-set.jpg",
  },
]

export function RelatedProducts() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              <div className="flex items-center mb-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
