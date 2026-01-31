const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const Product = require('../models/Product');
const InventoryTransaction = require('../models/InventoryTransaction');

// Sales report
router.get('/sales', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = { status: 'completed' };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const sales = await Sales.find(filter).sort({ createdAt: -1 });

    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
    const totalGst = sales.reduce((sum, sale) => sum + (sale.gstTotal || 0), 0);
    const totalTransactions = sales.length;

    // Product-wise sales
    const productWiseSales = {};
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (!productWiseSales[item.productId]) {
          productWiseSales[item.productId] = {
            productName: item.productName,
            quantity: 0,
            revenue: 0,
          };
        }
        productWiseSales[item.productId].quantity += item.quantity;
        productWiseSales[item.productId].revenue += item.totalAmount;
      });
    });

    res.json({
      totalRevenue,
      totalGst,
      totalTransactions,
      sales,
      productWiseSales: Object.values(productWiseSales),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inventory report
router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find();

    const totalProductCount = products.length;
    const lowStockProducts = products.filter(
      p => p.inventory.currentStock <= p.inventory.reorderLevel
    );
    const totalInventoryValue = products.reduce(
      (sum, p) => sum + (p.inventory.currentStock * p.pricing.costPrice),
      0
    );

    const categoryWiseInventory = {};
    products.forEach(p => {
      if (!categoryWiseInventory[p.category]) {
        categoryWiseInventory[p.category] = {
          productCount: 0,
          totalStock: 0,
        };
      }
      categoryWiseInventory[p.category].productCount += 1;
      categoryWiseInventory[p.category].totalStock += p.inventory.currentStock;
    });

    res.json({
      totalProductCount,
      lowStockCount: lowStockProducts.length,
      totalInventoryValue,
      lowStockProducts,
      categoryWiseInventory,
      allProducts: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Profit & Loss report
router.get('/profit-loss', async (req, res) => {
  try {
    const sales = await Sales.find({ status: 'completed' });
    const transactions = await InventoryTransaction.find({ type: 'purchase' });

    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
    const totalCost = transactions.reduce((sum, txn) => sum + (txn.cost || 0), 0);
    const profit = totalRevenue - totalCost;
    const profitMargin = ((profit / totalRevenue) * 100).toFixed(2);

    res.json({
      totalRevenue,
      totalCost,
      profit,
      profitMargin,
      transactionCount: sales.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
