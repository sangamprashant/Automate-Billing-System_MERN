const mongoose = require("mongoose");
const User = require("./userModels");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    default: 0,
  },
  salesMan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["cash", "online"],
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerMobileNumber: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: String,
  },
  orderStatus: {
    type: String,
    default:"pending"
  },
  orderDetails: {
    productsDetails: {
      type: Array,
      required: true,
    },
    discountPercentagePerUnit: {
      type: Number,
      required: true,
    },
    discountAmountPerUnit: {
      type: Number,
      required: true,
    },
    totalDiscountGivenInOverall: {
      type: Number,
      required: true,
    },
    calculatedTotalDiscountOfAllDiscount: {
      type: Number,
      required: true,
    },
    selectItemsTotal: {
      type: Number,
      required: true,
    },
  },
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
