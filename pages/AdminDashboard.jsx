"use client"

import { useNavigate } from "react-router-dom"
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
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import "../styles/admin-dashboard.css"

function AdminDashboard({ setIsAdminLoggedIn }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    navigate("/")
  }

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
  ]

  const categoryData = [
    { name: "Insecticides", value: 35 },
    { name: "Fungicides", value: 25 },
    { name: "Herbicides", value: 20 },
    { name: "Growth Regulators", value: 20 },
  ]

  const COLORS = ["var(--secondary-accent)", "var(--primary-accent)", "var(--dark-accent)", "#a0a0a0"]

  const kpis = [
    { icon: DollarSign, label: "Total Revenue", value: "2,45,000", trend: "+12%" },
    { icon: ShoppingCart, label: "Total Orders", value: "1,234", trend: "+8%" },
    { icon: Users, label: "Active Customers", value: "856", trend: "+5%" },
    { icon: TrendingUp, label: "Growth Rate", value: "18%", trend: "+2%" },
  ]

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-small logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">
        {/* KPI Cards */}
        <section className="kpi-section">
          <div className="kpi-grid">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon
              return (
                <div key={idx} className="kpi-card">
                  <div className="kpi-icon">
                    <Icon size={28} />
                  </div>
                  <div className="kpi-content">
                    <p className="kpi-label">{kpi.label}</p>
                    <p className="kpi-value">{kpi.value}</p>
                    <p className="kpi-trend">{kpi.trend}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Charts */}
        <section className="charts-section">
          <div className="chart-container">
            <h2>Monthly Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="var(--secondary-accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>Sales by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/admin/analytics" className="action-card">
              <TrendingUp size={32} />
              <h3>Sales Analytics</h3>
              <p>View detailed sales reports</p>
            </a>
            <a href="/admin/forecasting" className="action-card">
              <TrendingUp size={32} />
              <h3>Demand Forecasting</h3>
              <p>Predict future product demand</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
