'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import '../../styles/product-form.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'insecticide',
    state: 'liquid',
    activeIngredient: '',
    concentration: '',
    formulationType: 'EC',
    currentStock: 0,
    unit: 'liters',
    reorderLevel: 0,
    maxStockLevel: 1000,
    costPrice: 0,
    sellingPrice: 0,
    mrp: 0,
    gst: 18,
    discountAllowed: 0,
    supplier: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    toxicityClass: 'II',
    preharvestInterval: '15',
    reentryPeriod: '24',
    status: 'active',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.activeIngredient) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="product-form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label>Product ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="e.g., PEST-2024-001"
                  disabled={!!product}
                />
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Chlorpyrifos 20% EC"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="insecticide">Insecticide</option>
                    <option value="fungicide">Fungicide</option>
                    <option value="herbicide">Herbicide</option>
                    <option value="plant_growth_regulator">Plant Growth Regulator</option>
                    <option value="bio_pesticide">Bio Pesticide</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>State</label>
                  <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="liquid">Liquid</option>
                    <option value="powder">Powder</option>
                    <option value="solid">Solid</option>
                    <option value="granular">Granular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Composition */}
            <div className="form-section">
              <h3>Composition</h3>

              <div className="form-group">
                <label>Active Ingredient *</label>
                <input
                  type="text"
                  name="activeIngredient"
                  value={formData.activeIngredient}
                  onChange={handleChange}
                  placeholder="e.g., Chlorpyrifos"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Concentration</label>
                  <input
                    type="text"
                    name="concentration"
                    value={formData.concentration}
                    onChange={handleChange}
                    placeholder="e.g., 20%"
                  />
                </div>

                <div className="form-group">
                  <label>Formulation Type</label>
                  <input
                    type="text"
                    name="formulationType"
                    value={formData.formulationType}
                    onChange={handleChange}
                    placeholder="e.g., EC, WP, SC"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="form-section">
              <h3>Inventory</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Current Stock *</label>
                  <input
                    type="number"
                    name="currentStock"
                    value={formData.currentStock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit</label>
                  <select name="unit" value={formData.unit} onChange={handleChange}>
                    <option value="liters">Liters</option>
                    <option value="kg">Kilogram</option>
                    <option value="units">Units</option>
                    <option value="bottles">Bottles</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Max Stock Level</label>
                  <input
                    type="number"
                    name="maxStockLevel"
                    value={formData.maxStockLevel}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Batch Number</label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    placeholder="e.g., BATCH-2024-001"
                  />
                </div>

                <div className="form-group">
                  <label>Manufacturing Date</label>
                  <input
                    type="date"
                    name="manufacturingDate"
                    value={formData.manufacturingDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="form-section">
              <h3>Pricing</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Cost Price (₹)</label>
                  <input
                    type="number"
                    name="costPrice"
                    value={formData.costPrice}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Selling Price (₹)</label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>MRP (₹)</label>
                  <input
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>GST (%)</label>
                  <input
                    type="number"
                    name="gst"
                    value={formData.gst}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Discount Allowed (%)</label>
                <input
                  type="number"
                  name="discountAllowed"
                  value={formData.discountAllowed}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>

            {/* Supplier & Safety */}
            <div className="form-section">
              <h3>Supplier & Safety</h3>

              <div className="form-group">
                <label>Supplier Name</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="e.g., Rallis India Ltd"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Toxicity Class</label>
                  <select name="toxicityClass" value={formData.toxicityClass} onChange={handleChange}>
                    <option value="I">Class I (Extremely Toxic)</option>
                    <option value="II">Class II (Highly Toxic)</option>
                    <option value="III">Class III (Moderately Toxic)</option>
                    <option value="IV">Class IV (Slightly Toxic)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preharvest Interval (days)</label>
                  <input
                    type="number"
                    name="preharvestInterval"
                    value={formData.preharvestInterval}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Reentry Period (hours)</label>
                  <input
                    type="number"
                    name="reentryPeriod"
                    value={formData.reentryPeriod}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={20} /> {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
