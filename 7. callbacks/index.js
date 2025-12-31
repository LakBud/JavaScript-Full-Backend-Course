import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log(address);
}

person("Buddo", address);

// -----------------------------------

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const inputPath = path.join(dirName, "input.txt");

fs.readFile(inputPath, "utf-8", (err, data) => {
  if (err) {
    console.error("File not found:", err);
    return;
  }
  console.log(data);
});
