'use client';

import { useState } from 'react';
import { pesticides, categories } from '../data/pesticideData';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Search, Filter, X, Trash2 } from 'lucide-react';
import '../styles/pesticide-catalog.css';

export default function PesticideCatalogPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const filteredPesticides = pesticides.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (pesticide) => {
    const existingItem = cart.find(item => item.id === pesticide.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === pesticide.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...pesticide, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);

  return (
    <div className="catalog-wrapper">
      <div className="catalog-container">
        
        {/* Header Section */}
        <header className="catalog-header">
          <div className="brand-badge">Inventory Catalog</div>
          <h1>Solution <span className="green-text">Vault</span></h1>
          <p>Explore high-performance agricultural formulas for modern farming.</p>
        </header>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search brands or chemicals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="select-wrapper">
              <Filter size={16} className="filter-icon" />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Solutions</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>
            
            <button className="cart-toggle-btn">
               <ShoppingCart size={18} /> 
               <span>Cart: {cart.length}</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredPesticides.map(product => (
            <div key={product.id} className="product-card">
              <div className="card-image">
                <div className="cat-tag">{product.category}</div>
                <div className="price-tag">₹{product.price}</div>
              </div>
              <div className="card-content">
                <h3>{product.name}</h3>
                <p>{product.description || "Premium grade chemical solution for targeted crop protection."}</p>
                <div className="card-footer">
                  <span className="unit-label">{product.unit}</span>
                  <button onClick={() => handleAddToCart(product)} className="add-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cart Drawer */}
        {cart.length > 0 && (
          <div className="floating-cart">
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingCart size={20} />
                <span>Selected Items</span>
              </div>
              <button className="clear-all" onClick={() => setCart([])}>Clear All</button>
            </div>
            
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x{item.quantity}</span>
                  </div>
                  <div className="item-actions">
                    <span className="item-price">₹{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="total-row">
                <span>Total Amount</span>
                <span className="total-price">₹{cartTotal}</span>
              </div>
              <button className="checkout-btn" onClick={() => window.location.href='/billing'}>
                Proceed to Billing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}