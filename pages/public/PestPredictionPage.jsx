"use client"

import { useState } from "react"
import { AlertCircle, TrendingUp } from "lucide-react"

const DISTRICTS = [
  { name: "Bangalore", risk: "High", color: "bg-red-500" },
  { name: "Mysore", risk: "Moderate", color: "bg-yellow-500" },
  { name: "Belgaum", risk: "Low", color: "bg-green-500" },
  { name: "Hubballi", risk: "Very High", color: "bg-red-700" },
  { name: "Kolar", risk: "Moderate", color: "bg-yellow-500" },
]

const FORECAST_DATA = [
  {
    date: "Jan 20",
    pest: "Leaf Miner",
    risk: "High",
    weather: "Humid + 28°C",
    action: "Apply SPRINT preventively",
  },
  {
    date: "Jan 21",
    pest: "Aphids",
    risk: "Moderate",
    weather: "Low rainfall",
    action: "Monitor fields",
  },
  {
    date: "Jan 22",
    pest: "Whitefly",
    risk: "Low",
    weather: "Windy conditions",
    action: "Watch for signs",
  },
]

const RICE_CALENDAR = [
  {
    month: "June-July",
    stage: "Seedling Stage",
    pest: "Stem Borer",
    preventive: "Early preventive spray with SPRINT",
  },
  {
    month: "August-Sept",
    stage: "Vegetative",
    pest: "Leaf Folder",
    preventive: "Monitor and spray if infestation > 20%",
  },
  {
    month: "October",
    stage: "Flowering",
    pest: "Brown Plant Hopper (BPH)",
    preventive: "Intensive monitoring, apply Crop Guard",
  },
]

export default function PestPredictionPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Bangalore")
  const [expandedMonth, setExpandedMonth] = useState(null)

  const selectedDistrictData = DISTRICTS.find((d) => d.name === selectedDistrict)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4 flex items-center space-x-3">
          <TrendingUp className="text-lime-500" size={40} />
          <span>Pest Outbreak Prediction</span>
        </h1>
        <p className="text-gray-600 mb-12">Early warning system using weather data and historical patterns</p>

        {/* Regional Risk Map */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">District-wise Risk Assessment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {DISTRICTS.map((district) => (
              <button
                key={district.name}
                onClick={() => setSelectedDistrict(district.name)}
                className={`p-4 rounded-lg transition border-2 ${
                  selectedDistrict === district.name
                    ? "border-lime-400 shadow-lg"
                    : "border-gray-200 hover:border-lime-400"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${district.color}`}></div>
                  <span className="font-bold text-teal-900">{district.name}</span>
                </div>
                <p className="text-sm text-gray-600">{district.risk} Risk</p>
              </button>
            ))}
          </div>

          {/* Selected District Details */}
          <div
            className={`${selectedDistrictData.color} bg-opacity-10 p-8 rounded-lg border-l-4 ${selectedDistrictData.color}`}
          >
            <h3 className="text-2xl font-bold text-teal-900 mb-2">{selectedDistrict}</h3>
            <p className="text-lg font-bold text-gray-700 mb-4">Risk Level: {selectedDistrictData.risk}</p>
            <p className="text-gray-700">
              Monitor weather conditions closely. Current temperature and humidity favor pest development. Farmers are
              advised to implement preventive measures.
            </p>
          </div>
        </div>

        {/* 7-Day Pest Forecast */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">7-Day Pest Forecast for {selectedDistrict}</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b-2 border-teal-900">
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Date</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Pest Type</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Risk Level</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Weather Factor</th>
                  <th className="text-left px-4 py-3 font-bold text-teal-900">Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {FORECAST_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-gray-700">{row.date}</td>
                    <td className="px-4 py-3 text-gray-700">{row.pest}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          row.risk === "High"
                            ? "bg-red-100 text-red-700"
                            : row.risk === "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {row.risk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.weather}</td>
                    <td className="px-4 py-3 font-bold text-lime-600">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crop Calendar */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Rice Crop Calendar & Pest Threats</h2>

          <div className="space-y-4">
            {RICE_CALENDAR.map((month, i) => (
              <div
                key={i}
                className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-lime-400 transition"
              >
                <button
                  onClick={() => setExpandedMonth(expandedMonth === i ? null : i)}
                  className="w-full p-4 bg-teal-50 hover:bg-teal-100 transition flex items-center justify-between"
                >
                  <div className="text-left">
                    <h3 className="font-bold text-teal-900">{month.month}</h3>
                    <p className="text-gray-600 text-sm">{month.stage}</p>
                  </div>
                  <span className="text-2xl">{expandedMonth === i ? "−" : "+"}</span>
                </button>

                {expandedMonth === i && (
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm font-bold">Primary Pest Threat</p>
                        <p className="text-teal-900 font-bold">{month.pest}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm font-bold">Preventive Action</p>
                        <p className="text-teal-900">{month.preventive}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alert Subscription */}
        <div className="bg-lime-50 border-2 border-lime-400 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-4 flex items-center space-x-2">
            <AlertCircle className="text-lime-600" size={28} />
            <span>Subscribe to Pest Alerts</span>
          </h2>
          <p className="text-gray-700 mb-6">
            Get real-time notifications when high pest risk is detected in your district
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Enter your phone (WhatsApp)"
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-lime-400 focus:outline-none"
            />
            <button className="bg-lime-400 text-teal-900 px-8 py-3 rounded-lg font-bold hover:bg-lime-300 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
