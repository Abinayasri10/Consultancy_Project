"use client"

import { useState } from "react"
import "../styles/products.css"

function ProductsPage() {
  const [filters, setFilters] = useState({
    crop: "",
    pest: "",
    season: "",
    type: "",
  })

  const crops = ["Rice", "Wheat", "Cotton", "Tomato", "Chili", "Sugarcane", "Maize", "Soybean"]
  const pests = ["Leaf Miner", "Aphids", "Bollworm", "Blight", "Stem Borer", "Whitefly", "Scale Insect"]
  const seasons = ["Kharif", "Rabi", "Zaid"]
  const productTypes = ["Insecticide", "Fungicide", "Herbicide", "Plant Growth Regulator"]

  const products = [
    {
      id: 1,
      name: "ATRATAF",
      crop: "Rice",
      pest: "Leaf Miner",
      season: "Kharif",
      type: "Herbicide",
      price: 450,
      stock: "In Stock",
      active: "Atrazine 50% WP",
    },
    {
      id: 2,
      name: "ALL CLEAR",
      crop: "Cotton",
      pest: "Bollworm",
      season: "Kharif",
      type: "Insecticide",
      price: 650,
      stock: "In Stock",
      active: "Cypermethrin 10% EC",
    },
    {
      id: 3,
      name: "SPRINT",
      crop: "Tomato",
      pest: "Aphids",
      season: "Rabi",
      type: "Insecticide",
      price: 550,
      stock: "Low Stock",
      active: "Imidacloprid 17.8% SL",
    },
    {
      id: 4,
      name: "INDOFIL",
      crop: "Chili",
      pest: "Blight",
      season: "Rabi",
      type: "Fungicide",
      price: 380,
      stock: "In Stock",
      active: "Mancozeb 75% WP",
    },
    {
      id: 5,
      name: "GROWTH PLUS",
      crop: "Sugarcane",
      pest: "Stem Borer",
      season: "Zaid",
      type: "Plant Growth Regulator",
      price: 520,
      stock: "In Stock",
      active: "Gibberellic Acid 0.1%",
    },
    {
      id: 6,
      name: "WHITE SHIELD",
      crop: "Wheat",
      pest: "Whitefly",
      season: "Rabi",
      type: "Insecticide",
      price: 480,
      stock: "In Stock",
      active: "Profenofos 50% EC",
    },
  ]

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.crop || product.crop === filters.crop) &&
      (!filters.pest || product.pest === filters.pest) &&
      (!filters.season || product.season === filters.season) &&
      (!filters.type || product.type === filters.type)
    )
  })

  const getStockColor = (stock) => {
    if (stock === "In Stock") return "in-stock"
    if (stock === "Low Stock") return "low-stock"
    return "out-stock"
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Smart Product Catalog</h1>
        <p>Advanced Filtering for Optimal Crop Protection</p>
      </div>

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3>Filter Products</h3>

          <div className="filter-group">
            <label>Crop Type</label>
            <select value={filters.crop} onChange={(e) => setFilters({ ...filters, crop: e.target.value })}>
              <option value="">All Crops</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Target Pest/Disease</label>
            <select value={filters.pest} onChange={(e) => setFilters({ ...filters, pest: e.target.value })}>
              <option value="">All Pests</option>
              {pests.map((pest) => (
                <option key={pest} value={pest}>
                  {pest}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Season</label>
            <select value={filters.season} onChange={(e) => setFilters({ ...filters, season: e.target.value })}>
              <option value="">All Seasons</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Product Type</label>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
              <option value="">All Types</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-reset" onClick={() => setFilters({ crop: "", pest: "", season: "", type: "" })}>
            Reset Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="products-main">
          <div className="results-info">
            <p>Showing {filteredProducts.length} products</p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-header">
                    <h4>{product.name}</h4>
                    <span className={`stock-badge ${getStockColor(product.stock)}`}>{product.stock}</span>
                  </div>

                  <div className="product-details">
                    <div className="detail-row">
                      <span className="label">Crop:</span>
                      <span className="value">{product.crop}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Target:</span>
                      <span className="value">{product.pest}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Type:</span>
                      <span className="value">{product.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Active:</span>
                      <span className="value">{product.active}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Price:</span>
                      <span className="value price">₹{product.price}/L</span>
                    </div>
                  </div>

                  <div className="product-actions">
                    <a href={`/products/${product.id}`} className="btn btn-small">
                      View Details
                    </a>
                    <button className="btn btn-outline btn-small">Add to Inquiry</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products match your filters. Please adjust your selection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
