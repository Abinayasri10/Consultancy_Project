import { Cloud, AlertTriangle, Leaf, Calendar } from "lucide-react"
import "../styles/pest-prediction.css"

function PestPredictionPage() {
  const forecasts = [
    {
      region: "Indore District",
      pest: "Leaf Miner",
      riskLevel: "High",
      daysOut: 3,
      recommendation: "Apply preventive spray immediately",
    },
    {
      region: "Ujjain District",
      pest: "Whitefly",
      riskLevel: "Medium",
      daysOut: 5,
      recommendation: "Monitor crop condition, spray if required",
    },
    {
      region: "Dewas District",
      pest: "Stem Borer",
      riskLevel: "High",
      daysOut: 7,
      recommendation: "Prepare preventive measures",
    },
  ]

  const cropCalendar = [
    { month: "Jan-Mar", crop: "Wheat", pest: "Aphids", action: "Monitor and spray" },
    { month: "Apr-Jun", crop: "Cotton", pest: "Bollworm", action: "Weekly scouting" },
    { month: "Jul-Sep", crop: "Rice", pest: "Leaf Folder", action: "Apply fungicide" },
    { month: "Oct-Dec", crop: "Sugarcane", pest: "Stem Borer", action: "Monitor density" },
  ]

  const getRiskColor = (level) => {
    if (level === "High") return "risk-high"
    if (level === "Medium") return "risk-medium"
    return "risk-low"
  }

  return (
    <div className="pest-prediction-page">
      <div className="page-header">
        <h1>Pest Outbreak Prediction</h1>
        <p>Data-driven early warning system for regional pest outbreaks</p>
      </div>

      <div className="container">
        {/* Regional Forecasts */}
        <section className="forecasts-section">
          <h2>7-Day Regional Forecasts</h2>
          <div className="forecasts-grid">
            {forecasts.map((forecast, idx) => (
              <div key={idx} className="forecast-card">
                <div className="forecast-header">
                  <h3>{forecast.region}</h3>
                  <span className={`risk-badge ${getRiskColor(forecast.riskLevel)}`}>{forecast.riskLevel} Risk</span>
                </div>
                <div className="forecast-content">
                  <div className="forecast-item">
                    <span className="label">Pest/Disease</span>
                    <span className="value">{forecast.pest}</span>
                  </div>
                  <div className="forecast-item">
                    <span className="label">Prediction Window</span>
                    <span className="value">Next {forecast.daysOut} days</span>
                  </div>
                  <div className="forecast-item">
                    <span className="label">Recommendation</span>
                    <span className="value">{forecast.recommendation}</span>
                  </div>
                </div>
                <button className="btn btn-small">Subscribe Alert</button>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Crop Calendar */}
        <section className="calendar-section">
          <h2>Seasonal Crop Calendar & Pest Management</h2>
          <div className="calendar-table">
            <div className="table-header">
              <div className="table-cell">Season</div>
              <div className="table-cell">Primary Crop</div>
              <div className="table-cell">Major Pest</div>
              <div className="table-cell">Recommended Action</div>
            </div>
            {cropCalendar.map((item, idx) => (
              <div key={idx} className="table-row">
                <div className="table-cell">
                  <Calendar size={16} />
                  {item.month}
                </div>
                <div className="table-cell">{item.crop}</div>
                <div className="table-cell">{item.pest}</div>
                <div className="table-cell">{item.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather Integration */}
        <section className="weather-section">
          <h2>Weather-Based Pest Prediction</h2>
          <div className="weather-grid">
            <div className="weather-card">
              <Cloud size={32} />
              <h4>Temperature Impact</h4>
              <p>
                High humidity (above 80%) accelerates pest multiplication. Apply preventive sprays during cooler months.
              </p>
            </div>
            <div className="weather-card">
              <AlertTriangle size={32} />
              <h4>Rain Pattern Effect</h4>
              <p>Excessive rainfall increases fungal disease risk. Plan spraying schedules between rain events.</p>
            </div>
            <div className="weather-card">
              <Leaf size={32} />
              <h4>Seasonal Risk</h4>
              <p>Pest populations peak during monsoon and post-monsoon seasons. Double protection recommended.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PestPredictionPage
