require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = process.env.PORT || 5000;

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

// app.use(require("./try"));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DATABASE,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to MongoDB: ${err}`);
});

// Serve the frontend
app.use(express.static(path.join(__dirname, "billing-system/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "billing-system/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
