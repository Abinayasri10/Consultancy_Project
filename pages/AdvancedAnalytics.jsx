'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import { salesAPI, productsAPI } from '../../services/api';
import '../../styles/advanced-analytics.css';

export default function AdvancedAnalytics({ setIsAdminLoggedIn }) {
  const [activeTab, setActiveTab] = useState('sales');
  const [salesData, setSalesData] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [sales, products] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
      ]);

      // Process sales data for charts
      const processedSales = (sales.data || []).map((sale) => ({
        date: new Date(sale.date).toLocaleDateString(),
        revenue: sale.totalAmount,
      }));

      // Process product performance
      const processed = (products.data || []).map((product) => ({
        name: product.name,
        stock: product.inventory?.currentStock || 0,
        price: product.pricing?.sellingPrice || 0,
      }));

      setSalesData(processedSales);
      setProductPerformance(processed);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryData = [
    { name: 'Insecticide', value: 35 },
    { name: 'Herbicide', value: 25 },
    { name: 'Fungicide', value: 20 },
    { name: 'Others', value: 20 },
  ];

  const COLORS = ['#1e5a35', '#2d7a4f', '#7dd3c0', '#a7e8d5'];

  if (loading) {
    return (
      <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
        <div className="analytics-container">
          <div className="loading">Loading analytics data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="analytics-container">
        <h1 className="page-title">Advanced Analytics</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales Analysis
          </button>
          <button
            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Product Performance
          </button>
          <button
            className={`tab ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            Category Distribution
          </button>
          <button
            className={`tab ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            Trends & Forecasts
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Sales Analysis */}
          {activeTab === 'sales' && (
            <div className="analysis-section">
              <h2>Sales Analysis</h2>
              <div className="charts-row">
                <div className="chart-card">
                  <h3>Daily Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData.slice(0, 30)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#1e5a35"
                        strokeWidth={2}
                        dot={{ fill: '#1e5a35', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-card">
                  <h3>Revenue by Day</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData.slice(0, 7)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#1e5a35" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Product Performance */}
          {activeTab === 'products' && (
            <div className="analysis-section">
              <h2>Product Performance</h2>
              <div className="products-table">
                <div className="table-header">
                  <div className="col-name">Product Name</div>
                  <div className="col-stock">Stock</div>
                  <div className="col-price">Selling Price</div>
                  <div className="col-turnover">Stock Turnover</div>
                </div>
                {productPerformance.map((product, index) => (
                  <div key={index} className="table-row">
                    <div className="col-name">{product.name}</div>
                    <div className="col-stock">
                      <span className={product.stock > 50 ? 'good' : 'warning'}>
                        {product.stock} units
                      </span>
                    </div>
                    <div className="col-price">₹{product.price}</div>
                    <div className="col-turnover">Medium</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Distribution */}
          {activeTab === 'category' && (
            <div className="analysis-section">
              <h2>Category Distribution</h2>
              <div className="single-chart">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="category-stats">
                {categoryData.map((cat, index) => (
                  <div key={index} className="stat">
                    <div className="stat-color" style={{ background: COLORS[index] }}></div>
                    <div className="stat-label">{cat.name}</div>
                    <div className="stat-value">{cat.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trends & Forecasts */}
          {activeTab === 'trends' && (
            <div className="analysis-section">
              <h2>Trends & Forecasts</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <h3>Top Selling Product</h3>
                  <p className="value">Chlorpyrifos 20% EC</p>
                  <p className="detail">150 units sold this month</p>
                </div>
                <div className="insight-card">
                  <h3>Best Performing Category</h3>
                  <p className="value">Insecticide</p>
                  <p className="detail">35% of total sales</p>
                </div>
                <div className="insight-card">
                  <h3>Growth Rate</h3>
                  <p className="value">+12.5%</p>
                  <p className="detail">Compared to last month</p>
                </div>
                <div className="insight-card">
                  <h3>Average Sale Value</h3>
                  <p className="value">₹8,450</p>
                  <p className="detail">Per transaction</p>
                </div>
              </div>

              <div className="forecast-section">
                <h3>Demand Forecast (Next 30 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { day: 'Day 1-5', forecast: 45000 },
                    { day: 'Day 6-10', forecast: 52000 },
                    { day: 'Day 11-15', forecast: 58000 },
                    { day: 'Day 16-20', forecast: 61000 },
                    { day: 'Day 21-25', forecast: 68000 },
                    { day: 'Day 26-30', forecast: 75000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#2d7a4f"
                      strokeWidth={2}
                      name="Forecasted Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
