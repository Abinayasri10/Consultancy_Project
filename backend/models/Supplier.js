const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema(
  {
    supplierId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactPerson: String,
    email: String,
    phone: {
      type: String,
      required: true,
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
    paymentTerms: String,
    averageLeadTime: Number,
    metrics: {
      onTimeDelivery: {
        type: Number,
        default: 0,
      },
      qualityScore: {
        type: Number,
        default: 0,
      },
      priceCompetitiveness: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Supplier', SupplierSchema);
