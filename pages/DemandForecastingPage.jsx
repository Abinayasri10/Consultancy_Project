import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "../styles/forecasting.css"

function DemandForecastingPage() {
  const forecastData = [
    { month: "Jan", predicted: 4000, actual: 3800 },
    { month: "Feb", predicted: 3500, actual: 3200 },
    { month: "Mar", predicted: 3800, actual: 3900 },
    { month: "Apr", predicted: 4200, actual: 4100 },
    { month: "May", predicted: 3900, actual: 3700 },
    { month: "Jun", predicted: 4500, actual: null },
    { month: "Jul", predicted: 4800, actual: null },
  ]

  const accuracy = 94

  return (
    <div className="demand-forecasting-page">
      <div className="dashboard-header">
        <h1>Demand Forecasting</h1>
      </div>

      <div className="container">
        <div className="forecast-summary">
          <div className="summary-card">
            <h3>Model Accuracy</h3>
            <p className="accuracy-score">{accuracy}%</p>
          </div>
        </div>

        <section className="forecast-section">
          <h2>6-Month Product Demand Forecast</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--secondary-accent)"
                strokeWidth={2}
                name="Actual Sales"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="var(--primary-accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Demand"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="insights-section">
          <h2>Key Insights</h2>
          <div className="insights-list">
            <div className="insight">
              <p>Demand expected to peak in July with 4,800 units</p>
            </div>
            <div className="insight">
              <p>Insecticides show 18% growth trend</p>
            </div>
            <div className="insight">
              <p>Stock optimization recommended for June-July period</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DemandForecastingPage
