import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const inputPath = path.join(dirName, "input.txt");

// Example of callback hell by using the not recommened way of making async code with files

fs.readFile(inputPath, "utf-8", (err, data) => {
  if (err) {
    console.error("File not found:", err);
    return;
  }

  const modifyFileData = data.toUpperCase();

  fs.writeFile("output.txt", modifyFileData, (err) => {
    if (err) {
      console.error("File not found:", err);
      return;
    }

    console.log("Data written to the new file");

    fs.readFile("output.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("File not found:", err);
        return;
      }

      console.log(data);
    });
  });
});
