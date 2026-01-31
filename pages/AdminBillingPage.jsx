'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import { pesticides } from '../data/pesticideData';
import { useLanguage } from '../context/LanguageContext';
import { Download, Trash2, Plus, User, Package, FileText, RefreshCcw, Landmark } from 'lucide-react';
import '../styles/billing.css';

export default function AdminBillingPage() {
  const { language, translations: t, setLanguage } = useLanguage();
  const [billItems, setBillItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [currentPesticide, setCurrentPesticide] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now()}`);

  const handleAddItem = () => {
    if (!currentPesticide || !currentQuantity) {
      alert('Please select pesticide and quantity');
      return;
    }
    const pesticide = pesticides.find(p => p.id === parseInt(currentPesticide));
    if (!pesticide) return;

    const newItem = {
      id: Date.now(),
      pesticide: pesticide.name,
      quantity: parseFloat(currentQuantity),
      unit: pesticide.unit,
      price: pesticide.price,
      amount: pesticide.price * parseFloat(currentQuantity)
    };

    setBillItems([...billItems, newItem]);
    setCurrentPesticide('');
    setCurrentQuantity('');
  };

  const handleRemoveItem = (itemId) => {
    setBillItems(billItems.filter(item => item.id !== itemId));
  };

  const calculateTotals = () => {
    const subtotal = billItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.05; 
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerPhone('');
    setBillItems([]);
    setInvoiceNo(`INV-${Date.now()}`);
  };

  const generatePDF = () => {
    const { subtotal, tax, total } = calculateTotals();
    const doc = new jsPDF();
    
    doc.setFillColor(64, 102, 97);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(185, 233, 55);
    doc.setFontSize(22);
    doc.text('ANAND AGRO AGENCIES', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Smart Agro Billing Platform | Intelligence in Every Drop', 105, 28, { align: 'center' });

    doc.setTextColor(26, 26, 26);
    doc.text(`Invoice No: ${invoiceNo}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 57);
    doc.text(`Customer: ${customerName}`, 20, 64);
    doc.text(`Phone: ${customerPhone}`, 20, 71);

    doc.setFillColor(64, 102, 97);
    doc.setTextColor(255, 255, 255);
    doc.rect(20, 80, 170, 8, 'F');
    doc.text('Product Name', 25, 85);
    doc.text('Qty', 100, 85);
    doc.text('Price', 145, 85);
    doc.text('Amount', 175, 85);

    doc.setTextColor(0, 0, 0);
    let currentY = 95;
    billItems.forEach((item) => {
      doc.text(item.pesticide, 25, currentY);
      doc.text(`${item.quantity} ${item.unit}`, 100, currentY);
      doc.text(`${item.price}`, 145, currentY);
      doc.text(`${item.amount.toFixed(2)}`, 175, currentY);
      currentY += 8;
    });

    doc.setFillColor(42, 169, 4);
    doc.rect(130, currentY + 10, 60, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(`TOTAL: RS. ${total.toFixed(2)}`, 135, currentY + 18);

    doc.save(`invoice_${invoiceNo}.pdf`);

   // --- UPDATED ANALYTICS LOGIC ---
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Create a complete order object that includes the items array
    const newOrder = { 
      invoiceNo, 
      date: new Date().toISOString(), 
      customerName, 
      customerPhone,
      items: billItems, // <--- CRITICAL: This allows Analytics to see WHAT was sold
      totals: { 
        subtotal, 
        tax, 
        total 
      } 
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the form after saving
    resetForm();
    // -------------------------------
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="billing-wrapper">
      <div className="billing-container">
        
        {/* Header */}
        <header className="billing-header">
          <div className="brand-info">
            <span className="agro-badge">Anand Intelligence</span>
            <h1>Agro <span className="green-text">Invoice</span></h1>
          </div>
          <select 
            className="lang-dropdown" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
          </select>
        </header>

        <div className="billing-main-grid">
          
          {/* Form Side */}
          <div className="form-stack">
            
            {/* Customer Section */}
            <div className="agro-card">
              <div className="card-top">
                <User size={18} /> <h3>Customer Details</h3>
              </div>
              <div className="card-body grid-2">
                <div className="input-box">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="Enter Farmer Name"
                  />
                </div>
                <div className="input-box">
                  <label>Contact Number</label>
                  <input 
                    type="text" 
                    value={customerPhone} 
                    onChange={(e) => setCustomerPhone(e.target.value)} 
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>
            </div>

            {/* Product Section */}
            <div className="agro-card">
              <div className="card-top">
                <Package size={18} /> <h3>Inventory Selection</h3>
              </div>
              <div className="card-body">
                <div className="grid-2">
                  <div className="input-box">
                    <label>Select Pesticide</label>
                    <select 
                      value={currentPesticide} 
                      onChange={(e) => setCurrentPesticide(e.target.value)}
                    >
                      <option value="">-- Select Product --</option>
                      {pesticides.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-box">
                    <label>Quantity</label>
                    <input 
                      type="number" 
                      value={currentQuantity} 
                      onChange={(e) => setCurrentQuantity(e.target.value)} 
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button className="add-btn" onClick={handleAddItem}>
                  <Plus size={18} /> Add to Invoice
                </button>
              </div>
            </div>

            {/* Items Table */}
            {billItems.length > 0 && (
              <div className="table-wrapper">
                <table className="agro-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {billItems.map(item => (
                      <tr key={item.id}>
                        <td className="bold-cell">{item.pesticide}</td>
                        <td>{item.quantity} {item.unit}</td>
                        <td>₹{item.price}</td>
                        <td className="green-text bold-cell">₹{item.amount.toFixed(2)}</td>
                        <td>
                          <button className="trash-btn" onClick={() => handleRemoveItem(item.id)}>
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

          {/* Summary Side */}
          <aside className="summary-sidebar">
            <div className="summary-card">
              <div className="summary-header">
                <FileText size={20} /> <h2>Invoice Summary</h2>
                <span className="inv-no">{invoiceNo}</span>
              </div>
              <div className="summary-body">
                <div className="sum-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="sum-row tax">
                  <span>GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="total-divider"></div>
                <div className="sum-row total">
                  <span>Grand Total</span>
                  <span className="grand-price">₹{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="summary-footer">
                <button 
                  className="download-btn" 
                  onClick={generatePDF}
                  disabled={!customerName || billItems.length === 0}
                >
                  <Download size={20} /> Download PDF
                </button>
                <button className="reset-btn" onClick={resetForm}>
                  <RefreshCcw size={16} /> Clear All
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}