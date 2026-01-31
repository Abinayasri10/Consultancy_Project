const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['insecticide', 'herbicide', 'fungicide', 'plant_growth_regulator', 'bio_pesticide'],
      required: true,
    },
    state: {
      type: String,
      enum: ['liquid', 'solid', 'semi_solid', 'granular', 'powder'],
      required: true,
    },
    composition: {
      activeIngredient: String,
      concentration: String,
      formulationType: String,
    },
    inventory: {
      currentStock: {
        type: Number,
        default: 0,
      },
      unit: String,
      reorderLevel: Number,
      maxStockLevel: Number,
      batchNumber: String,
      manufacturingDate: Date,
      expiryDate: Date,
    },
    pricing: {
      costPrice: Number,
      sellingPrice: Number,
      mrp: Number,
      gst: Number,
      discountAllowed: Number,
    },
    supplier: {
      supplierId: mongoose.Schema.Types.ObjectId,
      name: String,
      contactPerson: String,
      phone: String,
    },
    safetyInfo: {
      toxicityClass: String,
      preharvestInterval: String,
      reentryPeriod: String,
    },
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'discontinued', 'out_of_stock'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
