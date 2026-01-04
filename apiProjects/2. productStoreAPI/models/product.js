import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product Title is required"],
    trim: true,
    maxLength: [20, "Product title cannot have more than 20 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product Price is required"],
  },
  description: {
    type: String,
    required: [false, "Product Description is not required"],
    trim: true,
    maxLength: [200, "Product Description cannot have more than 200 characters"],
  },
  seller: {
    type: String,
    required: [true, "Product must have a seller name"],
  },
  category: {
    type: String,
    required: [true, "Product must have a category"],
    trim: true,
    maxLength: [15, "Product category cannot have more than 15 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Product = mongoose.model("Product", productSchema);
