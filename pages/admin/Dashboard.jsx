'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import MetricCard from '../../components/admin/MetricCard';
import SalesChart from '../../components/admin/SalesChart';
import InventoryChart from '../../components/admin/InventoryChart';
import { salesAPI, inventoryAPI } from '../../services/api';
import '../../styles/admin-dashboard.css';

export default function AdminDashboard({ setIsAdminLoggedIn }) {
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    totalSales: 0,
    activeProducts: 0,
    lowStockAlerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [salesData, inventoryAlerts] = await Promise.all([
        salesAPI.getDashboard(),
        inventoryAPI.getLowStockAlerts(),
      ]);

      setMetrics({
        todayRevenue: salesData.data.todaySales.totalRevenue || 0,
        totalSales: salesData.data.todaySales.count || 0,
        activeProducts: 150, // This would come from actual API
        lowStockAlerts: inventoryAlerts.data.length || 0,
      });

      setChartData(salesData.data.monthlyRevenue || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <MetricCard
            title="Today's Revenue"
            value={`₹${metrics.todayRevenue.toLocaleString()}`}
            icon={TrendingUp}
            color="green"
            change="+12.5%"
          />
          <MetricCard
            title="Total Sales"
            value={metrics.totalSales}
            icon={ShoppingCart}
            color="blue"
            change="+8.2%"
          />
          <MetricCard
            title="Active Products"
            value={metrics.activeProducts}
            icon={Package}
            color="orange"
            change="+4.3%"
          />
          <MetricCard
            title="Low Stock Alerts"
            value={metrics.lowStockAlerts}
            icon={AlertTriangle}
            color="red"
            change={`${metrics.lowStockAlerts} items`}
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <h2 className="chart-title">Monthly Sales Trend</h2>
            <SalesChart data={chartData} />
          </div>
          <div className="chart-card">
            <h2 className="chart-title">Inventory Status</h2>
            <InventoryChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2 className="activity-title">Recent Transactions</h2>
          <div className="activity-table">
            <div className="table-header">
              <div className="table-cell">Product</div>
              <div className="table-cell">Type</div>
              <div className="table-cell">Quantity</div>
              <div className="table-cell">Date</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Chlorpyrifos 20% EC</div>
              <div className="table-cell">
                <span className="badge purchase">Purchase</span>
              </div>
              <div className="table-cell">500 L</div>
              <div className="table-cell">Today</div>
            </div>
            <div className="table-row">
              <div className="table-cell">Mancozeb 75% WP</div>
              <div className="table-cell">
                <span className="badge sales">Sales</span>
              </div>
              <div className="table-cell">50 kg</div>
              <div className="table-cell">Today</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
