'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Download, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import BillingForm from '../../components/admin/BillingForm';
import { salesAPI, productsAPI } from '../../services/api';
import '../../styles/sales-management.css';

export default function SalesManagement({ setIsAdminLoggedIn }) {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  useEffect(() => {
    filterSales();
  }, [sales, searchTerm, dateFilter]);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const [salesData, productsData] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
      ]);
      setSales(salesData.data);
      setProducts(productsData.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSales = () => {
    let filtered = sales;

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.billId.includes(searchTerm) ||
          s.customerInfo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.customerInfo?.phone.includes(searchTerm)
      );
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter((s) => {
        const saleDate = new Date(s.date);
        return saleDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredSales(filtered);
  };

  const handleSaveSale = async (saleData) => {
    try {
      await salesAPI.create(saleData);
      setShowBillingForm(false);
      fetchSalesData();
      alert('Sale recorded successfully!');
    } catch (error) {
      console.error('Error saving sale:', error);
      alert('Error recording sale');
    }
  };

  const handleDownloadBill = (sale) => {
    // Simple PDF generation logic
    const billContent = `
BILL #${sale.billId}
Date: ${new Date(sale.date).toLocaleDateString()}

Customer: ${sale.customerInfo?.name}
Phone: ${sale.customerInfo?.phone}

Items:
${sale.items.map((item) => `- ${item.productName}: ${item.quantity} x ₹${item.pricePerUnit}`).join('\n')}

Total: ₹${sale.totalAmount}
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(billContent));
    element.setAttribute('download', `bill-${sale.billId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (showBillingForm) {
    return (
      <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
        <BillingForm
          products={products}
          onSave={handleSaveSale}
          onCancel={() => setShowBillingForm(false)}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="sales-management">
        <div className="sales-header">
          <h1>Sales Management</h1>
          <button className="btn btn-primary" onClick={() => setShowBillingForm(true)}>
            <Plus size={20} /> Create New Bill
          </button>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Sales (Today)</div>
            <div className="stat-value">
              ₹
              {filteredSales
                .filter((s) => {
                  const today = new Date();
                  const saleDate = new Date(s.date);
                  return saleDate.toDateString() === today.toDateString();
                })
                .reduce((sum, s) => sum + (s.totalAmount || 0), 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Bills</div>
            <div className="stat-value">{filteredSales.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Average Bill Value</div>
            <div className="stat-value">
              ₹
              {filteredSales.length > 0
                ? Math.round(
                    filteredSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0) /
                      filteredSales.length
                  ).toLocaleString()
                : 0}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value">
              ₹
              {filteredSales.reduce((sum, s) => sum + (s.totalAmount || 0), 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by Bill ID, Customer name or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* Sales Table */}
        <div className="sales-table-container">
          {loading ? (
            <div className="loading">Loading sales data...</div>
          ) : filteredSales.length > 0 ? (
            <div className="sales-table">
              <div className="table-header">
                <div className="col-bill">Bill ID</div>
                <div className="col-customer">Customer</div>
                <div className="col-date">Date</div>
                <div className="col-items">Items</div>
                <div className="col-amount">Amount</div>
                <div className="col-status">Status</div>
                <div className="col-actions">Actions</div>
              </div>
              {filteredSales.map((sale) => (
                <div key={sale._id} className="table-row">
                  <div className="col-bill">{sale.billId}</div>
                  <div className="col-customer">
                    <div className="customer-name">{sale.customerInfo?.name}</div>
                    <div className="customer-phone">{sale.customerInfo?.phone}</div>
                  </div>
                  <div className="col-date">{new Date(sale.date).toLocaleDateString()}</div>
                  <div className="col-items">{sale.items?.length} items</div>
                  <div className="col-amount">₹{sale.totalAmount?.toLocaleString()}</div>
                  <div className="col-status">
                    <span className={`status-badge ${sale.payment?.status}`}>
                      {sale.payment?.status}
                    </span>
                  </div>
                  <div className="col-actions">
                    <button
                      className="btn-icon"
                      onClick={() => handleDownloadBill(sale)}
                      title="Download Bill"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No sales found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
