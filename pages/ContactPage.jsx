"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import "../styles/contact.css"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Anand Agro Agencies</h1>
        <p>Get in touch with our team for inquiries, support, or partnership opportunities</p>
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Contact Information */}
          <section className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-card">
              <Phone size={28} className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 731-4123-456</p>
                <p className="hours">Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div className="info-card">
              <Mail size={28} className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:info@anandagro.com">info@anandagro.com</a>
                </p>
                <p>
                  <a href="mailto:support@anandagro.com">support@anandagro.com</a>
                </p>
              </div>
            </div>

            <div className="info-card">
              <MapPin size={28} className="info-icon" />
              <div>
                <h4>Office Location</h4>
                <p>Anand Agro Agencies</p>
                <p>123 Agricultural Road</p>
                <p>Indore, Madhya Pradesh 452001</p>
                <p>India</p>
              </div>
            </div>

            <div className="info-card whatsapp-card">
              <Send size={28} className="info-icon" />
              <div>
                <h4>WhatsApp Support</h4>
                <p>+91 989-XXX-XXXX</p>
                <p className="whatsapp-text">Quick queries & product recommendations</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section">
            <h2>Send us a Message</h2>
            {submitted && (
              <div className="success-message">
                <p>Thank you for your message. We will get back to you within 24 hours.</p>
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </section>
        </div>

        {/* Service Regions */}
        <section className="service-regions">
          <h2>Service Regions</h2>
          <p>We provide agricultural solutions across the following regions:</p>
          <div className="regions-grid">
            <div className="region-card">Central India</div>
            <div className="region-card">Western India</div>
            <div className="region-card">Northern Plains</div>
            <div className="region-card">Southern States</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
