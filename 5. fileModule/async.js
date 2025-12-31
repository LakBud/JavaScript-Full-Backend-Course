import { appendFile, writeFile, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// * Doing synchronous code is recommended for production

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const dataFolder = path.join(dirName, "data");

// ? Creating text asynchronously

const asyncFilePath = path.join(dataFolder, "async-example.txt");

// First Alternative (not recommended)

// fs.writeFile(asyncFilePath, "Hello, Async node js", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Async file is created succesfully");
// });

// * Second Alternative (recommended)

await writeFile(asyncFilePath, "Hello, Async node.js");
console.log("Async file is created succesfully");

// * Reading file

const data = await readFile(asyncFilePath, "utf-8");
console.log(`Async file content: ${data}`);

// * Adding text

await appendFile(asyncFilePath, "\nThis is another file");
console.log("New line added to the file");

// * Reading file

const newData = await readFile(asyncFilePath, "utf-8");
console.log(newData);
