const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  CreateProductController,
  GetAllProductsController,
} = require("../controllers/productCtrl");
const router = express.Router();

//Create Category || POST
router.post("/create", authMiddleware, CreateProductController);

//get all products || GET
router.get("/get/all", authMiddleware, GetAllProductsController);

module.exports = router;
