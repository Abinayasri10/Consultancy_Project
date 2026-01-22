"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import "../styles/navigation.css"

function Navigation({ isAdminLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAdminLogout = () => {
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Anand Agro</span>
          <span className="logo-subtitle">Agencies</span>
        </Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/recommendation" className="nav-link" onClick={() => setMenuOpen(false)}>
              Smart Recommendation
            </Link>
          </li>
          <li>
            <Link to="/pest-prediction" className="nav-link" onClick={() => setMenuOpen(false)}>
              Pest Prediction
            </Link>
          </li>
          <li>
            <Link to="/knowledge" className="nav-link" onClick={() => setMenuOpen(false)}>
              Knowledge Hub
            </Link>
          </li>
          <li>
            <Link to="/safety" className="nav-link" onClick={() => setMenuOpen(false)}>
              Safety
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          {isAdminLoggedIn ? (
            <>
              <li>
                <Link to="/admin/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/analytics" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Analytics
                </Link>
              </li>
              <li>
                <button
                  className="nav-btn logout-btn"
                  onClick={() => {
                    handleAdminLogout()
                    setMenuOpen(false)
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/admin/login" className="nav-btn login-btn" onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
