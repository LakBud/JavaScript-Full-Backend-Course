import { URL, fileURLToPath } from "url";
import path from "path";

// Methods with URL
const myURL = new URL("https://www.example.com:8080/p/a/t/h?query=string#hash");
// console.log(myURL.hash);
// console.log(myURL.host);
// console.log(myURL.hostname);
// console.log(myURL.port);
// console.log(myURL.href);
// console.log(myURL.protocol);
// console.log(myURL.search);
// console.log(myURL.searchParams);

// Both works the same
// console.log(myURL.toJSON());
// console.log(myURL.toString());

// Filename, dirname
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
console.log(fileName);
console.log(dirName);
