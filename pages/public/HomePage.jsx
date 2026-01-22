import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Solutions for Crop Protection</h1>
            <p className="text-xl text-green-100 mb-8">
              AI-powered pest detection & pesticide recommendations for modern farming
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/smart-recommendation"
                className="bg-lime-400 text-teal-900 px-8 py-3 rounded-lg font-bold hover:bg-lime-300 transition flex items-center justify-center space-x-2"
              >
                <span>Find Pest Solution</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/products"
                className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center space-x-2"
              >
                <span>View Products</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Why Choose Anand Agro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📦", title: "Smart Product Catalog", desc: "Browse pesticides by crop, pest, or season" },
            { icon: "🧠", title: "AI Recommendation", desc: "Get AI-powered pesticide suggestions" },
            { icon: "⚠️", title: "Pest Prediction", desc: "Early warnings for pest risks in your region" },
            { icon: "📊", title: "Analytics", desc: "Real-time product availability tracking" },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-t-4 border-lime-400"
            >
              <div className="text-4xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-lg text-teal-900 mb-2">{card.title}</h3>
              <p className="text-gray-700">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: "1", title: "Enter Details", desc: "Crop type & pest symptoms" },
              { num: "2", title: "AI Analysis", desc: "ML model analyzes input" },
              { num: "3", title: "Get Recommendation", desc: "Optimal pesticide suggestion" },
              { num: "4", title: "Safe Usage", desc: "Safety guidelines & tips" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-lime-400 text-teal-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  {step.num}
                </div>
                <h3 className="font-bold mb-2 text-teal-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "ATRATAF", use: "Herbicide for Rice", price: "₹450" },
            { name: "ALL CLEAR", use: "Fungicide for Wheat", price: "₹520" },
            { name: "SPRINT", use: "Insecticide for Cotton", price: "₹680" },
            { name: "INDOFIL", use: "Fungicide for Vegetables", price: "₹490" },
          ].map((product, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-lime-300 to-green-500 flex items-center justify-center text-5xl">
                🧪
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-teal-900 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.use}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lime-600">{product.price}</span>
                  <Link to="/products" className="text-lime-500 hover:text-lime-700 text-sm font-bold">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">Trust & Quality</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✅", title: "Trusted Products", desc: "Quality assured, government-approved pesticides" },
              { icon: "🤖", title: "Data-Driven", desc: "ML-powered precision agriculture" },
              { icon: "🌍", title: "Safe & Compliant", desc: "Environmental safety and usage guidelines" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-teal-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
