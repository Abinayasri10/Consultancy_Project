"use client"

import { useState } from "react"
import { BookOpen, AlertTriangle } from "lucide-react"

const TOP_PRODUCTS = [
  { crop: "Rice", product: "ATRATAF", rate: "94%", dosage: "250ml/acre", season: "Kharif" },
  { crop: "Cotton", product: "SPRINT", rate: "91%", dosage: "300ml/acre", season: "Kharif" },
  { crop: "Wheat", product: "ALL CLEAR", rate: "89%", dosage: "280ml/acre", season: "Rabi" },
  { crop: "Tomato", product: "INDOFIL", rate: "87%", dosage: "320ml/acre", season: "Zaid" },
]

const FARMER_MISTAKES = [
  {
    rank: 1,
    mistake: "Over-dosing pesticides",
    frequency: "42% of farmers",
    impact: "30-50% excess usage, economic loss, environmental damage",
    solution: "Use ML dosage calculator for precise calculations",
  },
  {
    rank: 2,
    mistake: "Ignoring pre-harvest interval",
    frequency: "38% of farmers",
    impact: "Pesticide residue in produce, market rejection risk",
    solution: "Check PHI for each product before harvesting",
  },
  {
    rank: 3,
    mistake: "Spraying during wrong weather",
    frequency: "35% of farmers",
    impact: "Rain within 4 hours reduces effectiveness, wastage",
    solution: "Check weather forecast before spraying",
  },
  {
    rank: 4,
    mistake: "Using expired pesticides",
    frequency: "28% of farmers",
    impact: "Reduced effectiveness, wasted money",
    solution: "Check expiry date and store properly",
  },
  {
    rank: 5,
    mistake: "Mixing incompatible products",
    frequency: "32% of farmers",
    impact: "Toxic reactions, crop damage, health hazards",
    solution: "Read labels carefully or consult experts",
  },
]

const IPM_LEVELS = [
  {
    level: "Level 1: Cultural Practices",
    practices: ["Crop rotation", "Field sanitation", "Resistant varieties", "Timely planting"],
  },
  {
    level: "Level 2: Biological Control",
    practices: ["Natural predators", "Parasitoids", "Entomopathogenic fungi", "Beneficial insects"],
  },
  {
    level: "Level 3: Mechanical Control",
    practices: ["Manual picking", "Traps", "Netting", "Physical barriers"],
  },
  {
    level: "Level 4: Chemical Control",
    practices: ["Pesticides (last resort)", "Targeted application", "Minimal dosage", "Safe handling"],
  },
]

const SEASONAL_ADVISORY = {
  Kharif: {
    title: "Monsoon Season Advisory",
    watchPests: ["Stem Borer", "Leaf Folder", "BPH", "Fungal diseases"],
    preparations: "Use disease-resistant varieties, ensure drainage, monitor humidity",
    advice:
      "High humidity favors pest and disease development. Monitor fields regularly. Maintain proper spacing for air circulation.",
  },
  Rabi: {
    title: "Winter Season Advisory",
    watchPests: ["Aphids", "Powdery Mildew", "Leaf Spot", "Cutworms"],
    preparations: "Deep plowing, field hygiene, residue management",
    advice:
      "Cool weather favors certain pests. Implement cultural practices. Spray as preventive measure when infestation is low.",
  },
  Zaid: {
    title: "Summer Season Advisory",
    watchPests: ["Whitefly", "Spider Mites", "Mealybugs", "Sunscald"],
    preparations: "Adequate irrigation, mulching, shade management",
    advice: "High temperatures stress crops, making them susceptible. Ensure timely irrigation and regular monitoring.",
  },
}

