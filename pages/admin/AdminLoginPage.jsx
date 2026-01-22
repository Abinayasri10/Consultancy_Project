"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Mail } from "lucide-react"

export default function AdminLoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email === "admin@anandagro.com" && password === "admin123") {
        setIsLoggedIn(true)
        navigate("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-teal-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌾</span>
          </div>
          <h1 className="text-2xl font-bold text-teal-900">Anand Agro Admin</h1>
          <p className="text-gray-600 text-sm">Management Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 focus:border-lime-400 focus:outline-none"
                placeholder="admin@anandagro.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 pl-10 focus:border-lime-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-bold">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 text-teal-900 py-2 rounded-lg font-bold hover:bg-lime-300 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200 text-center">
          <p className="text-gray-700 text-sm font-bold mb-2">Demo Credentials:</p>
          <p className="text-gray-600 text-xs">
            Email: <span className="font-bold">admin@anandagro.com</span>
          </p>
          <p className="text-gray-600 text-xs">
            Password: <span className="font-bold">admin123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
