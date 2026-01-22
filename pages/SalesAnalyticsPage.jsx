import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "../styles/analytics.css"

function SalesAnalyticsPage() {
  const cropWiseData = [
    { crop: "Rice", sales: 45000 },
    { crop: "Cotton", sales: 38000 },
    { crop: "Tomato", sales: 29000 },
    { crop: "Wheat", sales: 51000 },
    { crop: "Chili", sales: 22000 },
  ]

  const productPerformance = [
    { product: "ATRATAF", revenue: 35000, orders: 280 },
    { product: "ALL CLEAR", revenue: 42000, orders: 320 },
    { product: "SPRINT", revenue: 28000, orders: 210 },
    { product: "INDOFIL", revenue: 31000, orders: 250 },
  ]

  return (
    <div className="sales-analytics-page">
      <div className="dashboard-header">
        <h1>Sales Analytics</h1>
      </div>

      <div className="container">
        <section className="analytics-section">
          <h2>Crop-wise Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={cropWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="crop" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="var(--secondary-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="analytics-section">
          <h2>Product Performance</h2>
          <div className="performance-table">
            <div className="table-header">
              <div className="table-cell">Product Name</div>
              <div className="table-cell">Revenue</div>
              <div className="table-cell">Orders</div>
            </div>
            {productPerformance.map((item, idx) => (
              <div key={idx} className="table-row">
                <div className="table-cell">{item.product}</div>
                <div className="table-cell">₹{item.revenue.toLocaleString()}</div>
                <div className="table-cell">{item.orders}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SalesAnalyticsPage
