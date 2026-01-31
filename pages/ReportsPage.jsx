'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard';
import '../../styles/reports-page.css';

export default function ReportsPage({ setIsAdminLoggedIn }) {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const handleDownloadReport = (type) => {
    alert(`Downloading ${type} report...`);
    // TODO: Implement actual PDF download
  };

  const reports = [
    {
      id: 1,
      title: 'Daily Sales Report',
      description: 'Summary of sales transactions for each day',
      icon: BarChart3,
      color: '#1e5a35',
    },
    {
      id: 2,
      title: 'Inventory Status',
      description: 'Current stock levels and movements',
      icon: PieChartIcon,
      color: '#ff6b6b',
    },
    {
      id: 3,
      title: 'Profit & Loss',
      description: 'Monthly P&L analysis',
      icon: TrendingUp,
      color: '#ffd93d',
    },
    {
      id: 4,
      title: 'Customer Analytics',
      description: 'Customer purchase patterns and retention',
      icon: BarChart3,
      color: '#4ecdc4',
    },
  ];

  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="reports-page">
        <div className="page-header">
          <h1>Reports & Analytics</h1>
          <p>Generate and analyze business intelligence reports</p>
        </div>

        {/* Tabs */}
        <div className="report-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales Reports
          </button>
          <button
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory Reports
          </button>
          <button
            className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom Reports
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <AnalyticsDashboard />
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="report-section">
              <div className="section-header">
                <h2>Sales Reports</h2>
                <div className="filter-group">
                  <div className="date-input">
                    <label>From Date</label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="date-input">
                    <label>To Date</label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <button className="btn btn-primary">
                    <Filter size={16} /> Apply Filter
                  </button>
                </div>
              </div>

              <div className="reports-grid">
                {reports.slice(0, 1).map((report) => {
                  const Icon = report.icon;
                  return (
                    <div key={report.id} className="report-card">
                      <div className="report-icon" style={{ backgroundColor: report.color }}>
                        <Icon size={28} color="white" />
                      </div>
                      <h3>{report.title}</h3>
                      <p>{report.description}</p>
                      <div className="report-stats">
                        <div className="stat">
                          <span className="label">Total Sales</span>
                          <span className="value">₹43.4L</span>
                        </div>
                        <div className="stat">
                          <span className="label">Orders</span>
                          <span className="value">1,254</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-small"
                        onClick={() => handleDownloadReport('Sales')}
                      >
                        <Download size={14} /> Download PDF
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Sales Table */}
              <div className="table-section">
                <h3>Recent Sales Transactions</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bill ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-01-31</td>
                      <td>BILL-2024-0001</td>
                      <td>Ramesh Kumar</td>
                      <td>₹6,500</td>
                      <td><span className="badge paid">Paid</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-31</td>
                      <td>BILL-2024-0002</td>
                      <td>Suresh Singh</td>
                      <td>₹8,200</td>
                      <td><span className="badge paid">Paid</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-31</td>
                      <td>BILL-2024-0003</td>
                      <td>Priya Sharma</td>
                      <td>₹5,400</td>
                      <td><span className="badge pending">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="report-section">
              <div className="section-header">
                <h2>Inventory Reports</h2>
              </div>

              <div className="reports-grid">
                {reports.slice(1, 2).map((report) => {
                  const Icon = report.icon;
                  return (
                    <div key={report.id} className="report-card">
                      <div className="report-icon" style={{ backgroundColor: report.color }}>
                        <Icon size={28} color="white" />
                      </div>
                      <h3>{report.title}</h3>
                      <p>{report.description}</p>
                      <div className="report-stats">
                        <div className="stat">
                          <span className="label">Total Stock Value</span>
                          <span className="value">₹12.5L</span>
                        </div>
                        <div className="stat">
                          <span className="label">Products</span>
                          <span className="value">45</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-small"
                        onClick={() => handleDownloadReport('Inventory')}
                      >
                        <Download size={14} /> Download PDF
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Inventory Summary */}
              <div className="table-section">
                <h3>Product Inventory Summary</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Current Stock</th>
                      <th>Reorder Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>PEST-2024-001</td>
                      <td>Chlorpyrifos 20% EC</td>
                      <td>500 L</td>
                      <td>100 L</td>
                      <td><span className="badge success">In Stock</span></td>
                    </tr>
                    <tr>
                      <td>PEST-2024-002</td>
                      <td>Mancozeb 75% WP</td>
                      <td>80 kg</td>
                      <td>50 kg</td>
                      <td><span className="badge warning">Low Stock</span></td>
                    </tr>
                    <tr>
                      <td>PEST-2024-003</td>
                      <td>Carbendazim 50% WP</td>
                      <td>0 kg</td>
                      <td>30 kg</td>
                      <td><span className="badge danger">Out of Stock</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="report-section">
              <div className="custom-report-form">
                <h2>Create Custom Report</h2>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Report Type</label>
                      <select>
                        <option value="">Select Report Type</option>
                        <option value="sales">Sales Analysis</option>
                        <option value="inventory">Inventory Analysis</option>
                        <option value="customer">Customer Report</option>
                        <option value="supplier">Supplier Performance</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Time Period</label>
                      <select>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Group By</label>
                      <select>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="category">Category</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Format</label>
                      <select>
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <FileText size={16} /> Generate Report
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
