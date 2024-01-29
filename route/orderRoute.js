const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Order = require("../models/orders");
const ProductModel = require("../models/product");
const { EmailBill } = require("../Email/bill");
const stripe = require("stripe")(process.env.STRIPE_SECRIT_KEY);

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
});

//router to make payment online
router.post("/online/create", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      salesMan,
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

    let line_items = [];
    for (const productDetails of savedOrder.orderDetails.productsDetails) {

      let discounted = productDetails.p_price - ((productDetails.p_price * Number(orderDetails.discountPercentagePerUnit)) / 100)
      discounted -= Number(orderDetails.discountAmountPerUnit)
    
      // Round to two decimal places
      // discounted = Number(discounted.toFixed(2));
      discounted = Number(discounted.toFixed(2));
    
      // Ensure productDetails.p_image is an array
      const images = Array.isArray(productDetails.p_image) ? productDetails.p_image : [productDetails.p_image];
    
      line_items.push({
        quantity: productDetails.p_count,
        price_data: {
          currency: "inr",
          product_data: {
            name: productDetails.p_name,
            images: images, // Ensure it's an array
          },
          unit_amount: discounted * 100,
        },
      });
    }
    console.log(line_items)
    if (newOrder._id) {
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: customerEmail,
        success_url: `${process.env.PUBLIC_DOMAIN}/cart?success=1`,
        cancel_url: `${process.env.PUBLIC_DOMAIN}/cart?failed=1`,
        metadata: { orderId: newOrder?._id.toString(), test: "ok" },
      });
      return res
        .status(200)
        .json({ message: "Payment session created", session });
    } else {
      console.log("no id of order");
    }

    //function to send Email to user
    // EmailBill(newOrder)


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


router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


module.exports = router;
