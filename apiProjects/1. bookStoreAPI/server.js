import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDB } from "./database/db.js";
import { router as bookRouter } from "./routes/bookRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to our database
connectToDB();

// Middleware -> express.json
app.use(express.json());

// Routes
app.use("/api/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is now running on port: ${PORT}`);
});
