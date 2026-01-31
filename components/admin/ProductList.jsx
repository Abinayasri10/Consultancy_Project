'use client';

import React from 'react';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';
import '../../styles/product-list.css';

const ProductList = ({ products, onEdit, onDelete }) => {
  const getStockStatus = (current, reorder) => {
    if (current <= 0) return 'Out of Stock';
    if (current <= reorder) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return '#10b981';
      case 'Low Stock':
        return '#f59e0b';
      case 'Out of Stock':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const calculateProfit = (costPrice, sellingPrice) => {
    if (costPrice === 0) return 0;
    return (((sellingPrice - costPrice) / costPrice) * 100).toFixed(2);
  };

  return (
    <div className="product-list-container">
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Profit %</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => {
                const stockStatus = getStockStatus(product.currentStock, product.reorderLevel);
                const profit = calculateProfit(product.costPrice, product.sellingPrice);

                return (
                  <tr key={product.id} className={`status-${stockStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                    <td className="product-id">{product.id}</td>
                    <td className="product-name">
                      <div>
                        <p className="name">{product.name}</p>
                        <p className="ingredient">{product.activeIngredient} {product.concentration}</p>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td>
                      <div className="stock-info">
                        <p className="stock-amount">{product.currentStock} {product.unit}</p>
                        <p className="reorder-level">Reorder: {product.reorderLevel}</p>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(stockStatus) }}
                      >
                        {stockStatus}
                      </span>
                    </td>
                    <td className="price">₹{product.costPrice?.toFixed(2)}</td>
                    <td className="price">₹{product.sellingPrice?.toFixed(2)}</td>
                    <td className="profit">
                      <span className="profit-value" style={{ color: profit > 0 ? '#10b981' : '#ef4444' }}>
                        {profit}%
                      </span>
                    </td>
                    <td className="supplier">{product.supplier}</td>
                    <td className="actions">
                      <button
                        className="action-btn edit"
                        onClick={() => onEdit(product)}
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDelete(product.id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  No products found. Add a new product to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {products && products.length > 0 && (
        <div className="products-summary">
          <div className="summary-card">
            <h4>Total Products</h4>
            <p className="summary-value">{products.length}</p>
          </div>
          <div className="summary-card">
            <h4>Low Stock Items</h4>
            <p className="summary-value warning">
              {products.filter((p) => p.currentStock <= p.reorderLevel && p.currentStock > 0).length}
            </p>
          </div>
          <div className="summary-card">
            <h4>Out of Stock</h4>
            <p className="summary-value danger">
              {products.filter((p) => p.currentStock <= 0).length}
            </p>
          </div>
          <div className="summary-card">
            <h4>Total Stock Value</h4>
            <p className="summary-value">
              ₹{products
                .reduce((sum, p) => sum + (p.costPrice * p.currentStock || 0), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
