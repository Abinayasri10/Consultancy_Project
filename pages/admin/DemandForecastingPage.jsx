"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const FORECAST_DATA = [
  { month: "Jan", historical: 2200, forecast: 2300, lower: 2100, upper: 2500 },
  { month: "Feb", historical: 2400, forecast: 2450, lower: 2250, upper: 2650 },
  { month: "Mar", historical: 2100, forecast: 2200, lower: 2000, upper: 2450 },
  { month: "Apr", historical: 2800, forecast: 2950, lower: 2700, upper: 3200 },
  { month: "May", historical: 2600, forecast: 2750, lower: 2500, upper: 3000 },
  { month: "Jun", historical: 3000, forecast: 3200, lower: 2900, upper: 3500 },
  { month: "Jul (F)", forecast: 3100, lower: 2800, upper: 3400 },
  { month: "Aug (F)", forecast: 2900, lower: 2600, upper: 3200 },
]

const PRODUCT_FORECAST = [
  {
    product: "ATRATAF",
    current: 500,
    predicted: 850,
    reorderNeeded: true,
    quantity: 350,
    revenue: "₹3,50,000",
  },
  {
    product: "SPRINT",
    current: 320,
    predicted: 620,
    reorderNeeded: true,
    quantity: 300,
    revenue: "₹2,04,000",
  },
  {
    product: "ALL CLEAR",
    current: 450,
    predicted: 480,
    reorderNeeded: false,
    quantity: 0,
    revenue: "₹2,49,600",
  },
  {
    product: "INDOFIL",
    current: 280,
    predicted: 420,
    reorderNeeded: true,
    quantity: 140,
    revenue: "₹2,05,800",
  },
]

const SEASONAL_DATA = [
  { month: "Jan", demand: 2200 },
  { month: "Feb", demand: 2400 },
  { month: "Mar", demand: 2100 },
  { month: "Apr", demand: 2800 },
  { month: "May", demand: 2600 },
  { month: "Jun", demand: 3000 },
]

export default function DemandForecastingPage() {
  const [selectedScenario, setSelectedScenario] = useState("base")

  const scenarios = {
    base: "Base Forecast",
    optimistic: "High Demand Scenario",
    pessimistic: "Low Demand Scenario",
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4">Demand Forecasting</h1>
        <p className="text-gray-600 mb-8">AI-powered predictions for inventory optimization</p>

        {/* Model Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-lime-400">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-bold">Algorithm</p>
              <p className="text-teal-900 font-bold">ARIMA + LSTM Ensemble</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Accuracy (MAPE)</p>
              <p className="text-teal-900 font-bold">7.3%</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Last Trained</p>
              <p className="text-teal-900 font-bold">2 days ago</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-bold">Data Quality</p>
              <p className="text-green-600 font-bold">97% Complete</p>
            </div>
          </div>
        </div>

        {/* 6-Month Forecast Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-teal-900 mb-6">6-Month Demand Forecast</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={FORECAST_DATA}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B9E937" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#B9E937" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="historical"
                stroke="#57D131"
                fill="#57D131"
                opacity={0.6}
                name="Historical Data"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#B9E937"
                fillOpacity={1}
                fill="url(#colorForecast)"
                name="Forecast"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product-Level Forecasts */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-teal-900 mb-6">Product-Level Forecasts & Reorder Recommendations</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b-2 border-teal-900">
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Product</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Current Stock</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Predicted Demand</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Reorder</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Quantity</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Est. Revenue</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_FORECAST.map((product, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 font-bold text-teal-900">{product.product}</td>
                    <td className="px-6 py-3 text-gray-700">{product.current} L</td>
                    <td className="px-6 py-3 text-gray-700">{product.predicted} L</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          product.reorderNeeded ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.reorderNeeded ? "🔴 YES" : "🟢 NO"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-700">{product.reorderNeeded ? `${product.quantity} L` : "—"}</td>
                    <td className="px-6 py-3 font-bold text-lime-600">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seasonal Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Seasonal Decomposition */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-teal-900 mb-6">Seasonal Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={SEASONAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="#57D131" name="Seasonal Demand" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Alerts */}
          <div className="space-y-4">
            {[
              { color: "red", icon: "🔴", text: "HIGH DEMAND expected - increase stock" },
              { color: "yellow", icon: "🟡", text: "MODERATE DEMAND - maintain stock" },
              { color: "green", icon: "🟢", text: "LOW DEMAND - reduce procurement" },
            ].map((alert, i) => (
              <div key={i} className={`bg-${alert.color}-50 border-l-4 border-${alert.color}-500 p-4 rounded-lg`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{alert.icon}</span>
                  <p className="text-gray-700 font-bold">{alert.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What-If Scenario */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-teal-900 mb-6">What-If Scenario Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Weather Impact</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2">
                <option>Normal</option>
                <option>Heavy Monsoon (±15%)</option>
                <option>Drought (-20%)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Price Change</label>
              <input
                type="number"
                placeholder="-10%"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Marketing Campaign</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2">
                <option>No Campaign</option>
                <option>High Intensity (+25%)</option>
                <option>Medium Intensity (+12%)</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-lime-400 text-teal-900 py-3 rounded-lg font-bold hover:bg-lime-300 transition">
            Run Scenario Analysis
          </button>

          <div className="mt-6 p-4 bg-lime-50 rounded-lg border border-lime-400">
            <p className="text-teal-900 font-bold mb-3">Scenario Results:</p>
            <p className="text-gray-700">
              With heavy monsoon + 12% price decrease + high marketing: Expected demand increase of 28%, requiring
              additional stock of 450-500L. Estimated revenue impact: +₹18,00,000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
