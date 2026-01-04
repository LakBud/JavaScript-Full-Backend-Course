import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB has connected successfully!");
  } catch (error) {
    console.error("MongoDB connection has failed:", error);
    process.exit(1);
  }
};
