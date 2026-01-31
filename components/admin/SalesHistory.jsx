'use client';

import React from 'react';
import { Eye, Download, Trash2, Printer } from 'lucide-react';
import '../styles/sales-history.css';

const SalesHistory = ({ sales, onPrint, onDelete }) => {
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'credit':
        return '#3b82f6';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="sales-history-container">
      <div className="sales-table-wrapper">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Amount</th>
              <th>GST</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales && sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.billId}>
                  <td className="bill-id">{sale.billId}</td>
                  <td>{sale.date}</td>
                  <td className="customer-name">
                    <div>
                      <p className="name">{sale.customerName}</p>
                      {sale.customerVillage && (
                        <p className="village">{sale.customerVillage}</p>
                      )}
                    </div>
                  </td>
                  <td className="phone">{sale.customerPhone}</td>
                  <td className="items-count">
                    <span className="badge">{sale.items?.length || 0}</span>
                  </td>
                  <td className="amount">₹{sale.subtotal?.toFixed(2) || '0.00'}</td>
                  <td className="gst">₹{sale.gstAmount?.toFixed(2) || '0.00'}</td>
                  <td className="total-amount">
                    <strong>₹{sale.totalAmount?.toFixed(2) || '0.00'}</strong>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getPaymentStatusColor(sale.paymentStatus) }}
                    >
                      {sale.paymentStatus}
                    </span>
                  </td>
                  <td className="payment-method">
                    <span className="method-badge">{sale.paymentMethod}</span>
                  </td>
                  <td className="actions">
                    <button
                      className="action-btn print"
                      onClick={() => onPrint(sale)}
                      title="Print"
                    >
                      <Printer size={18} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => onDelete(sale.billId)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
                  No sales found. Create a new bill to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sales && sales.length > 0 && (
        <div className="sales-summary">
          <div className="summary-card">
            <h4>Total Transactions</h4>
            <p className="summary-value">{sales.length}</p>
          </div>
          <div className="summary-card">
            <h4>Total Revenue</h4>
            <p className="summary-value">
              ₹{sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="summary-card">
            <h4>Paid Orders</h4>
            <p className="summary-value">
              {sales.filter((s) => s.paymentStatus === 'paid').length}
            </p>
          </div>
          <div className="summary-card">
            <h4>Credit Orders</h4>
            <p className="summary-value warning">
              {sales.filter((s) => s.paymentStatus === 'credit').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesHistory;
