export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Careers</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            Join our team at Adminza.in and be part of a dynamic company that's revolutionizing 
            the B2B marketplace for office supplies and business solutions.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Work With Us?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Competitive salary and benefits package</li>
            <li>Flexible working arrangements</li>
            <li>Opportunities for career growth</li>
            <li>Innovative and collaborative work environment</li>
            <li>Work-life balance initiatives</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are always looking for talented individuals to join our team. 
            Please send your resume to careers@adminza.com for consideration.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For career opportunities, please contact us at:
            <br />
            Email: careers@adminza.com
            <br />
            Phone: +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  )
}
