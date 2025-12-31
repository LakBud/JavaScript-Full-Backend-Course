import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ! Doing synchronous code is not recommened for production code.

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// * Synchronous way of creating dir

// Creates a datafolder by joining the data folder to the directory name
const dataFolder = path.join(dirName, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data folder created");
}

// * Synchronous way of creating files

const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello from node.js");
console.log("File created!");

// * Synchronous way of reading files
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log(`File content: ${readContentFromFile}`);

fs.appendFileSync(filePath, "\nThis is a new line added to the file");
console.log("New file content added!");
