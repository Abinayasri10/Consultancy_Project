"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"
import "../styles/admin-login.css"

function AdminLoginPage({ setIsAdminLoggedIn }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (credentials.email === "admin@anandagro.com" && credentials.password === "admin123") {
      setIsAdminLoggedIn(true)
      navigate("/admin/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-box">
          <h1>Admin Portal</h1>
          <p>Anand Agro Intelligence Platform</p>

          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="admin@anandagro.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-label">Demo Credentials:</p>
            <p className="demo-text">Email: admin@anandagro.com</p>
            <p className="demo-text">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
