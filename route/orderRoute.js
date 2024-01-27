const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Order = require("../models/orders");
const ProductModel = require("../models/product");

const router = express.Router();

// Route to create an order using cash (POST)
router.post("/cash/create", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      salesMan,
      paymentMode,
      customerName,
      customerMobileNumber,
      customerEmail,
      orderDetails,
    } = req.body;


    //check for product avibility
    for (const productDetails of orderDetails.productsDetails) {
      const { _id, p_count } = productDetails;
      const product = await ProductModel.findById(_id);
      if (!product) {
        // Handle case where product is not found
        return res.status(404).json({
          success: false,
          message: `Product with ID ${_id} not found`,
        });
      }
      // Check if there is sufficient stock
      if (product.p_stock < p_count) {
        return res.status(404).json({
          success: false,
          message: `Insufficient stock for product with ID ${_id}`,
        });
      }
    }

    // Create a new order using the Order model if there is sufficient stocd for all prduct
    const maxOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const newOrder = new Order({
      orderId: maxOrder ? maxOrder.orderId + 1 : 1,
      salesMan,
      paymentMode,
      customerName,
      customerMobileNumber,
      customerEmail,
      orderDetails,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    //then save all other wise save none
    for (const productDetails of orderDetails.productsDetails) {
      const { _id, p_count } = productDetails;
      const product = await ProductModel.findById(_id);
      if (!product) {
        // Handle case where product is not found
        return res.status(404).json({
          success: false,
          message: `Product with ID ${_id} not found`,
        });
      }
      product.p_stock -= p_count;
      await product.save();
    }
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route to fetch an order by ID
router.get("/single/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
