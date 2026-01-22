import { Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Anand Agro Agencies</h1>
          <p className="text-xl text-green-100">Transforming Agriculture Through Technology</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-lime-400">
              <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To empower farmers with AI-driven pest management solutions and quality pesticide products that increase
                crop yields, ensure food safety, and promote sustainable agriculture practices across India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-500">
              <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be India's leading pesticide company, recognized for technological innovation, farmer-centric
                solutions, and environmental responsibility in crop protection and agricultural sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-teal-900 mb-8">Company History</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-teal-900">
                1995
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-lg">Founded</h3>
                <p className="text-gray-700">
                  Anand Agro Agencies established as a regional pesticide distributor in Bangalore
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-teal-900">
                2010
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-lg">National Expansion</h3>
                <p className="text-gray-700">Expanded to 15 states with dedicated distribution network</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-teal-900">
                2020
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-lg">Digital Transformation</h3>
                <p className="text-gray-700">Launched mobile app and AI-powered pest identification system</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-teal-900">
                2024
              </div>
              <div>
                <h3 className="font-bold text-teal-900 text-lg">Smart Agro Platform Launch</h3>
                <p className="text-gray-700">Launched comprehensive platform with ML-powered recommendations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✓",
                title: "Quality First",
                desc: "Only government-approved, high-quality pesticides with proven efficacy",
              },
              {
                icon: "🤝",
                title: "Farmer-Centric",
                desc: "Solutions designed specifically for farmer needs and local conditions",
              },
              {
                icon: "🌍",
                title: "Sustainability",
                desc: "Commitment to environmentally responsible and safe pesticide practices",
              },
              {
                icon: "🔬",
                title: "Innovation",
                desc: "Continuous R&D in crop protection and agricultural technology",
              },
              {
                icon: "📞",
                title: "Customer Support",
                desc: "24/7 helpline and expert guidance for farmers",
              },
              {
                icon: "💼",
                title: "Transparency",
                desc: "Open communication about product composition and safety data",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-lime-50 to-green-50 p-6 rounded-lg border-2 border-lime-300"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-bold text-teal-900 mb-2">{value.title}</h3>
                <p className="text-gray-700 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-teal-900 mb-8">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mr. Rajesh Kumar", role: "Founder & CEO", exp: "30+ years in agriculture" },
              { name: "Ms. Priya Sharma", role: "Head of Product", exp: "15 years in agricultural tech" },
              { name: "Mr. Amit Patel", role: "Chief Technology Officer", exp: "12 years in AI/ML" },
            ].map((person, i) => (
              <div key={i} className="bg-teal-50 p-6 rounded-lg text-center border-b-4 border-lime-400">
                <div className="text-5xl mb-4">👤</div>
                <h3 className="font-bold text-lg text-teal-900 mb-1">{person.name}</h3>
                <p className="text-lime-600 font-bold mb-2">{person.role}</p>
                <p className="text-gray-700 text-sm">{person.exp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Awards */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center flex items-center justify-center space-x-2">
            <Award size={32} className="text-lime-500" />
            <span>Certifications & Awards</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { cert: "CIB&RC Approval", desc: "All pesticides registered with Government of India" },
              { cert: "ISO 9001:2015", desc: "Quality Management System Certification" },
              { cert: "ISO 14001:2015", desc: "Environmental Management Certification" },
              { cert: "Best Agricultural Innovation Award 2023", desc: "National Recognition for AI-powered platform" },
            ].map((award, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-lime-100 to-green-100 p-6 rounded-lg border-l-4 border-lime-500"
              >
                <h3 className="font-bold text-teal-900 mb-2">{award.cert}</h3>
                <p className="text-gray-700">{award.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Distribution Network */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-teal-900 mb-8 flex items-center space-x-2">
            <Globe size={32} className="text-teal-700" />
            <span>Distribution Network</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-teal-50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-lime-600 mb-2">28</p>
              <p className="text-gray-700">States Covered</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-lime-600 mb-2">500+</p>
              <p className="text-gray-700">Dealer Network</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-lg">
              <p className="text-4xl font-bold text-lime-600 mb-2">2M+</p>
              <p className="text-gray-700">Farmers Served</p>
            </div>
          </div>

          <p className="text-gray-700 mt-8 text-center">
            Our strong distribution network ensures farmers have easy access to quality pesticides and expert guidance
            across rural and urban areas.
          </p>
        </section>
      </div>
    </div>
  )
}
