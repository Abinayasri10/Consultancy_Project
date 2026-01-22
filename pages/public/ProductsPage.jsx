"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Filter } from "lucide-react"

const PRODUCTS_DATA = [
  { id: 1, name: "ATRATAF", category: "Herbicide", crop: "Rice", price: 450, stock: "In Stock", image: "🧪" },
  { id: 2, name: "ALL CLEAR", category: "Fungicide", crop: "Wheat", price: 520, stock: "In Stock", image: "🧪" },
  { id: 3, name: "SPRINT", category: "Insecticide", crop: "Cotton", price: 680, stock: "Low Stock", image: "🧪" },
  { id: 4, name: "INDOFIL", category: "Fungicide", crop: "Tomato", price: 490, stock: "In Stock", image: "🧪" },
  { id: 5, name: "CROP GUARD", category: "Insecticide", crop: "Chili", price: 620, stock: "In Stock", image: "🧪" },
  {
    id: 6,
    name: "GREEN FORCE",
    category: "Plant Growth Regulator",
    crop: "Sugarcane",
    price: 550,
    stock: "Out of Stock",
    image: "🧪",
  },
]

const CROPS = ["All", "Rice", "Wheat", "Cotton", "Tomato", "Chili", "Sugarcane"]
const CATEGORIES = ["All", "Insecticide", "Fungicide", "Herbicide", "Plant Growth Regulator"]
const SEASONS = ["All", "Kharif", "Rabi", "Zaid"]

export default function ProductsPage() {
  const [selectedCrop, setSelectedCrop] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSeason, setSelectedSeason] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    return (
      (selectedCrop === "All" || product.crop === selectedCrop) &&
      (selectedCategory === "All" || product.category === selectedCategory)
    )
  })

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-2">Smart Product Catalog</h1>
        <p className="text-gray-600 mb-12">Browse our complete range of pesticides with advanced filtering</p>

        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-20">
            <h3 className="font-bold text-lg text-teal-900 mb-6 flex items-center space-x-2">
              <Filter size={20} />
              <span>Filters</span>
            </h3>

            <div className="space-y-6">
              {/* Crop Filter */}
              <div>
                <h4 className="font-bold text-teal-800 mb-3">Crop Type</h4>
                <div className="space-y-2">
                  {CROPS.map((crop) => (
                    <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="crop"
                        checked={selectedCrop === crop}
                        onChange={() => setSelectedCrop(crop)}
                        className="w-4 h-4 text-lime-500"
                      />
                      <span className="text-gray-700">{crop}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-bold text-teal-800 mb-3">Category</h4>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-lime-500"
                      />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Season Filter */}
              <div>
                <h4 className="font-bold text-teal-800 mb-3">Season</h4>
                <div className="space-y-2">
                  {SEASONS.map((season) => (
                    <label key={season} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="season"
                        checked={selectedSeason === season}
                        onChange={() => setSelectedSeason(season)}
                        className="w-4 h-4 text-lime-500"
                      />
                      <span className="text-gray-700">{season}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCrop("All")
                  setSelectedCategory("All")
                  setSelectedSeason("All")
                }}
                className="w-full bg-lime-400 text-teal-900 py-2 rounded-lg font-bold hover:bg-lime-300 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
            {showFilters && (
              <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-teal-800 mb-3">Crop Type</h4>
                    <div className="space-y-2">
                      {CROPS.map((crop) => (
                        <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="crop"
                            checked={selectedCrop === crop}
                            onChange={() => setSelectedCrop(crop)}
                            className="w-4 h-4 text-lime-500"
                          />
                          <span className="text-gray-700">{crop}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-800 mb-3">Category</h4>
                    <div className="space-y-2">
                      {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="w-4 h-4 text-lime-500"
                          />
                          <span className="text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <div className="h-40 bg-gradient-to-br from-lime-300 to-green-500 flex items-center justify-center text-5xl">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-teal-900 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-gray-600 text-sm mb-3">For: {product.crop}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-xl text-lime-600">₹{product.price}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.stock === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : product.stock === "Low Stock"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      className="w-full bg-lime-400 text-teal-900 py-2 rounded-lg font-bold hover:bg-lime-300 transition text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
