"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import "../styles/recommendation.css"

function SmartRecommendationPage() {
  const [formData, setFormData] = useState({
    crop: "",
    growthStage: "",
    symptoms: [],
    location: "",
    season: "",
  })

  const [recommendation, setRecommendation] = useState(null)

  const crops = ["Rice", "Wheat", "Cotton", "Tomato", "Chili", "Sugarcane", "Maize"]
  const growthStages = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Maturity"]
  const locations = ["Indore", "Bhopal", "Dewas", "Ujjain", "Dhar", "Agar"]

  const symptomCategories = {
    Leaf: ["Yellowing", "Holes", "Curling", "Spots", "Wilting"],
    Stem: ["Boring holes", "Lesions", "Rotting", "Discoloration"],
    Fruit: ["Spots", "Rotting", "Deformation"],
    General: ["Stunted growth", "Wilting", "Leaf drop"],
  }

  const recommendations = {
    "Rice-Yellowing-Kharif": {
      pest: "Iron Deficiency Chlorosis",
      confidence: 85,
      product: "ATRATAF",
      dosage: "1.0 L per 1000 sq.m",
      safety: "Apply in early morning or late evening",
    },
    "Cotton-Spots-Kharif": {
      pest: "Bollworm",
      confidence: 92,
      product: "ALL CLEAR",
      dosage: "1.5 L per 1000 sq.m",
      safety: "Wear protective gear, spray 2-3 rounds",
    },
    "Tomato-Curling-Rabi": {
      pest: "Whitefly Infestation",
      confidence: 88,
      product: "SPRINT",
      dosage: "0.8 L per 1000 sq.m",
      safety: "Use in early morning, maintain 7-day gap",
    },
  }

  const handleSymptomChange = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }))
  }

  const handleGetRecommendation = () => {
    if (!formData.crop || !formData.symptoms.length) {
      alert("Please select crop and at least one symptom")
      return
    }

    const key = `${formData.crop}-${formData.symptoms[0]}-${formData.season || "Kharif"}`
    const rec = recommendations[key] || {
      pest: "Common Pest/Disease",
      confidence: 78,
      product: "INDOFIL",
      dosage: "1.0 L per 1000 sq.m",
      safety: "Follow safety guidelines and apply protective measures",
    }

    setRecommendation(rec)
  }

  const currentSeason = new Date().getMonth() < 6 ? "Rabi" : "Kharif"

  return (
    <div className="recommendation-page">
      <div className="page-header">
        <h1>Smart AI Recommendation Engine</h1>
        <p>Get personalized pesticide recommendations based on your crop conditions</p>
      </div>

      <div className="recommendation-container">
        {/* Input Panel */}
        <div className="input-panel">
          <h2>Describe Your Crop Condition</h2>

          <div className="form-section">
            <label>Crop Type</label>
            <select value={formData.crop} onChange={(e) => setFormData({ ...formData, crop: e.target.value })}>
              <option value="">Select Crop</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>Growth Stage</label>
            <select
              value={formData.growthStage}
              onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
            >
              <option value="">Select Stage</option>
              {growthStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>Location</label>
            <select value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}>
              <option value="">Select District</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>Current Season</label>
            <div className="season-display">{currentSeason} (Auto-detected)</div>
          </div>

          <div className="form-section">
            <label>Symptoms Observed</label>
            <div className="symptoms-grid">
              {Object.entries(symptomCategories).map(([category, symptoms]) => (
                <div key={category} className="symptom-category">
                  <h4>{category} Symptoms</h4>
                  {symptoms.map((symptom) => (
                    <label key={symptom} className="symptom-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.symptoms.includes(symptom)}
                        onChange={() => handleSymptomChange(symptom)}
                      />
                      <span>{symptom}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary recommendation-btn" onClick={handleGetRecommendation}>
            Get AI Recommendation
          </button>
        </div>

        {/* Output Panel */}
        {recommendation && (
          <div className="output-panel">
            <h2>AI Analysis Result</h2>

            <div className="diagnosis-card">
              <div className="diagnosis-header">
                <h3>Identified Issue</h3>
                <div className="confidence-score">
                  <span className="label">Confidence</span>
                  <span className="score">{recommendation.confidence}%</span>
                </div>
              </div>
              <p className="pest-name">{recommendation.pest}</p>
              <div className="confidence-bar">
                <div className="bar-fill" style={{ width: `${recommendation.confidence}%` }}></div>
              </div>
            </div>

            <div className="recommendation-card">
              <h3>Recommended Product</h3>
              <p className="product-name">{recommendation.product}</p>
              <div className="product-details">
                <div className="detail">
                  <span className="label">Recommended Dosage</span>
                  <span className="value">{recommendation.dosage}</span>
                </div>
                <div className="detail">
                  <span className="label">Safety Notes</span>
                  <span className="value">{recommendation.safety}</span>
                </div>
              </div>
              <a href="/products" className="btn btn-small">
                View All Products
              </a>
            </div>

            <div className="alternatives">
              <h3>Alternative Products</h3>
              <p>Similar products available for this crop-pest combination</p>
              <div className="alt-list">
                <div className="alt-item">INDOFIL - Fungicide Alternative</div>
                <div className="alt-item">WHITE SHIELD - Backup Option</div>
              </div>
            </div>
          </div>
        )}

        {!recommendation && (
          <div className="output-panel empty">
            <div className="empty-state">
              <TrendingUp size={48} />
              <p>Fill in the form and click "Get AI Recommendation" to receive personalized product suggestions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SmartRecommendationPage
