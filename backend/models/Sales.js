const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema(
  {
    billId: {
      type: String,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    customerInfo: {
      farmerId: String,
      name: String,
      phone: String,
      village: String,
      landSize: String,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        productName: String,
        quantity: Number,
        unit: String,
        pricePerUnit: Number,
        discount: Number,
        gstAmount: Number,
        totalAmount: Number,
      },
    ],
    payment: {
      method: {
        type: String,
        enum: ['cash', 'upi', 'card', 'credit'],
        default: 'cash',
      },
      status: {
        type: String,
        enum: ['paid', 'pending', 'overdue'],
        default: 'paid',
      },
      creditDays: {
        type: Number,
        default: 0,
      },
    },
    totalAmount: Number,
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'cancelled'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sales', SalesSchema);
