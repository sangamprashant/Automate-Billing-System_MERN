const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  CreateCategoryController,
  GetAllCategoriesController,
  DeleteCategoryController,
} = require("../controllers/categoryCtrl");
const router = express.Router();

//Create Category || POST
router.post("/create", authMiddleware, CreateCategoryController);

//get all cetogris in alphabetical order || GET
router.get("/get", authMiddleware, GetAllCategoriesController);

router.delete("/delete/:categoryId", authMiddleware, DeleteCategoryController);

module.exports = router;
