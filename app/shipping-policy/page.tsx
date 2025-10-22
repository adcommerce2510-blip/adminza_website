export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            We provide reliable and efficient shipping services to ensure your orders 
            reach you in perfect condition and on time.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Free shipping on orders above ₹5,000</li>
            <li>Standard delivery: 2-3 business days</li>
            <li>Express delivery: 1-2 business days (additional charges apply)</li>
            <li>Same-day delivery available in select cities</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery Areas</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We deliver to all major cities across India. For remote locations, 
            delivery may take additional time.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Once your order is shipped, you will receive a tracking number via SMS and email. 
            You can track your order status in real-time.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For shipping inquiries, please contact us at:
            <br />
            Email: support@adminza.com
            <br />
            Phone: +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  )
}