export default function KnowledgeHubPage() {
  const [selectedSeason, setSelectedSeason] = useState("Kharif")
  const [expandedMistake, setExpandedMistake] = useState(null)
  const [expandedIPMLevel, setExpandedIPMLevel] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4 flex items-center space-x-3">
          <BookOpen className="text-lime-500" size={40} />
          <span>Knowledge Hub</span>
        </h1>
        <p className="text-gray-600 mb-12">Data-driven insights for better farming decisions</p>

        {/* Best Pesticides by Crop */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Best Pesticides by Crop (Data-Driven)</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b-2 border-teal-900">
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Crop</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Most Effective Product</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Success Rate</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Avg. Dosage</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Recommended Season</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-teal-50">
                    <td className="px-4 py-3 font-bold text-teal-900">{row.crop}</td>
                    <td className="px-4 py-3 text-gray-700">{row.product}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: row.rate }}></div>
                        </div>
                        <span className="font-bold text-green-600">{row.rate}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.dosage}</td>
                    <td className="px-4 py-3 text-gray-700 font-bold">{row.season}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Farmer Mistakes */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center space-x-2">
            <AlertTriangle className="text-red-500" size={28} />
            <span>Top Farmer Mistakes (From Data Patterns)</span>
          </h2>

          <div className="space-y-4">
            {FARMER_MISTAKES.map((item) => (
              <div
                key={item.rank}
                className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-red-400 transition"
              >
                <button
                  onClick={() => setExpandedMistake(expandedMistake === item.rank ? null : item.rank)}
                  className="w-full p-4 bg-red-50 hover:bg-red-100 transition flex items-center justify-between"
                >
                  <div className="text-left flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                      {item.rank}
                    </div>
                    <div>
                      <h3 className="font-bold text-teal-900">{item.mistake}</h3>
                      <p className="text-gray-600 text-sm">{item.frequency}</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedMistake === item.rank ? "−" : "+"}</span>
                </button>

                {expandedMistake === item.rank && (
                  <div className="p-4 bg-gray-50">
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm font-bold mb-1">Impact</p>
                      <p className="text-gray-700">{item.impact}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <p className="text-gray-600 text-sm font-bold mb-1">Recommended Solution</p>
                      <p className="text-green-700 font-bold">{item.solution}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IPM Guide */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Integrated Pest Management (IPM) Pyramid</h2>

          <div className="space-y-4">
            {IPM_LEVELS.map((item, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-lime-400 transition"
              >
                <button
                  onClick={() => setExpandedIPMLevel(expandedIPMLevel === i ? null : i)}
                  className={`w-full p-4 ${
                    i === 3
                      ? "bg-red-50 hover:bg-red-100"
                      : i === 2
                        ? "bg-orange-50 hover:bg-orange-100"
                        : "bg-green-50 hover:bg-green-100"
                  } transition flex items-center justify-between`}
                >
                  <h3 className="font-bold text-teal-900">{item.level}</h3>
                  <span className="text-2xl">{expandedIPMLevel === i ? "−" : "+"}</span>
                </button>

                {expandedIPMLevel === i && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {item.practices.map((practice, j) => (
                        <div key={j} className="bg-white p-3 rounded-lg border-l-4 border-lime-400">
                          <p className="font-bold text-teal-900 text-sm">{practice}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-50 p-6 rounded-lg">
            <p className="text-teal-900 font-bold mb-2">IPM Strategy:</p>
            <p className="text-gray-700">
              Start with cultural practices and biological control. Use mechanical control when needed. Apply chemical
              pesticides as the last resort, only when pest population exceeds economic threshold.
            </p>
          </div>
        </div>

        {/* Seasonal Advisory */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Seasonal Advisory</h2>

          <div className="flex gap-4 mb-8">
            {["Kharif", "Rabi", "Zaid"].map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-6 py-2 rounded-lg font-bold transition ${
                  selectedSeason === season
                    ? "bg-lime-400 text-teal-900"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {season}
              </button>
            ))}
          </div>

          {selectedSeason && (
            <div className="space-y-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-teal-900 mb-4">{SEASONAL_ADVISORY[selectedSeason].title}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-teal-900 mb-3">Pests to Watch</p>
                    <ul className="space-y-2">
                      {SEASONAL_ADVISORY[selectedSeason].watchPests.map((pest, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
                          <span className="text-gray-700">{pest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-teal-900 mb-3">Pre-Season Preparations</p>
                    <p className="text-gray-700">{SEASONAL_ADVISORY[selectedSeason].preparations}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white border-l-4 border-lime-500 rounded">
                  <p className="font-bold text-teal-900 mb-2">Key Advisory</p>
                  <p className="text-gray-700">{SEASONAL_ADVISORY[selectedSeason].advice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
