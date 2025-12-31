const lodash = require("lodash");

// An example of how to use a package with commonJS
const names = ["Buckaroo", "Buddo", "Buddy", "Boy"];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
