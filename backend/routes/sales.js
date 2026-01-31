const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const Product = require('../models/Product');
const InventoryTransaction = require('../models/Inventory');

// Get all sales
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    if (status) query.status = status;

    const sales = await Sales.find(query)
      .populate('staffId', 'name email')
      .sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single sale
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id).populate('staffId');
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create sale
router.post('/', async (req, res) => {
  try {
    const billId = `BILL-${Date.now()}`;
    const salesData = {
      ...req.body,
      billId,
    };

    // Update inventory
    for (const item of req.body.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const previousStock = product.inventory.currentStock;
        product.inventory.currentStock -= item.quantity;
        await product.save();

        // Create inventory transaction
        const transaction = new InventoryTransaction({
          transactionId: `INV-${Date.now()}-${Math.random()}`,
          productId: item.productId,
          type: 'sales',
          quantity: item.quantity,
          previousStock,
          currentStock: product.inventory.currentStock,
          referenceId: billId,
        });
        await transaction.save();
      }
    }

    const sale = new Sales(salesData);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get sales analytics
router.get('/analytics/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = await Sales.aggregate([
      {
        $match: {
          date: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyRevenue = await Sales.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      todaySales: todaySales[0] || { totalRevenue: 0, count: 0 },
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
