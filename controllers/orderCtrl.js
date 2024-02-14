const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Order = require("../models/orders");
const ProductModel = require("../models/product");
const { EmailBill } = require("../Email/bill");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const userModel = require("../models/userModels");

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Route to create an order using cash (POST)
const cashCreate = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      userId: salesMan,
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

    const date = new Date();
    const DataIN_DD_MM_YYYY = date.toLocaleString();
    // Create a new order using the Order model if there is sufficient stocd for all prduct
    const maxOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const newOrder = new Order({
      orderId: maxOrder ? maxOrder.orderId + 1 : 1,
      purchaseDate: DataIN_DD_MM_YYYY,
      salesMan,
      paymentMode: "cash",
      orderStatus: "success",
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

    // Update user profile with order ID
    const user = await userModel.findById(salesMan);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${salesMan} not found`,
      });
    }

    // Add order ID to user's orders array
    user.orders.push(savedOrder._id);
    try {
      await user.save();
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update user profile",
      });
    }

    //function to send Email to user
    EmailBill(newOrder);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//router to make payment online
const onlineCreate = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      userId: salesMan,
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

    const date = new Date();
    const DataIN_DD_MM_YYYY = date.toLocaleString();
    // Create a new order using the Order model if there is sufficient stocd for all prduct
    const maxOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const newOrder = new Order({
      orderId: maxOrder ? maxOrder.orderId + 1 : 1,
      purchaseDate: DataIN_DD_MM_YYYY,
      salesMan,
      paymentMode: "online",
      orderStatus: "pending",
      customerName,
      customerMobileNumber,
      customerEmail,
      orderDetails,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Update user profile with order ID
    const user = await userModel.findById(salesMan);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${salesMan} not found`,
      });
    }

    // Add order ID to user's orders array
    user.orders.push(savedOrder._id);
    try {
      await user.save();
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update user profile",
      });
    }

    let total = Number(
      (
        orderDetails.selectItemsTotal -
        orderDetails.calculatedTotalDiscountOfAllDiscount
      ).toFixed(2)
    );
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Amount in paise needed to be multiplied
      currency: "INR",
      receipt: savedOrder._id.toString(),
    });

    return res
      .status(200)
      .json({ message: "Payment session created", razorpayOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      receipt,
    } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res
        .status(400)
        .json({ success: false, message: "Transaction not legit!" });

    const order = await Order.findOne({ _id: receipt });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update the order status to "success"
    order.orderStatus = "success";
    await order.save();

    // Reduce the stock of each product in the order
    for (const productDetails of order.orderDetails.productsDetails) {
      const { _id, p_count } = productDetails;
      const product = await ProductModel.findById(_id);

      if (!product) {
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

      // Reduce the stock
      product.p_stock -= p_count;
      await product.save();
    }

    // Responding with a success message and relevant details
    EmailBill(order);
    res.json({
      message: "Payment done.",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      success: true,
      order: order,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route to fetch an order by ID
const singleOrderId = async (req, res) => {
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
};

// getting oredes by status and mode
const detailsModeStatus = async (req, res) => {
  try {
    const { mode, status } = req.params;
    const orders = await Order.find({
      paymentMode: mode,
      orderStatus: status,
    });

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      orders: orders.reverse(),
    });
  } catch (error) {
    console.log("Falied to fetch the orders", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Route to get order counts by payment mode and order status
const orderCount = async (req, res) => {
  try {
    const orderCounts = await Order.aggregate([
      {
        $group: {
          _id: {
            paymentMode: "$paymentMode",
            orderStatus: "$orderStatus",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({ success: true, count: orderCounts });
  } catch (error) {
    console.error("Error fetching order counts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Router to get the order made by operator
const operatorOrders = async (req, res) => {
  try {
    const ids = req.body.ids;
    // Find products based on the provided product IDs
    const orders = await Order.find({ _id: { $in: ids } });
    // Filter out products that were not found (empty array)
    const existingOrders = orders.filter((order) => order);
    res.status(200).json({
      success: true,
      orders: existingOrders,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to get products" });
  }
};

module.exports = {
  cashCreate,
  onlineCreate,
  paymentSuccess,
  singleOrderId,
  detailsModeStatus,
  orderCount,
  operatorOrders,
};
