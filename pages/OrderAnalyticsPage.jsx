'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { Download, Package, Users, DollarSign, Activity } from 'lucide-react';
import '../styles/order-analytics.css';

export default function OrderAnalyticsPage() {
  const { language, setLanguage } = useLanguage();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  // Updated Calculation: Sums up quantities across all items in all orders
  const calculateStats = () => {
    return orders.reduce((acc, order) => {
      const total = order.totals?.total || 0;
      // We calculate total quantity of all items sold
      const itemsQty = order.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0;
      
      acc.totalRevenue += total;
      acc.totalItemsSold += itemsQty;
      return acc;
    }, { totalRevenue: 0, totalItemsSold: 0 });
  };

  const prepareChartData = () => {
    const salesByDate = {};
    const productSalesMap = {};

    orders.forEach(order => {
      // Date Trend Logic
      const date = new Date(order.date).toLocaleDateString();
      salesByDate[date] = (salesByDate[date] || 0) + (order.totals?.total || 0);

      // Per Product Logic
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          productSalesMap[item.pesticide] = (productSalesMap[item.pesticide] || 0) + (Number(item.quantity) || 0);
        });
      }
    });

    return {
      salesByDate: Object.entries(salesByDate).map(([date, amount]) => ({ date, amount })),
      productData: Object.entries(productSalesMap).map(([name, value]) => ({ 
        name: name.split(' ')[0], // Short name for chart
        fullName: name,
        quantity: value 
      }))
    };
  };

  const { totalRevenue, totalItemsSold } = calculateStats();
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const { salesByDate, productData } = prepareChartData();

  const exportToCSV = () => {
    const headers = ['Invoice', 'Customer', 'Products', 'Date', 'Total'];
    const rows = orders.map(o => [
      o.invoiceNo, 
      o.customerName, 
      o.items?.map(i => i.pesticide).join(' | '),
      new Date(o.date).toLocaleDateString(), 
      o.totals?.total || 0
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agro_sales_report.csv`;
    a.click();
  };

  return (
    <div className="analytics-wrapper">
      <div className="analytics-container">
        
        <header className="analytics-header">
          <div className="header-titles">
            <span className="agro-badge">Live Inventory Insights</span>
            <h1>Sales <span className="green-text">Intelligence</span></h1>
          </div>
          <div className="header-actions">
            <select className="lang-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
            <button className="csv-btn" onClick={exportToCSV}>
              <Download size={18} /> Export CSV
            </button>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon"><DollarSign /></div>
            <div className="stat-info">
              <label>Total Revenue</label>
              <div className="value">₹{totalRevenue.toLocaleString()}</div>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon"><Activity /></div>
            <div className="stat-info">
              <label>Orders count</label>
              <div className="value">{totalOrders}</div>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon"><Users /></div>
            <div className="stat-info">
              <label>Avg. Order Value</label>
              <div className="value">₹{avgOrderValue.toFixed(0)}</div>
            </div>
          </div>
          <div className="stat-card orange">
            <div className="stat-icon"><Package /></div>
            <div className="stat-info">
              <label>Total Qty Sold</label>
              <div className="value">{totalItemsSold} Units</div>
            </div>
          </div>
        </div>

        <div className="charts-main-grid">
          <div className="chart-container">
            <h3>Revenue Growth</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesByDate}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#2aa904" strokeWidth={4} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <h3>Product-wise Sales (Quantity)</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={12} />
                  <Tooltip labelKey="fullName" />
                  <Bar dataKey="quantity" fill="#406661" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="analytics-table-card">
          <div className="table-header">
            <h3 style={{ color: "white", fontWeight: "600" }}>Customer Transaction History</h3>

          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Products Purchased</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice().reverse().map((order, i) => (
                  <tr key={i}>
                    <td><span className="inv-pill">{order.invoiceNo}</span></td>
                    <td className="font-bold">{order.customerName}</td>
                    <td>
                      <div className="product-list-cell">
                        {order.items?.map((item, idx) => (
                          <span key={idx} className="prod-tag">{item.pesticide} ({item.quantity})</span>
                        ))}
                      </div>
                    </td>
                    <td className="green-text font-bold">₹{order.totals?.total?.toFixed(2)}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}