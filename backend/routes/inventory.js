const express = require('express');
const router = express.Router();
const InventoryTransaction = require('../models/Inventory');
const Product = require('../models/Product');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    let query = {};

    if (type) query.type = type;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await InventoryTransaction.find(query)
      .populate('productId', 'name productId')
      .sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase entry
router.post('/purchase', async (req, res) => {
  try {
    const { productId, quantity, batchNumber, expiryDate, costPrice } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const previousStock = product.inventory.currentStock;
    product.inventory.currentStock += quantity;
    product.inventory.batchNumber = batchNumber;
    product.inventory.expiryDate = expiryDate;
    product.pricing.costPrice = costPrice;

    await product.save();

    const transaction = new InventoryTransaction({
      transactionId: `INV-${Date.now()}`,
      productId,
      type: 'purchase',
      quantity,
      previousStock,
      currentStock: product.inventory.currentStock,
      batchNumber,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Stock adjustment
router.post('/adjustment', async (req, res) => {
  try {
    const { productId, quantity, reason } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const previousStock = product.inventory.currentStock;
    product.inventory.currentStock += quantity;
    await product.save();

    const transaction = new InventoryTransaction({
      transactionId: `INV-${Date.now()}`,
      productId,
      type: 'adjustment',
      quantity,
      previousStock,
      currentStock: product.inventory.currentStock,
      notes: reason,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get low stock items
router.get('/alerts/low-stock', async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$inventory.currentStock', '$inventory.reorderLevel'] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get expiry alerts
router.get('/alerts/expiry', async (req, res) => {
  try {
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    const products = await Product.find({
      'inventory.expiryDate': {
        $lte: sixMonthsFromNow,
        $gte: new Date(),
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
