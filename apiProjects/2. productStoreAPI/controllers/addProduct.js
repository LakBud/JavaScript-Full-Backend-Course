import { Product } from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const productFormData = req.body;

    const requiredFields = ["title", "price", "description", "category", "seller"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(",")}`,
      });
    }

    if (isNaN(req.body.price)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number",
      });
    }

    const newProduct = await Product.create(productFormData);

    return res.status(201).json({
      success: true,
      message: "New Product was added",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding new product",
      error: error.message,
    });
  }
};
