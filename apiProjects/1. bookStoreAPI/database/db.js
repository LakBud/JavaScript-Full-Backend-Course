import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected succesfully!");
  } catch (error) {
    console.error("MongoDB Connection failed:", error);
    process.exit(1);
  }
};
