import { Product } from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "All Products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    console.log("Error getting all Products:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching all products",
      error: error.message,
    });
  }
};

export const getSelectedProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const selectedProduct = await Product.findById(productId);

    if (!selectedProduct) {
      return res.status(404).json({
        success: false,
        message: "Selected product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Selected Product fetched successfully",
      data: selectedProduct,
    });
  } catch (error) {
    console.log("Error getting selected Products:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching selected products",
      error: error.message,
    });
  }
};
