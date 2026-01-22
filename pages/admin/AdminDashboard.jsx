"use client"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Package, Users, Target } from "lucide-react"

const SALES_DATA = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
]

const CATEGORY_DATA = [
  { name: "Insecticides", value: 35, color: "#B9E937" },
  { name: "Fungicides", value: 32, color: "#57D131" },
  { name: "Herbicides", value: 22, color: "#406661" },
  { name: "Growth Regulators", value: 11, color: "#d4d4d4" },
]

const TOP_PRODUCTS = [
  { name: "ATRATAF", sales: 1250, revenue: 562500 },
  { name: "SPRINT", sales: 980, revenue: 666400 },
  { name: "ALL CLEAR", sales: 850, revenue: 442000 },
  { name: "INDOFIL", sales: 720, revenue: 352800 },
  { name: "CROP GUARD", sales: 650, revenue: 403000 },
]

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-8">Admin Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: TrendingUp,
              label: "Monthly Sales",
              value: "₹67,00,000",
              change: "+12% vs last month",
              color: "from-lime-400 to-green-500",
            },
            {
              icon: Package,
              label: "Active Products",
              value: "48",
              change: "In Stock: 42",
              color: "from-green-400 to-teal-500",
            },
            {
              icon: Users,
              label: "Active Farmers",
              value: "15,234",
              change: "+2.3% this month",
              color: "from-teal-400 to-blue-500",
            },
            {
              icon: Target,
              label: "Model Accuracy",
              value: "92.4%",
              change: "Recommendation success",
              color: "from-blue-400 to-purple-500",
            },
          ].map((card, i) => {
            const Icon = card.icon
            return (
              <div key={i} className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm opacity-90">{card.label}</h3>
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">{card.value}</p>
                <p className="text-sm opacity-80">{card.change}</p>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-teal-900 mb-6">Monthly Sales Trend (Last 6 months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#57D131"
                  strokeWidth={3}
                  dot={{ fill: "#B9E937", r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-teal-900 mb-6">Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-teal-900 mb-6">Top 5 Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-teal-50 border-b-2 border-teal-900">
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Product</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Units Sold</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Revenue</th>
                  <th className="text-left px-6 py-3 font-bold text-teal-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((product, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 font-bold text-teal-900">{product.name}</td>
                    <td className="px-6 py-3 text-gray-700">{product.sales.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-700">₹{product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        +{15 - i * 2}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
