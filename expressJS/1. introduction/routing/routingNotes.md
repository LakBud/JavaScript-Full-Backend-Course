# Routing in Express.js

Routing in Express.js defines how an application responds to HTTP requests. In production applications, routing is responsible for mapping HTTP methods and URL paths to handler functions that execute application logic.

This note only includes syntax that is used in real-world Express applications.

---

## Core Routing Concepts (Always Used)

### Creating an Express Application

Every Express app starts by creating an application instance.

const express = require("express");
const app = express();

---

### Defining Routes

Routes are defined using HTTP method functions on the app object.

app.get("/", (req, res) => {
res.send("Home page");
});

Each route consists of:

- An HTTP method
- A URL path
- A handler function

---

### HTTP Methods (Always Used)

These methods are standard in production APIs.

app.get("/users", handler);
app.post("/users", handler);
app.put("/users/:id", handler);
app.delete("/users/:id", handler);

---

### Route Parameters (Always Used)

Route parameters allow dynamic values in URLs and are commonly used to identify resources.

app.get("/users/:id", (req, res) => {
const userId = req.params.id;
res.send(userId);
});

Route parameters are accessed using req.params.

---

### Query Parameters (Always Used)

Query parameters are used for filtering, searching, and pagination.

Example URL:
/users?page=1&limit=10

Example route:

app.get("/users", (req, res) => {
const page = req.query.page;
const limit = req.query.limit;
res.send({ page, limit });
});

Query parameters are accessed using req.query.

---

### Route Order (Always Used)

Express matches routes in the order they are defined.

app.get("/users/new", handler);
app.get("/users/:id", handler);

More specific routes must be defined before dynamic routes to avoid conflicts.

---

## Modular Routing (Always Used in Production)

### Express Router

In production applications, routes are split into multiple files using Express Router.

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
res.send("All users");
});

router.get("/:id", (req, res) => {
res.send("User details");
});

module.exports = router;

---

### Mounting Routers

Routers are mounted on a base path.

app.use("/users", require("./routes/users"));

This keeps the codebase organized and scalable.

---

## Routing Patterns (Sometimes Used)

### Route Grouping by Feature

Routes are grouped by domain or feature.

Examples:

- /users
- /products
- /orders

This pattern is common in larger applications.

---

### RESTful Routing Convention

This convention is widely used but not mandatory.

GET /users retrieves all users  
GET /users/:id retrieves one user  
POST /users creates a user  
PUT /users/:id updates a user  
DELETE /users/:id deletes a user

---

### Chained Route Definitions (Sometimes Used)

Multiple methods can be chained for the same route.

app.route("/users/:id")
.get(handler)
.put(handler)
.delete(handler);

This is used when multiple actions apply to the same path.

---

## Summary

Routing in Express.js:

- Maps HTTP methods and URLs to logic
- Uses app methods and routers
- Relies on route parameters and query parameters
- Follows predictable ordering rules
- Scales through modular route files
