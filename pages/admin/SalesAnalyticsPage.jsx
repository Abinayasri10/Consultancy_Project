"use client"

import { useState } from "react"
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const MONTHLY_DATA = [
  { month: "Jan", revenue: 4500000, volume: 2200 },
  { month: "Feb", revenue: 5200000, volume: 2400 },
  { month: "Mar", revenue: 4800000, volume: 2100 },
  { month: "Apr", revenue: 6100000, volume: 2800 },
  { month: "May", revenue: 5500000, volume: 2600 },
  { month: "Jun", revenue: 6700000, volume: 3000 },
]

const CROP_DEMAND = [
  { crop: "Rice", demand: 3200 },
  { crop: "Wheat", demand: 2800 },
  { crop: "Cotton", demand: 2400 },
  { crop: "Tomato", demand: 1800 },
  { crop: "Chili", demand: 1600 },
]

const CUSTOMER_SEGMENTS = [
  { segment: "High-Value Farmers", customers: 234, value: "₹4.5Cr", trend: "+18%" },
  { segment: "Frequent Buyers", customers: 1245, value: "₹2.8Cr", trend: "+12%" },
  { segment: "New Customers", customers: 567, value: "₹1.2Cr", trend: "+35%" },
  { segment: "At-Risk", customers: 123, value: "₹0.4Cr", trend: "-8%" },
]

export default function SalesAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4">Sales & Demand Analytics</h1>
        <p className="text-gray-600 mb-8">Deep-dive analysis for strategic decision making</p>

        {/* Date Range Selector */}
        <div className="flex gap-4 mb-8">
          {["7days", "30days", "90days", "1year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg font-bold transition ${
                dateRange === range
                  ? "bg-lime-400 text-teal-900"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300"
              }`}
            >
              {range === "7days"
                ? "Last 7 Days"
                : range === "30days"
                  ? "Last 30 Days"
                  : range === "90days"
                    ? "Last 90 Days"
                    : "1 Year"}
            </button>
          ))}
        </div>

        {/* Sales Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-teal-900 mb-6">Monthly Revenue & Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={MONTHLY_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B9E937" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B9E937" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#57D131"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue (₹)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Crop-Wise Demand */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-teal-900 mb-6">Crop-wise Demand Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CROP_DEMAND}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demand" fill="#57D131" name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-teal-900 mb-6">Product Performance Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b-2 border-teal-900">
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Product</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Units Sold</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Revenue</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Growth %</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Market Share</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "ATRATAF", units: 1250, revenue: 5620000, growth: "+15%", share: "22%", trend: "↗" },
                  { name: "SPRINT", units: 980, revenue: 6664000, growth: "+12%", share: "18%", trend: "↗" },
                  { name: "ALL CLEAR", units: 850, revenue: 4420000, growth: "+8%", share: "15%", trend: "→" },
                  { name: "INDOFIL", units: 720, revenue: 3528000, growth: "+5%", share: "14%", trend: "↘" },
                  { name: "CROP GUARD", units: 650, revenue: 4030000, growth: "+20%", share: "12%", trend: "↗" },
                ].map((product, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 font-bold text-teal-900">{product.name}</td>
                    <td className="px-6 py-3 text-gray-700">{product.units}</td>
                    <td className="px-6 py-3 text-gray-700">₹{product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-3 text-green-600 font-bold">{product.growth}</td>
                    <td className="px-6 py-3 text-gray-700">{product.share}</td>
                    <td className="px-6 py-3 text-lime-600 font-bold text-lg">{product.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Segmentation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-teal-900 mb-6">Customer Segmentation (ML-Powered K-Means)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CUSTOMER_SEGMENTS.map((segment, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-teal-50 to-lime-50 p-6 rounded-lg border-2 border-teal-200"
              >
                <h3 className="font-bold text-teal-900 mb-4">{segment.segment}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm">Active Customers</p>
                    <p className="text-2xl font-bold text-lime-600">{segment.customers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Value</p>
                    <p className="text-xl font-bold text-teal-900">{segment.value}</p>
                  </div>
                  <div className="pt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        segment.trend.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {segment.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
