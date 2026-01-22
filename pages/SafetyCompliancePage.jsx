import { Shield, AlertCircle, CheckCircle } from "lucide-react"
import "../styles/safety.css"

function SafetyCompliancePage() {
  const regulations = [
    {
      title: "Pre-Harvest Interval (PHI)",
      description:
        "Minimum days required between last pesticide application and harvest to ensure residue levels are safe for consumption",
      details: "Typically 7-21 days depending on pesticide and crop",
    },
    {
      title: "Re-entry Period",
      description: "Time workers must wait before entering treated fields without protective equipment",
      details: "Usually 24-48 hours for most pesticides",
    },
    {
      title: "Maximum Residue Limits (MRL)",
      description: "Legal maximum amount of pesticide residue allowed on food products in different countries",
      details: "Governed by EPA, FSSAI, and international standards",
    },
  ]

  const safetyEquipment = [
    "Protective gloves",
    "Respirator mask",
    "Full-body protective suit",
    "Eye protection",
    "Closed-toe boots",
  ]

  return (
    <div className="safety-compliance-page">
      <div className="page-header">
        <h1>Safety & Compliance</h1>
        <p>Guidelines for safe pesticide handling and regulatory compliance</p>
      </div>

      <div className="container">
        {/* Government Regulations */}
        <section className="regulations-section">
          <h2>Government Regulations & Standards</h2>
          <div className="regulations-grid">
            {regulations.map((reg, idx) => (
              <div key={idx} className="regulation-card">
                <Shield size={28} className="reg-icon" />
                <h3>{reg.title}</h3>
                <p>{reg.description}</p>
                <div className="reg-details">{reg.details}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dosage Checker */}
        <section className="dosage-section">
          <h2>Dosage & Safety Checker</h2>
          <div className="checker-content">
            <div className="checker-info">
              <h3>Critical Safety Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Always read product label before application</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Wear complete protective equipment</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Maintain safe distances from water sources</span>
                </div>
                <div className="info-item">
                  <CheckCircle size={20} />
                  <span>Store pesticides in cool, dry, locked locations</span>
                </div>
              </div>
            </div>

            <div className="equipment-section">
              <h3>Essential Safety Equipment</h3>
              <div className="equipment-list">
                {safetyEquipment.map((item, idx) => (
                  <div key={idx} className="equipment-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* First Aid */}
        <section className="first-aid-section">
          <h2>First Aid in Case of Pesticide Exposure</h2>
          <div className="first-aid-steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Move to Fresh Air</h4>
              <p>Remove affected person from contaminated area immediately</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Remove Contaminated Clothing</h4>
              <p>Strip and safely dispose of contaminated clothing</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Rinse Skin</h4>
              <p>Wash skin thoroughly with soap and water for 15 minutes minimum</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h4>Seek Medical Help</h4>
              <p>Contact poison control or seek immediate medical attention</p>
            </div>
          </div>
          <div className="emergency-contact">
            <AlertCircle size={24} />
            <div>
              <p className="label">Emergency Poison Control</p>
              <p className="number">1800-229-7755 (24/7)</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SafetyCompliancePage
