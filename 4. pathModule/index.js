import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);

// dirname = directory name
console.log(`Directory name: ${path.dirname(filename)}`);
// basename = file name
console.log(`File name: ${path.basename(filename)}`);
// extname = file extension (.js in this case)
console.log(`File Extension: ${path.extname(filename)}`);

// You can combines routes by using .join
const joinPath = path.join("/user", "documents", "node", "projects");

console.log(`Joined path: ${joinPath}`);

// resolves a path from the left to the right with .resolve
// This makes a absolute path
const resolvePath = path.resolve("user", "documents", "node", "project");

console.log(`Resolve Path: ${resolvePath}`);

// Normalizes a path by getting rid of . and ..
const normalizePath = path.normalize("/user/.documents/../node/projects");
console.log("Normalize Path: ", normalizePath);
