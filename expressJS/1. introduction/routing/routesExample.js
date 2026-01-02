import express from "express";
const app = express();

// * Root route

app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

// * Get all products
app.get("/products", (req, res) => {
  const products = [
    { id: 1, label: "Product-1" },
    { id: 2, label: "Product-2" },
    { id: 3, label: "Product-3" },
  ];

  res.json(products);
});

// * Get a single product
app.get("/products/:id", (req, res) => {
  console.log("req.params:", req.params);
  const productId = parseInt(req.params.id);

  const products = [
    { id: 1, label: "Product-1" },
    { id: 2, label: "Product-2" },
    { id: 3, label: "Product-3" },
  ];

  const getSingleProduct = products.find((product) => product.id === productId);

  if (getSingleProduct) {
    res.json(getSingleProduct);
  } else {
    res.status(404).send("404 | Product is not found");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running with port: ${port}`);
});
