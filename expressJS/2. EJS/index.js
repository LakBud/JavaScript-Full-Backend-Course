import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

// Setting ejs to the view engine
app.set("view engine", "ejs");
// set the directory for the views
app.set("views", path.join(dirName, "views"));

const products = [
  { id: 1, title: "Product 1" },
  { id: 2, title: "Product 2" },
  { id: 3, title: "Product 3" },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home page", products: products });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running with port: ${port}`);
});
