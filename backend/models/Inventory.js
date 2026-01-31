const mongoose = require('mongoose');

const InventoryTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
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
    referenceId: String, // Bill ID or PO ID
    previousStock: Number,
    currentStock: Number,
    notes: String,
    batchNumber: String,
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InventoryTransaction', InventoryTransactionSchema);
