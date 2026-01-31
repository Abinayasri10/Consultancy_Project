'use client';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  LogOut,
  Home,
  Warehouse,
  TrendingUp,
  UserCircle
} from 'lucide-react';
import "../../styles/admin-layout.css";

const AdminLayout = ({ children, setIsAdminLoggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { path: '/admin/products', label: 'Inventory', icon: Package },
    { path: '/admin/sales', label: 'Sales & Billing', icon: ShoppingCart },
    { path: '/admin/stock', label: 'Stock Management', icon: Warehouse },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/reports', label: 'Reports', icon: FileText },
    { path: '/admin/suppliers', label: 'Suppliers', icon: TrendingUp },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    navigate('/admin/login');
  };

  // Finds the label of the current path to display in the header
  const getCurrentPageLabel = () => {
    const item = menuItems.find(m => m.path === location.pathname);
    return item ? item.label : 'Admin Panel';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h2 className="sidebar-title">Smart Agro</h2>}
          <button
            className="adm-toggle-btn"
            style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="adm-sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`adm-nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="adm-logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="adm-main">
        <header className="adm-topbar">
          <div className="adm-header-left">
             {/* Show menu button on topbar only when sidebar is closed or on mobile */}
            {!sidebarOpen && (
               <button className="adm-icon-btn" onClick={() => setSidebarOpen(true)}>
                 <Menu size={20} />
               </button>
            )}
            <h1 className="adm-page-title">{getCurrentPageLabel()}</h1>
          </div>
          
          <div className="adm-topbar-actions">
            <div className="adm-profile-info">
              <span>System Admin</span>
              <UserCircle size={32} strokeWidth={1.5} />
            </div>
          </div>
        </header>

        <section className="adm-content-area">
          {children}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;