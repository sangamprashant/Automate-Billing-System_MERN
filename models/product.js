const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    p_id: {
      type: Number,
      required: true,
    },
    p_name: {
      type: String,
      required: true,
    },
    p_category: {
      type: String,
      required: true,
    },
    p_price: {
      type: Number,
      required: true,
      min: 0,
    },
    p_stock: {
      type: Number,
      required: true,
      min: 0,
    },
    p_image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
