const userModel = require("../models/userModels");
const CategoryModel = require("../models/categories");
const ProductModel = require("../models/product");

const CreateProductController = async (req, res) => {
  try {
    const { p_name, p_category, p_price, p_stock, p_image } = req.body;
    if (!p_name || !p_category || !p_price || !p_stock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await userModel.findById(req.body.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin users are allowed to create products",
      });
    }
    const maxProductId = await ProductModel.findOne({}, {}, { sort: { 'p_id': -1 } });
    const newProduct = new ProductModel({
      p_id: maxProductId ? maxProductId.p_id + 1 : 1,
      p_name,
      p_category,
      p_price,
      p_stock,
      p_image,
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

//get all products
const GetAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

module.exports = {
  CreateProductController,
  GetAllProductsController,
};
