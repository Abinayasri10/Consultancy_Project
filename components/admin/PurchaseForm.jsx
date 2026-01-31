'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import '../../styles/purchase-form.css';

export default function PurchaseForm({ products, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    costPrice: '',
    supplierName: '',
    supplierContactPerson: '',
    supplierPhone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="purchase-form-container">
      <div className="form-header">
        <button className="btn-back" onClick={onCancel}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1>Purchase Entry</h1>
      </div>

      <form onSubmit={handleSubmit} className="purchase-form">
        <section className="form-section">
          <h2 className="section-title">Product Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Product *</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - {product.productId}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="form-group">
              <label>Batch Number</label>
              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleInputChange}
                placeholder="Enter batch number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cost Price</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleInputChange}
                placeholder="Enter cost price"
              />
            </div>

            <div className="form-group">
              <label>Manufacturing Date</label>
              <input
                type="date"
                name="manufacturingDate"
                value={formData.manufacturingDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">Supplier Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="supplierContactPerson"
                value={formData.supplierContactPerson}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="supplierPhone"
                value={formData.supplierPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={20} /> Record Purchase
          </button>
        </div>
      </form>
    </div>
  );
}
