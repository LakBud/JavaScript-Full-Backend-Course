import { Product } from "../models/product.js";

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const selectedProduct = await Product.findByIdAndDelete(productId);

    if (!selectedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product is not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book has been deleted successfully",
      data: selectedProduct,
    });
  } catch (error) {
    console.log("Error deleting new product:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
