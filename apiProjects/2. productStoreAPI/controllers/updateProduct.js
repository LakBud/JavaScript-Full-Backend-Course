import { Product } from "../models/product.js";

export const updateProduct = async (req, res) => {
  try {
    const productFormData = req.body;
    const bookId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(bookId, productFormData, { new: true, runValidators: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product is not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Selected Product is updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};
