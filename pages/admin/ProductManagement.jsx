'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';
import { productsAPI } from '../../services/api';
import '../../styles/product-management.css';

export default function ProductManagement({ setIsAdminLoggedIn }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER ---------------- */
  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.productId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  /* ---------------- SAVE (CREATE/UPDATE) ---------------- */
  const handleSaveProduct = async (productData) => {
  try {
    const formattedData = {
      productId: productData.productId,
      name: productData.name,
      category: productData.category,

      pricing: {
        sellingPrice: Number(productData.sellingPrice)
      },

      inventory: {
        currentStock: Number(productData.currentStock),
        reorderLevel: Number(productData.reorderLevel || 10),
        unit: productData.unit || "kg"
      }
    };

    if (editingProduct) {
      await productsAPI.update(editingProduct._id, formattedData);
    } else {
      await productsAPI.create(formattedData);
    }

    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
    alert("Product saved successfully!");
  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Error saving product");
  }
};


  /* ---------------- DELETE ---------------- */
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(productId);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  /* ================= FORM VIEW ================= */
  if (showForm) {
    return (
      <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
        <ProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}  
          onCancel={handleCloseForm}
        />
      </AdminLayout>
    );
  }

  /* ================= TABLE VIEW ================= */
  return (
    <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
      <div className="product-management">
        <div className="page-header">
          <h1>Product Management</h1>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          >
            <Plus size={20} /> Add New Product
          </button>
        </div>

        {/* ---------- Filters ---------- */}
        <div className="filters-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by product name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="insecticide">Insecticide</option>
            <option value="herbicide">Herbicide</option>
            <option value="fungicide">Fungicide</option>
            <option value="plant_growth_regulator">Plant Growth Regulator</option>
            <option value="bio_pesticide">Bio-Pesticide</option>
          </select>
        </div>

        {/* ---------- Table ---------- */}
        <div className="products-table-container">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-table">
              <div className="table-header">
                <div className="col-id">Product ID</div>
                <div className="col-name">Product Name</div>
                <div className="col-category">Category</div>
                <div className="col-price">Price</div>
                <div className="col-stock">Stock</div>
                <div className="col-actions">Actions</div>
              </div>

              {filteredProducts.map((product) => (
                <div key={product._id} className="table-row">
                  <div className="col-id">{product.productId}</div>
                  <div className="col-name">{product.name}</div>

                  <div className="col-category">
                    <span className="category-badge">{product.category}</span>
                  </div>

                  <div className="col-price">
                    ₹{product.pricing?.sellingPrice}
                  </div>

                  <div className="col-stock">
                    <span
                      className={`stock-badge ${
                        product.inventory?.currentStock >
                        product.inventory?.reorderLevel
                          ? 'in-stock'
                          : 'low-stock'
                      }`}
                    >
                      {product.inventory?.currentStock} {product.inventory?.unit}
                    </span>
                  </div>

                  <div className="col-actions">
                    <button
                      className="btn-icon edit"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      className="btn-icon delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
