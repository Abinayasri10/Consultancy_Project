'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../styles/stock-adjustment-form.css';

const StockAdjustmentForm = ({ products, adjustmentType, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    reason: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.quantity || formData.quantity <= 0) {
      alert('Please select a product and enter a valid quantity');
      return;
    }
    onSubmit(formData);
  };

  const availableProducts = adjustmentType === 'out'
    ? products.filter((p) => p.currentStock > 0)
    : products;

  const selectedProduct = products.find((p) => p.id === formData.productId);

  return (
    <div className="stock-adjustment-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            {adjustmentType === 'in' ? 'Stock In (Purchase)' : 'Stock Out (Sale/Return)'}
          </h2>
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="adjustment-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Product Details</h3>

              <div className="form-group">
                <label>Select Product *</label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a product --</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.id})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="product-info">
                  <div className="info-row">
                    <span>Current Stock:</span>
                    <strong>{selectedProduct.currentStock} {selectedProduct.unit}</strong>
                  </div>
                  <div className="info-row">
                    <span>Reorder Level:</span>
                    <strong>{selectedProduct.reorderLevel} {selectedProduct.unit}</strong>
                  </div>
                  <div className="info-row">
                    <span>Cost Price:</span>
                    <strong>₹{selectedProduct.costPrice}</strong>
                  </div>
                  {adjustmentType === 'in' && (
                    <div className="info-row">
                      <span>Selling Price:</span>
                      <strong>₹{selectedProduct.sellingPrice}</strong>
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="1"
                  required
                />
              </div>

              {adjustmentType === 'out' && selectedProduct && formData.quantity > selectedProduct.currentStock && (
                <div className="warning-message">
                  Warning: Cannot remove more than current stock ({selectedProduct.currentStock})
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Adjustment Details</h3>

              <div className="form-group">
                <label>Reason for Adjustment</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                >
                  <option value="">-- Select reason --</option>
                  {adjustmentType === 'in' ? (
                    <>
                      <option value="purchase">Purchase Order</option>
                      <option value="return_from_customer">Return from Customer</option>
                      <option value="stock_correction">Stock Correction</option>
                      <option value="received_damaged">Received (Damaged Items Returned)</option>
                    </>
                  ) : (
                    <>
                      <option value="sales">Sales</option>
                      <option value="damaged">Damaged/Expiry</option>
                      <option value="loss">Stock Loss</option>
                      <option value="adjustment">Physical Count Adjustment</option>
                      <option value="return_to_supplier">Return to Supplier</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes or reference numbers..."
                  rows="4"
                />
              </div>

              {selectedProduct && (
                <div className="calculation-summary">
                  <h4>Calculation Summary</h4>
                  <div className="summary-row">
                    <span>Quantity:</span>
                    <span>{formData.quantity} {selectedProduct.unit}</span>
                  </div>
                  <div className="summary-row">
                    <span>Unit Cost:</span>
                    <span>₹{selectedProduct.costPrice}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Value:</span>
                    <span>₹{(formData.quantity * selectedProduct.costPrice).toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Current Stock:</span>
                    <span>{selectedProduct.currentStock}</span>
                  </div>
                  <div className="summary-row highlight">
                    <span>New Stock:</span>
                    <span>
                      {adjustmentType === 'in'
                        ? selectedProduct.currentStock + formData.quantity
                        : Math.max(0, selectedProduct.currentStock - formData.quantity)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {adjustmentType === 'in' ? 'Add Stock' : 'Remove Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentForm;
