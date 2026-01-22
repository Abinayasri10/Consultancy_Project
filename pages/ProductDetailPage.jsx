"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import "../styles/product-detail.css"

function ProductDetailPage() {
  const { id } = useParams()
  const [dosageForm, setDosageForm] = useState({
    cropType: "",
    fieldArea: "",
    severity: "Medium",
  })

  const product = {
    name: "ATRATAF",
    image: "Herbicide Product",
    activeIngredient: "Atrazine 50% WP",
    manufacturer: "Anand Agro Agencies",
    registrationNo: "IPL-2024-001",
    formulation: "Water Dispersible Powder",
    description:
      "Selective herbicide effective for broad-leaf and grass weed control in rice crops. Provides season-long weed suppression.",
    crops: ["Rice", "Wheat", "Maize"],
    pests: ["Broad-leaf weeds", "Grassy weeds", "Sedges"],
    modeOfAction: "Pre-emergent herbicide - absorbed by roots and shoots",
    season: "Kharif (Monsoon)",
    priceLiter: 450,
    priceBag: 2250,
    bagSize: "5 kg",
  }

  const calculateDosage = () => {
    if (!dosageForm.cropType || !dosageForm.fieldArea) {
      alert("Please fill all required fields")
      return
    }

    const baseQuantity = 1.0
    const severityMultiplier = { Low: 0.8, Medium: 1.0, High: 1.2 }
    const areaFactor = Number.parseFloat(dosageForm.fieldArea) / 1000

    const requiredQuantity = baseQuantity * severityMultiplier[dosageForm.severity] * areaFactor
    const waterRequired = requiredQuantity * 500
    const sprayRounds = dosageForm.severity === "High" ? 3 : 2
    const estimatedCost = requiredQuantity * product.priceLiter

    return {
      quantity: requiredQuantity.toFixed(2),
      water: waterRequired.toFixed(0),
      rounds: sprayRounds,
      cost: estimatedCost.toFixed(0),
    }
  }

  const dosageResult = calculateDosage()

  return (
    <div className="product-detail-page">
      <div className="container">
        <a href="/products" className="back-link">
          <ArrowLeft size={18} />
          Back to Products
        </a>

        <div className="detail-grid">
          {/* Product Image Section */}
          <div className="detail-image">
            <div className="image-placeholder">
              <span>{product.image}</span>
            </div>
          </div>

          {/* Product Information */}
          <div className="detail-info">
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="info-section">
              <h3>Basic Information</h3>
              <div className="info-grid">
                <div>
                  <label>Active Ingredient</label>
                  <p>{product.activeIngredient}</p>
                </div>
                <div>
                  <label>Formulation</label>
                  <p>{product.formulation}</p>
                </div>
                <div>
                  <label>Manufacturer</label>
                  <p>{product.manufacturer}</p>
                </div>
                <div>
                  <label>Registration No.</label>
                  <p>{product.registrationNo}</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Application Details</h3>
              <div className="info-grid">
                <div>
                  <label>Target Crops</label>
                  <p>{product.crops.join(", ")}</p>
                </div>
                <div>
                  <label>Target Pests/Diseases</label>
                  <p>{product.pests.join(", ")}</p>
                </div>
                <div>
                  <label>Mode of Action</label>
                  <p>{product.modeOfAction}</p>
                </div>
                <div>
                  <label>Recommended Season</label>
                  <p>{product.season}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dosage Calculator */}
        <section className="dosage-calculator">
          <h2>ML-Assisted Dosage Calculator</h2>
          <div className="calculator-grid">
            <div className="calculator-form">
              <div className="form-group">
                <label>Crop Type</label>
                <select
                  value={dosageForm.cropType}
                  onChange={(e) => setDosageForm({ ...dosageForm, cropType: e.target.value })}
                >
                  <option value="">Select Crop</option>
                  {product.crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Field Area (in sq. meters)</label>
                <input
                  type="number"
                  placeholder="Enter field area"
                  value={dosageForm.fieldArea}
                  onChange={(e) => setDosageForm({ ...dosageForm, fieldArea: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Pest Severity</label>
                <select
                  value={dosageForm.severity}
                  onChange={(e) => setDosageForm({ ...dosageForm, severity: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {dosageForm.cropType && dosageForm.fieldArea && (
              <div className="calculator-result">
                <h3>Recommended Dosage</h3>
                <div className="result-cards">
                  <div className="result-card">
                    <span className="label">Quantity Required</span>
                    <span className="value">{dosageResult.quantity} L</span>
                  </div>
                  <div className="result-card">
                    <span className="label">Water Volume</span>
                    <span className="value">{dosageResult.water} L</span>
                  </div>
                  <div className="result-card">
                    <span className="label">Spray Rounds</span>
                    <span className="value">{dosageResult.rounds}</span>
                  </div>
                  <div className="result-card">
                    <span className="label">Estimated Cost</span>
                    <span className="value">₹{dosageResult.cost}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Safety & Compliance */}
        <section className="safety-section">
          <h2>Safety and Compliance</h2>
          <div className="safety-grid">
            <div className="safety-card">
              <CheckCircle size={24} className="safety-icon" />
              <h4>Pre-Harvest Interval</h4>
              <p>7 days before harvest recommended</p>
            </div>
            <div className="safety-card">
              <AlertCircle size={24} className="safety-icon" />
              <h4>Re-Entry Period</h4>
              <p>24 hours after application</p>
            </div>
            <div className="safety-card">
              <CheckCircle size={24} className="safety-icon" />
              <h4>Environmental Impact</h4>
              <p>Low toxicity to aquatic organisms</p>
            </div>
            <div className="safety-card">
              <AlertCircle size={24} className="safety-icon" />
              <h4>Safety Equipment</h4>
              <p>Gloves, mask, and protective clothing required</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-section">
          <h2>Pricing</h2>
          <div className="pricing-grid">
            <div className="price-card">
              <h4>{product.bagSize} Bag</h4>
              <p className="price">₹{product.priceBag}</p>
            </div>
            <div className="price-card">
              <h4>Per Liter</h4>
              <p className="price">₹{product.priceLiter}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetailPage
