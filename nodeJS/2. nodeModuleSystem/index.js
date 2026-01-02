// module.exports
// require

import { divide } from "./firstModule.js";

console.log(divide(10, 20));

try {
  let result = divide(100, 10);
  console.log(result);
} catch (error) {
  console.log("Caught an error:", error);
}

// Module Wrapper
// {
//     function(exports, require, module, __filename, __dirname){
//     Your module code goes here
//      }
// }
