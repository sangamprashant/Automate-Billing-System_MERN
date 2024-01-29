require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRIT_KEY);

// Use cors middleware
app.use(cors());
const path = require("path");

// Parse JSON requests
app.use(express.json());

const mongoose = require("mongoose");

const categoryRoute = require("./route/categoryRoute");
const orderRoute = require("./route/orderRoute");
const productRoute = require("./route/productRoute");
const userRoute = require("./route/userRoute");
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

app.use(require("./try"));
const endpointSecret =
  "";
// Parse raw request body before the webhook route
app.use("/webhook", express.raw({ type: "application/json" }));
app.post("/webhook", (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  const payload = request.rawBody;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    console.error(`Raw Payload: ${payload}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DATABASE,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB database: ${process.env.MONGO_DATABASE}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err}`);
});

// Serve the frontend
// app.use(express.static(path.join(__dirname, "client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });
app.get("/", (req, res) => {
  res.send("Hello");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
