"use client"

import { useState } from "react"
import { Brain, AlertCircle, CheckCircle } from "lucide-react"

const CROPS = ["Rice", "Wheat", "Cotton", "Tomato", "Chili", "Sugarcane", "Maize", "Potato"]
const GROWTH_STAGES = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Maturity"]
const SEASONS = ["Kharif", "Rabi", "Zaid"]
const DISTRICTS = ["Bangalore", "Mysore", "Belgaum", "Hubballi", "Kolar", "Mandya"]

const SYMPTOM_CATEGORIES = {
  "Leaf Symptoms": ["Yellowing", "Holes", "Curling", "Spots", "Wilting"],
  "Stem Symptoms": ["Boring holes", "Lesions", "Rotting", "Discoloration"],
  "Fruit/Pod Symptoms": ["Spots", "Rotting", "Deformation", "Premature drop"],
  General: ["Stunted growth", "Wilting", "Weak growth"],
}

const ML_MODEL_PREDICTIONS = {
  "rice-yellowing-kharif": {
    pest: "Leaf Miner Attack",
    confidence: 92,
    scientific: "Hydrolechia indica",
    description: "Tiny larvae create blotch-like mines on leaves causing yellowing",
    recommendation: "SPRINT",
    confidence_product: 88,
    alternatives: ["ALL CLEAR", "CROP GUARD"],
  },
  "cotton-holes-kharif": {
    pest: "Bollworm Infestation",
    confidence: 85,
    scientific: "Helicoverpa armigera",
    description: "Larvae feed on buds and bolls, creating holes and structural damage",
    recommendation: "SPRINT",
    confidence_product: 90,
    alternatives: ["CROP GUARD", "INDOFIL"],
  },
  "wheat-spots-rabi": {
    pest: "Leaf Spot Disease",
    confidence: 88,
    scientific: "Bipolaris sorokiniana",
    description: "Fungal disease causing brown spots with concentric rings on leaves",
    recommendation: "ALL CLEAR",
    confidence_product: 92,
    alternatives: ["INDOFIL", "ATRATAF"],
  },
  "tomato-wilting-zaid": {
    pest: "Fusarium Wilt",
    confidence: 87,
    scientific: "Fusarium oxysporum",
    description: "Soil-borne fungus causing vascular blockage and wilting",
    recommendation: "INDOFIL",
    confidence_product: 89,
    alternatives: ["ALL CLEAR", "ATRATAF"],
  },
}

export default function SmartRecommendationPage() {
  const [crop, setCrop] = useState("Rice")
  const [growthStage, setGrowthStage] = useState("Vegetative")
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [location, setLocation] = useState("Bangalore")
  const [season, setSeason] = useState("Kharif")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleGetRecommendation = () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom")
      return
    }

    setLoading(true)
    setTimeout(() => {
      const key = `${crop.toLowerCase()}-${selectedSymptoms[0].toLowerCase()}-${season.toLowerCase()}`
      const prediction = ML_MODEL_PREDICTIONS[key] || ML_MODEL_PREDICTIONS["rice-yellowing-kharif"]

      setResult({
        ...prediction,
        symptoms: selectedSymptoms,
        crop,
        growthStage,
        location,
        season,
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4 flex items-center space-x-3">
          <Brain className="text-lime-500" size={40} />
          <span>Smart Pest Identification & Recommendation</span>
        </h1>
        <p className="text-gray-600 mb-12">AI-powered analysis to identify pests and get pesticide recommendations</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8 h-fit sticky top-20">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">Describe Your Problem</h2>

            <div className="space-y-6">
              {/* Crop Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Crop Type *</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                >
                  {CROPS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Growth Stage */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Growth Stage</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                >
                  {GROWTH_STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                >
                  {SEASONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGetRecommendation}
                disabled={loading || selectedSymptoms.length === 0}
                className="w-full bg-lime-400 text-teal-900 py-3 rounded-lg font-bold hover:bg-lime-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Brain size={20} />
                <span>{loading ? "Analyzing..." : "Get Recommendation"}</span>
              </button>
            </div>
          </div>

          {/* Symptoms Selection & Results */}
          <div className="lg:col-span-3">
            {/* Symptoms */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-teal-900 mb-6">Select Observed Symptoms *</h2>

              {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-bold text-teal-800 mb-3 text-lg">{category}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`p-3 rounded-lg font-bold transition text-left ${
                          selectedSymptoms.includes(symptom)
                            ? "bg-lime-400 text-teal-900"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {selectedSymptoms.length > 0 && (
                <div className="mt-6 p-4 bg-lime-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Selected symptoms:</strong> {selectedSymptoms.join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-6">
                {/* Diagnosis */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-lime-400">
                  <h2 className="text-2xl font-bold text-teal-900 mb-4 flex items-center space-x-2">
                    <CheckCircle className="text-green-500" size={28} />
                    <span>Diagnosis</span>
                  </h2>

                  <div className="mb-6 p-4 bg-teal-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-teal-900">{result.pest}</h3>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                        {result.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      <strong>Scientific Name:</strong> <em>{result.scientific}</em>
                    </p>
                    <p className="text-gray-700 mt-3">{result.description}</p>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-400">
                  <h2 className="text-2xl font-bold text-teal-900 mb-4">Recommended Product</h2>

                  <div className="bg-lime-50 p-6 rounded-lg mb-6 border-2 border-lime-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-teal-900">{result.recommendation}</h3>
                        <p className="text-gray-600">Primary recommendation</p>
                      </div>
                      <span className="text-5xl">🧪</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {result.confidence_product}% effective for this pest-crop-season combination
                    </p>
                  </div>

                  <h4 className="font-bold text-teal-900 mb-3">Alternative Options</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {result.alternatives.map((alt, i) => (
                      <div key={i} className="bg-gray-100 p-3 rounded-lg">
                        <p className="font-bold text-teal-900">{alt}</p>
                        <p className="text-gray-600 text-sm">{85 - i * 2}% effective</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Guidelines */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-400">
                  <h2 className="text-2xl font-bold text-teal-900 mb-4">Application Guidelines</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Dosage</p>
                      <p className="text-gray-700">500-1000 g/acre depending on severity</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Dilution Ratio</p>
                      <p className="text-gray-700">1:500 (Product : Water)</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Spray Interval</p>
                      <p className="text-gray-700">7-10 days between sprays</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Number of Sprays</p>
                      <p className="text-gray-700">2-3 sprays per crop cycle</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Best Time</p>
                      <p className="text-gray-700">Early morning or late evening</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-bold text-teal-900 mb-2">Weather Conditions</p>
                      <p className="text-gray-700">No rain for 4 hours after spray</p>
                    </div>
                  </div>
                </div>

                {/* Safety Precautions */}
                <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-400">
                  <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center space-x-2">
                    <AlertCircle size={28} />
                    <span>Safety Precautions</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-red-900 mb-3">Required PPE</p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>✓ Safety gloves</li>
                        <li>✓ Respiratory mask</li>
                        <li>✓ Eye protection</li>
                        <li>✓ Full-sleeve clothing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-red-900 mb-3">Important Notes</p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>✓ Pre-harvest interval: 45 days</li>
                        <li>✓ Re-entry period: 7 days</li>
                        <li>✓ Store in cool, dry place</li>
                        <li>✓ Keep away from children</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <Brain className="mx-auto mb-4 text-lime-500 opacity-50" size={48} />
                <p className="text-gray-600 text-lg">
                  Select symptoms and click "Get Recommendation" to see AI-powered analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
