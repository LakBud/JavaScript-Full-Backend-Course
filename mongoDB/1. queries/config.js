import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Enviromental variables are used to hide data which is only meant to be private.
// To create a env with raw node, create a env folder and set your cluster url as the "DB_URL"
// Afterwards export a variable to the process.env.DB_URL with dotenv package
// Remember to include .env or .env.local in the git ignore so that you dont share your private variables to the world

// Creating the path for the env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env.local");

// Fail if the file doesn't exist
if (!fs.existsSync(envPath)) {
  throw new Error(`.env.local file not found at ${envPath}`);
}

// Load dotenv
dotenv.config({ path: envPath });

// export a variable to the url
export const DB_URL = process.env.DB_URL;
