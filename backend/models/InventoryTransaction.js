const mongoose = require('mongoose');

const InventoryTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      default: () => 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      unique: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    type: {
      type: String,
      enum: ['purchase', 'sales', 'adjustment', 'return', 'damage'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: String,
    batchNumber: String,
    referenceId: String, // Bill ID or Purchase Order ID
    notes: String,
    previousStock: Number,
    newStock: Number,
    supplier: {
      name: String,
      contact: String,
    },
    reason: String, // For adjustments or damage
    cost: Number,
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('InventoryTransaction', InventoryTransactionSchema);
