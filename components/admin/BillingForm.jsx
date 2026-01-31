'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import '../../styles/billing-form.css';

const BillingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    billId: `BILL-${Date.now()}`,
    customerName: '',
    customerPhone: '',
    customerVillage: '',
    customerLandSize: '',
    items: [],
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    creditDays: 0,
    staffId: 'STAFF-001',
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) {
      alert('Please select product and quantity');
      return;
    }

    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const newItem = {
      productId: product.id,
      productName: product.name,
      quantity,
      unit: product.unit,
      unitPrice: product.sellingPrice,
      discount: product.discountAllowed || 0,
      gst: product.gst || 18,
    };

    const subtotal = quantity * product.sellingPrice;
    const discountAmount = (subtotal * (product.discountAllowed || 0)) / 100;
    const priceAfterDiscount = subtotal - discountAmount;
    const gstAmount = (priceAfterDiscount * (product.gst || 18)) / 100;

    newItem.subtotal = subtotal;
    newItem.discountAmount = discountAmount;
    newItem.priceAfterDiscount = priceAfterDiscount;
    newItem.gstAmount = gstAmount;
    newItem.totalAmount = priceAfterDiscount + gstAmount;

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    setSelectedProduct('');
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'creditDays' ? parseInt(value) : value,
    }));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalGst = 0;

    formData.items.forEach((item) => {
      subtotal += item.subtotal;
      totalDiscount += item.discountAmount;
      totalGst += item.gstAmount;
    });

    return {
      subtotal,
      totalDiscount,
      totalGst,
      total: subtotal - totalDiscount + totalGst,
    };
  };

  const totals = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerPhone) {
      alert('Please fill customer details');
      return;
    }

    if (formData.items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    const saleData = {
      ...formData,
      subtotal: totals.subtotal,
      discount: totals.totalDiscount,
      gstAmount: totals.totalGst,
      totalAmount: totals.total,
    };

    onSubmit(saleData);
  };

  return (
    <div className="billing-form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Bill</h2>
          <button className="close-btn" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="billing-form">
          <div className="form-container">
            {/* Bill Header */}
            <div className="form-section">
              <h3>Bill Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Bill ID</label>
                  <input
                    type="text"
                    value={formData.billId}
                    disabled
                    className="readonly"
                  />
                </div>
                <div className="form-group">
                  <label>Bill Date</label>
                  <input
                    type="text"
                    value={new Date().toLocaleDateString()}
                    disabled
                    className="readonly"
                  />
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="form-section">
              <h3>Customer Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleCustomerChange}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleCustomerChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Village</label>
                  <input
                    type="text"
                    name="customerVillage"
                    value={formData.customerVillage}
                    onChange={handleCustomerChange}
                    placeholder="Enter village"
                  />
                </div>
                <div className="form-group">
                  <label>Land Size (acres)</label>
                  <input
                    type="text"
                    name="customerLandSize"
                    value={formData.customerLandSize}
                    onChange={handleCustomerChange}
                    placeholder="Enter land size"
                  />
                </div>
              </div>
            </div>

            {/* Add Items */}
            <div className="form-section">
              <h3>Add Items</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Select Product</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">-- Select a product --</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ₹{product.sellingPrice}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>&nbsp;</label>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleAddItem}
                  >
                    <Plus size={18} /> Add Item
                  </button>
                </div>
              </div>

              {/* Items Table */}
              {formData.items.length > 0 && (
                <div className="items-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>GST</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName}</td>
                          <td>{item.quantity} {item.unit}</td>
                          <td>₹{item.unitPrice}</td>
                          <td>₹{item.subtotal.toFixed(2)}</td>
                          <td>₹{item.discountAmount.toFixed(2)}</td>
                          <td>₹{item.gstAmount.toFixed(2)}</td>
                          <td className="total-amount">₹{item.totalAmount.toFixed(2)}</td>
                          <td>
                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Payment Details */}
            <div className="form-section">
              <h3>Payment Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handlePaymentChange}
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                    <option value="card">Card</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handlePaymentChange}
                  >
                    <option value="paid">Paid</option>
                    <option value="credit">Credit</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              {formData.paymentStatus === 'credit' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Credit Days</label>
                    <input
                      type="number"
                      name="creditDays"
                      value={formData.creditDays}
                      onChange={handlePaymentChange}
                      min="0"
                      max="90"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bill-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount:</span>
                <span>-₹{totals.totalDiscount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>GST:</span>
                <span>₹{totals.totalGst.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingForm;
