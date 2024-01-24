const userModel = require("../models/userModels");
const CategoryModel = require("../models/categories");

const CreateCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    const user = await userModel.findById(req.body.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin users are allowed to create categories",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    // Case-insensitive query to check if the category name already exists
    const existingCategory = await CategoryModel.findOne({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category name already exists",
      });
    }
    const newCategory = new CategoryModel({
      category,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category added successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

const GetAllCategoriesController = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ category: 1 });
    res.status(200).json({
      success: true,
      categories: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

const DeleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const user = await userModel.findById(req.body.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin users are allowed to perform this action",
      });
    }
    CategoryModel.findByIdAndDelete(categoryId)
      .then((deletedCategory) => {
        if (!deletedCategory) {
          return res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
        res.status(200).json({
          success: true,
          message: "Category deleted successfully",
        });
      })
      .catch((error) => {
        console.log("Failed to delete:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to delete category",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};

module.exports = {
  CreateCategoryController,
  GetAllCategoriesController,
  DeleteCategoryController,
};
