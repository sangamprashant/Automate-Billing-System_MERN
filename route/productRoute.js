const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  CreateProductController,
  GetAllProductsController,
  GetProductsByCategoryController,
} = require("../controllers/productCtrl");
const router = express.Router();

//Create Category || POST
router.post("/create", authMiddleware, CreateProductController);

//get all products || GET
router.get("/get/all", authMiddleware, GetAllProductsController);

//get product by category
router.get('/category/:category',authMiddleware, GetProductsByCategoryController);

module.exports = router;
