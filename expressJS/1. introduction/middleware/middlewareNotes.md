# Middleware in Express.js

Middleware in Express.js consists of functions that execute during the request-response cycle. Middleware has access to the request object, response object, and the next function, and is used to modify requests, responses, or control the flow of execution.

This note includes only middleware patterns used in real-world Express applications.

---

## Core Middleware Concepts (Always Used)

### Middleware Function Signature

Every middleware function follows the same signature.

(req, res, next) => {
next();
}

- req represents the HTTP request
- res represents the HTTP response
- next passes control to the next middleware

---

### Application-Level Middleware

Application-level middleware is registered on the app instance and runs for every request unless scoped.

const express = require("express");
const app = express();

app.use((req, res, next) => {
console.log(req.method, req.url);
next();
});

---

### Built-in Middleware (Always Used)

Express provides built-in middleware commonly used in production.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

These handle JSON and form data parsing.

---

### Route-Specific Middleware

Middleware can be applied to individual routes.

app.get("/dashboard", authMiddleware, (req, res) => {
res.send("Dashboard");
});

This is commonly used for authentication and authorization.

---

### Multiple Middleware Functions

Multiple middleware functions can be executed in sequence.

app.get(
"/profile",
authMiddleware,
roleMiddleware,
(req, res) => {
res.send("Profile");
}
);

Each middleware must call next() to continue.

---

## Error Handling Middleware (Always Used)

### Error Middleware Signature

Error-handling middleware has four parameters.

(err, req, res, next) => {
res.status(500).send("Server error");
}

---

### Global Error Handler

In production, applications use a centralized error handler.

app.use((err, req, res, next) => {
res.status(err.status || 500).json({
message: err.message
});
});

Error middleware must be defined after all routes.

---

## Modular Middleware (Always Used in Production)

### Middleware in Separate Files

Middleware logic is stored in separate files for reuse.

const authMiddleware = (req, res, next) => {
if (!req.user) {
return res.status(401).send("Unauthorized");
}
next();
};

module.exports = authMiddleware;

---

### Using Modular Middleware

const authMiddleware = require("./middleware/auth");

app.get("/admin", authMiddleware, (req, res) => {
res.send("Admin page");
});

---

## Middleware Patterns (Sometimes Used)

### Router-Level Middleware

Middleware can be applied to a router instead of the app.

const router = require("express").Router();

router.use(authMiddleware);

router.get("/settings", (req, res) => {
res.send("Settings");
});

---

### Conditional Middleware

Middleware can execute conditionally based on request data.

const optionalMiddleware = (req, res, next) => {
if (req.method === "POST") {
return next();
}
next();
};

---

### Third-Party Middleware

Production apps often use external middleware libraries.

Examples:

- cors
- helmet
- morgan
- compression

These are added using app.use().

---

## Request Flow Summary

1. Request enters the application
2. Application-level middleware runs
3. Route-level middleware runs
4. Route handler executes
5. Error middleware handles failures

---

## Summary

Middleware in Express.js:

- Runs during the request-response cycle
- Uses the (req, res, next) pattern
- Can be global or route-specific
- Is modular and reusable
- Handles cross-cutting concerns like auth and errors
