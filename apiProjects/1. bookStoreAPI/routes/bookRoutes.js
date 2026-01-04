import express from "express";
import { getAllBooks, getSingleBookById, addBook, updateBook, deleteBook } from "../controller/bookController.js";

// Create express Router
export const router = express.Router();

// All routes that are related to books only
router.get("/get", getAllBooks);
router.get("/get/:id", getSingleBookById);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
