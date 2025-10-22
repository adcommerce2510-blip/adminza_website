export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            This Privacy Policy describes how Adminza.in collects, uses, and protects your 
            personal information when you use our website and services.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Personal information (name, email, phone number)</li>
            <li>Business information (company name, GST number)</li>
            <li>Order and transaction details</li>
            <li>Website usage data and analytics</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>To process and fulfill your orders</li>
            <li>To provide customer support</li>
            <li>To improve our services</li>
            <li>To send important updates and notifications</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We implement appropriate security measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>
      </div>
    </div>
  )
}
