"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

const PRODUCT_DETAILS = {
  1: {
    name: "ATRATAF",
    brand: "Anand Agro",
    category: "Herbicide",
    price: 450,
    image: "🧪",
    activeIngredient: "Atrazine 50% WP",
    registrationNo: "CIBRC/2023/001",
    targetCrops: ["Rice", "Maize", "Sugarcane"],
    targetPests: ["Parthenium", "Nut grass", "Broad leaf weeds"],
    pHI: 45,
    reEntryPeriod: 7,
    waterToxicity: 2,
    beeToxicity: 1,
    soilPersistence: 90,
    dosage: { min: 500, max: 1000, unit: "g/acre" },
    dilution: "1:500",
    spraysPerCrop: 2,
    description: "Premium herbicide for effective weed control in major crops",
    safetyEquipment: ["Gloves", "Mask", "Eye protection", "Full-sleeve clothing"],
  },
  2: {
    name: "ALL CLEAR",
    brand: "Anand Agro",
    category: "Fungicide",
    price: 520,
    image: "🧪",
    activeIngredient: "Carbendazim 50% WP",
    registrationNo: "CIBRC/2023/002",
    targetCrops: ["Wheat", "Barley", "Chickpea"],
    targetPests: ["Powdery mildew", "Leaf spot", "Rust"],
    pHI: 14,
    reEntryPeriod: 5,
    waterToxicity: 1,
    beeToxicity: 1,
    soilPersistence: 30,
    dosage: { min: 400, max: 800, unit: "ml/acre" },
    dilution: "1:500",
    spraysPerCrop: 3,
    description: "Broad-spectrum fungicide for disease control",
    safetyEquipment: ["Gloves", "Mask", "Eye protection"],
  },
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const product = PRODUCT_DETAILS[productId] || PRODUCT_DETAILS[1]
  const [fieldArea, setFieldArea] = useState(1)
  const [pestSeverity, setPestSeverity] = useState("Medium")

  const calculateDosage = () => {
    const baseAmount = (product.dosage.min + product.dosage.max) / 2
    const severityMultiplier = { Low: 0.7, Medium: 1, High: 1.3 }[pestSeverity] || 1
    return Math.round(baseAmount * fieldArea * severityMultiplier)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/products" className="flex items-center space-x-2 text-lime-600 hover:text-lime-700 mb-8 font-bold">
          <ChevronLeft size={20} />
          <span>Back to Products</span>
        </Link>

        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="h-80 bg-gradient-to-br from-lime-300 to-green-500 flex items-center justify-center text-8xl rounded-lg">
              {product.image}
            </div>

            {/* Basic Info */}
            <div>
              <h1 className="text-4xl font-bold text-teal-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">
                {product.brand} • {product.category}
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="bg-teal-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-teal-900 mb-4">Product Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Active Ingredient</p>
                    <p className="font-bold text-teal-900">{product.activeIngredient}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Registration No.</p>
                    <p className="font-bold text-teal-900">{product.registrationNo}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Price per Unit</p>
                    <p className="font-bold text-lime-600 text-xl">₹{product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pre-Harvest Interval</p>
                    <p className="font-bold text-teal-900">{product.pHI} days</p>
                  </div>
                </div>
              </div>

              {/* Target Crops & Pests */}
              <div className="mb-6">
                <h4 className="font-bold text-teal-900 mb-3">Target Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {product.targetCrops.map((crop) => (
                    <span key={crop} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-teal-900 mb-3">Target Pests/Diseases</h4>
                <div className="flex flex-wrap gap-2">
                  {product.targetPests.map((pest) => (
                    <span key={pest} className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-sm font-bold">
                      {pest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dosage Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">ML-Assisted Dosage Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Field Area (acres)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={fieldArea}
                onChange={(e) => setFieldArea(Number.parseFloat(e.target.value))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Pest Severity</label>
              <select
                value={pestSeverity}
                onChange={(e) => setPestSeverity(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Growth Stage</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none">
                <option>Seedling</option>
                <option>Vegetative</option>
                <option>Flowering</option>
                <option>Fruiting</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-lime-50 border-2 border-lime-400 rounded-lg p-6">
            <h3 className="font-bold text-teal-900 mb-4">Calculated Dosage</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Total Quantity Required</p>
                <p className="text-2xl font-bold text-lime-600">
                  {calculateDosage()} {product.dosage.unit}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Water Volume (approx)</p>
                <p className="text-2xl font-bold text-lime-600">
                  {Math.round(calculateDosage() / Number.parseInt(product.dilution.split(":")[1]))} L
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Number of Sprays</p>
                <p className="text-2xl font-bold text-lime-600">{product.spraysPerCrop}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Estimated Cost</p>
                <p className="text-2xl font-bold text-lime-600">
                  ₹{Math.round((calculateDosage() / 500) * product.price)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Compliance */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Safety & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-teal-900 mb-4">Environmental Impact Score</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Water Toxicity</span>
                    <span className="font-bold">{product.waterToxicity}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(product.waterToxicity / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Bee Toxicity</span>
                    <span className="font-bold">{product.beeToxicity}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(product.beeToxicity / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 mb-2">
                    Soil Persistence: <span className="font-bold">{product.soilPersistence} days</span>
                  </p>
                  <p className="text-sm text-gray-600">Time for degradation to 1% concentration</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-teal-900 mb-4">Safety Equipment Required</h3>
              <ul className="space-y-3">
                {product.safetyEquipment.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center text-teal-900 font-bold">
                      ✓
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="text-yellow-800 font-bold text-sm">
                  <strong>Re-entry Period:</strong> Wait at least {product.reEntryPeriod} days before workers enter the
                  field after application.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Guidelines */}
        <div className="bg-teal-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Application Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-teal-900 mb-2">Best Time to Spray</h3>
              <p className="text-gray-700">Early morning or late evening when temperatures are cooler</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-teal-900 mb-2">Weather Conditions</h3>
              <p className="text-gray-700">Avoid rain within 4 hours • No strong winds</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-teal-900 mb-2">Spray Interval</h3>
              <p className="text-gray-700">7-10 days between successive sprays</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
