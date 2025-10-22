export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            At Adminza.in, we strive to provide the best products and services. 
            However, if you're not satisfied with your purchase, we offer a comprehensive refund policy.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Eligibility</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Products must be returned within 7 days of delivery</li>
            <li>Items must be in original condition and packaging</li>
            <li>Custom orders and personalized items are not eligible for refunds</li>
            <li>Services are refundable only if not yet rendered</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Process</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>Contact our customer support team</li>
            <li>Provide order details and reason for return</li>
            <li>Receive return authorization and instructions</li>
            <li>Ship the item back to us</li>
            <li>Receive refund within 5-7 business days</li>
          </ol>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For refund requests, please contact us at:
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
