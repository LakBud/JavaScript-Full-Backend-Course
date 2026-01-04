import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDB } from "./database/db.js";
import { router as productRouter } from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to our database
connectToDB();

// Middleware -> JSON
app.use(express.json());

// Routes
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running with the port: ${PORT}`);
});
