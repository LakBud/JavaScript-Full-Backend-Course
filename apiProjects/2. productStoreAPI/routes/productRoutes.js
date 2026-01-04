import express from "express";
import { getAllProducts, getSelectedProduct } from "../controllers/getProduct.js";
import { addProduct } from "../controllers/addProduct.js";
import { updateProduct } from "../controllers/updateProduct.js";
import { deleteProduct } from "../controllers/deleteProduct.js";

// Router
export const router = express.Router();

// Routes
router.get("/", getAllProducts);
router.get("/:id", getSelectedProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
