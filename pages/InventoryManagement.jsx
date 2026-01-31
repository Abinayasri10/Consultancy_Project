'use client';

import React, { useState, useEffect } from 'react';
import { Plus, AlertTriangle, TrendingDown } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PurchaseForm from '../../components/admin/PurchaseForm';
import StockAdjustmentForm from '../../components/admin/StockAdjustmentForm';
import { inventoryAPI, productsAPI } from '../../services/api';
import '../../styles/inventory-management.css';

export default function InventoryManagement({ setIsAdminLoggedIn }) {
  const [activeTab, setActiveTab] = useState('stock-status');
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const [
        allProducts,
        lowStock,
        expiry,
        trans,
      ] = await Promise.all([
        productsAPI.getAll(),
        inventoryAPI.getLowStockAlerts(),
        inventoryAPI.getExpiryAlerts(),
        inventoryAPI.getTransactions(),
      ]);

      setProducts(allProducts.data);
      setLowStockProducts(lowStock.data);
      setExpiryAlerts(expiry.data);
      setTransactions(trans.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseEntry = async (data) => {
    try {
      await inventoryAPI.purchaseEntry(data);
      setShowPurchaseForm(false);
      fetchInventoryData();
      alert('Purchase entry recorded successfully!');
    } catch (error) {
      console.error('Error recording purchase:', error);
      alert('Error recording purchase entry');
    }
  };

  const handleStockAdjustment = async (data) => {
    try {
      await inventoryAPI.adjustmentEntry(data);
      setShowAdjustmentForm(false);
      fetchInventoryData();
      alert('Stock adjustment recorded successfully!');
    } catch (error) {
      console.error('Error adjusting stock:', error);
      alert('Error adjusting stock');
    }
  };

  if (showPurchaseForm) {
    return (
      <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
        <PurchaseForm
          products={products}
          onSave={handlePurchaseEntry}
          onCancel={() => setShowPurchaseForm(false)}
        />
      </AdminLayout>
    );
  }

  if (showAdjustmentForm) {
    return (
      <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
        <StockAdjustmentForm
          products={products}
          onSave={handleStockAdjustment}
          onCancel={() => setShowAdjustmentForm(false)}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="inventory-management">
        <div className="inventory-header">
          <h1>Inventory Management</h1>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => setShowPurchaseForm(true)}>
              <Plus size={20} /> Purchase Entry
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAdjustmentForm(true)}>
              <Plus size={20} /> Stock Adjustment
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'stock-status' ? 'active' : ''}`}
            onClick={() => setActiveTab('stock-status')}
          >
            Stock Status
          </button>
          <button
            className={`tab ${activeTab === 'low-stock' ? 'active' : ''}`}
            onClick={() => setActiveTab('low-stock')}
          >
            Low Stock Items ({lowStockProducts.length})
          </button>
          <button
            className={`tab ${activeTab === 'expiry-alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('expiry-alerts')}
          >
            Expiry Alerts ({expiryAlerts.length})
          </button>
          <button
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'stock-status' && (
            <div className="stock-status">
              <h2>Current Stock Status</h2>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product._id} className="stock-card">
                      <div className="card-header">
                        <h3>{product.name}</h3>
                        <span className="product-id">{product.productId}</span>
                      </div>
                      <div className="stock-info">
                        <div className="stock-item">
                          <span className="label">Current Stock:</span>
                          <span className="value">
                            {product.inventory?.currentStock} {product.inventory?.unit}
                          </span>
                        </div>
                        <div className="stock-item">
                          <span className="label">Reorder Level:</span>
                          <span className="value">{product.inventory?.reorderLevel}</span>
                        </div>
                        <div className="stock-item">
                          <span className="label">Category:</span>
                          <span className="value capitalize">{product.category}</span>
                        </div>
                      </div>
                      <div className="stock-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${Math.min(
                              (product.inventory?.currentStock /
                                product.inventory?.maxStockLevel) *
                              100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'low-stock' && (
            <div className="low-stock">
              <h2>Low Stock Items</h2>
              {lowStockProducts.length > 0 ? (
                <div className="alert-table">
                  <div className="table-header">
                    <div className="col">Product</div>
                    <div className="col">Current Stock</div>
                    <div className="col">Reorder Level</div>
                    <div className="col">Action</div>
                  </div>
                  {lowStockProducts.map((product) => (
                    <div key={product._id} className="table-row warning">
                      <div className="col">
                        <div className="product-name">{product.name}</div>
                        <div className="product-id">{product.productId}</div>
                      </div>
                      <div className="col">
                        {product.inventory?.currentStock} {product.inventory?.unit}
                      </div>
                      <div className="col">{product.inventory?.reorderLevel}</div>
                      <div className="col">
                        <button
                          className="btn-small"
                          onClick={() => setShowPurchaseForm(true)}
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty">No low stock items</div>
              )}
            </div>
          )}

          {activeTab === 'expiry-alerts' && (
            <div className="expiry-alerts">
              <h2>Expiry Alerts</h2>
              {expiryAlerts.length > 0 ? (
                <div className="alert-table">
                  <div className="table-header">
                    <div className="col">Product</div>
                    <div className="col">Batch</div>
                    <div className="col">Expiry Date</div>
                    <div className="col">Stock</div>
                  </div>
                  {expiryAlerts.map((product) => (
                    <div key={product._id} className="table-row danger">
                      <div className="col">
                        <div className="product-name">{product.name}</div>
                        <div className="product-id">{product.productId}</div>
                      </div>
                      <div className="col">{product.inventory?.batchNumber}</div>
                      <div className="col">
                        {new Date(product.inventory?.expiryDate).toLocaleDateString()}
                      </div>
                      <div className="col">
                        {product.inventory?.currentStock} {product.inventory?.unit}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty">No expiry alerts</div>
              )}
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="transactions">
              <h2>Recent Transactions</h2>
              {transactions.length > 0 ? (
                <div className="transactions-table">
                  <div className="table-header">
                    <div className="col">Product</div>
                    <div className="col">Type</div>
                    <div className="col">Quantity</div>
                    <div className="col">Date</div>
                  </div>
                  {transactions.slice(0, 20).map((transaction) => (
                    <div key={transaction._id} className="table-row">
                      <div className="col">{transaction.productId?.name}</div>
                      <div className="col">
                        <span className={`badge ${transaction.type}`}>
                          {transaction.type}
                        </span>
                      </div>
                      <div className="col">{transaction.quantity}</div>
                      <div className="col">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty">No transactions</div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
