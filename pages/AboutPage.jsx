import { Leaf, Award, Globe, Users } from "lucide-react"
import "../styles/about.css"

function AboutPage() {
  const milestones = [
    { year: "1984", event: "Anand Agro Agencies Founded" },
    { year: "2000", event: "Expanded to Regional Distribution" },
    { year: "2015", event: "Introduced Digital Initiatives" },
    { year: "2024", event: "Launched Smart Agro Intelligence Platform" },
  ]

  const certifications = [
    "ISO 9001:2015",
    "FSSAI Approved",
    "Government Certified Supplier",
    "Environmental Standards Compliant",
  ]

  const values = [
    { icon: Leaf, title: "Sustainability", desc: "Eco-friendly agriculture practices" },
    { icon: Award, title: "Quality", desc: "Premium pesticide formulations" },
    { icon: Globe, title: "Global Standards", desc: "International compliance and certifications" },
    { icon: Users, title: "Farmer First", desc: "Solutions designed for farmer needs" },
  ]

  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Anand Agro Agencies</h1>
        <p>Transforming Agriculture Through Innovation</p>
      </div>

      <div className="container">
        {/* Company Overview */}
        <section className="overview-section">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Our Story</h2>
              <p>
                Anand Agro Agencies has been a trusted partner in crop protection since 1984. Beginning as a traditional
                pesticide distributor, we have evolved into a technology-driven agricultural solutions provider. Our
                mission is to empower farmers with intelligent tools and premium products for sustainable, productive
                farming.
              </p>
              <p>
                Today, we serve thousands of farmers across India, providing not just chemicals but complete
                agricultural intelligence through our Smart Agro platform.
              </p>
            </div>
            <div className="overview-stats">
              <div className="stat-card">
                <div className="stat-number">40+</div>
                <div className="stat-label">Years of Trust</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50000+</div>
                <div className="stat-label">Farmers Served</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">150+</div>
                <div className="stat-label">Product Range</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15</div>
                <div className="stat-label">States Presence</div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="value-card">
                  <Icon size={40} className="value-icon" />
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <div className="timeline-event">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="certifications-section">
          <h2>Quality & Compliance Certifications</h2>
          <div className="certifications-grid">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <Award size={32} className="cert-icon" />
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Distribution Network */}
        <section className="distribution-section">
          <h2>Our Distribution Network</h2>
          <p className="section-subtitle">Present across major agricultural regions of India</p>
          <div className="network-info">
            <p>
              Through our network of regional distributors, stockists, and authorized dealers, we ensure timely
              availability of premium pesticides at competitive prices. Our logistics infrastructure guarantees product
              quality maintenance throughout the supply chain.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
