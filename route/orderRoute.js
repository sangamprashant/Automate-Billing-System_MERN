const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  operatorOrders,
  orderCount,
  detailsModeStatus,
  singleOrderId,
  paymentSuccess,
  onlineCreate,
  cashCreate,
} = require("../controllers/orderCtrl");

const router = express.Router();

// Route to create an order using cash (POST)
router.post("/cash/create", authMiddleware, cashCreate);

//router to make payment online
router.post("/online/create", authMiddleware, onlineCreate);

router.post("/payment/success", authMiddleware, paymentSuccess);

// Route to fetch an order by ID
router.get("/single/:orderId", singleOrderId);

// getting oredes by status and mode
router.get("/details/:mode/:status", authMiddleware, detailsModeStatus);

// Route to get order counts by payment mode and order status
router.get("/orderCounts", orderCount);

// Router to get the order made by operator
router.post("/operator/order", operatorOrders);

module.exports = router;
