import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Example 1
function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayedGreet(name) {
  await delayFn(2000);
  console.log(name);
}

delayedGreet("Buddo");

// Example 2
async function division(num1, num2) {
  try {
    if (num2 === 0) throw new Error("Can not divide by 0");
    return num1 / num2;
  } catch (error) {
    console.error("error: ", error);
  }
}

async function mainFn() {
  console.log(await division(10, 2));
  console.log(await division(10, 0));
}

mainFn();

// Example 3
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const inputPath = path.join(dirName, "input.txt");

async function readFileSafe(file) {
  try {
    const data = await readFile(file, "utf-8");
    console.log(data);
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("File not found:", file);
    } else {
      console.error("Error reading file:", err);
    }
    return null;
  }
}

readFileSafe(inputPath);
