export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Adminza.in is a comprehensive B2B marketplace specializing in office stationery, 
            corporate gifting, and business solutions. We are committed to providing high-quality 
            products and services to businesses of all sizes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our mission is to streamline business procurement processes and provide reliable 
            solutions for all your office needs. With years of experience in the industry, 
            we understand the unique requirements of modern businesses.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Quality assurance for all products</li>
            <li>Timely delivery and excellent customer service</li>
            <li>Competitive pricing and value for money</li>
            <li>Innovation in business solutions</li>
            <li>Environmental responsibility</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
