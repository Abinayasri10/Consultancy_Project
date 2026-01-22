"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for your message. We will get back to you soon!")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4 flex items-center space-x-3">
          <MessageSquare className="text-lime-500" size={40} />
          <span>Contact Us</span>
        </h1>
        <p className="text-gray-600 mb-12">We're here to help. Get in touch with our team.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-lime-400">
            <div className="flex items-center space-x-4 mb-4">
              <Phone className="text-lime-500" size={32} />
              <h3 className="text-xl font-bold text-teal-900">Phone</h3>
            </div>
            <p className="text-gray-700 mb-2">+91-80-1234-5678</p>
            <p className="text-gray-700">+91-9999-999-999</p>
            <p className="text-sm text-gray-600 mt-4">Available: Monday - Saturday, 9 AM - 6 PM</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-500">
            <div className="flex items-center space-x-4 mb-4">
              <Mail className="text-green-500" size={32} />
              <h3 className="text-xl font-bold text-teal-900">Email</h3>
            </div>
            <p className="text-gray-700 mb-2">info@anandagro.com</p>
            <p className="text-gray-700">support@anandagro.com</p>
            <p className="text-sm text-gray-600 mt-4">We typically respond within 24 hours</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-teal-500">
            <div className="flex items-center space-x-4 mb-4">
              <MapPin className="text-teal-500" size={32} />
              <h3 className="text-xl font-bold text-teal-900">Address</h3>
            </div>
            <p className="text-gray-700 mb-2">Anand Agro Agencies Ltd.</p>
            <p className="text-gray-700">123 Agricultural Complex,</p>
            <p className="text-gray-700">Bangalore, Karnataka 560001</p>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-teal-900 mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
                  placeholder="+91-XXXXX-XXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Message *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 text-teal-900 py-3 rounded-lg font-bold hover:bg-lime-300 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="bg-green-50 rounded-lg p-8 border-2 border-green-500">
              <h3 className="text-xl font-bold text-teal-900 mb-4">WhatsApp Business</h3>
              <p className="text-gray-700 mb-4">Chat with us on WhatsApp for quick support</p>
              <a
                href="https://wa.me/919999999999"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition"
              >
                Open WhatsApp
              </a>
            </div>

            {/* Dealer Inquiry */}
            <div className="bg-lime-50 rounded-lg p-8 border-2 border-lime-400">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Become a Dealer</h3>
              <p className="text-gray-700 mb-4">Interested in distributing our products in your area?</p>
              <button className="bg-lime-400 text-teal-900 px-6 py-2 rounded-lg font-bold hover:bg-lime-300 transition">
                Dealer Inquiry Form
              </button>
            </div>

            {/* Business Hours */}
            <div className="bg-teal-50 rounded-lg p-8 border-2 border-teal-400">
              <h3 className="text-xl font-bold text-teal-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
