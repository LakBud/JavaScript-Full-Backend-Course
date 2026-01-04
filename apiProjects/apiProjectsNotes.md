# Node.js API Project Structure — In-Depth Notes

Building a **production-ready API** in Node.js typically involves a structured project with **separation of concerns**. This note explains the roles of controllers, models, routes, middlewares, helpers, environment configuration, and the entry point (`server.js`) using **Express.js** as an example.

---

## 1. Project Overview

A typical Node.js API project contains:

```
project/
│
├─ controllers/       # Route handlers / business logic
├─ models/            # Mongoose schemas or database models
├─ routes/            # Express route definitions
├─ middlewares/       # Custom middleware (auth, validation, logging)
├─ helpers/           # Utility functions
├─ config/            # Database connection and environment setup
├─ .env               # Environment variables
├─ server.js          # Entry point to start the server
└─ package.json       # Dependencies and scripts
```

**Purpose:** Separation of concerns improves **maintainability, scalability, and readability**.

---

## 2. server.js (Entry Point)

```js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse JSON bodies

app.use("/api/books", bookRoutes); // Mount routes

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

- Handles **environment variables**, **DB connection**, **middleware**, and **route mounting**.
- All requests pass through **middleware** and then hit **controllers**.

---

## 3. .env File

- Stores **sensitive configuration** like database URIs and API keys.
- Example:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/myDB
JWT_SECRET=mysecretkey
```

- Never commit `.env` to version control.
- Access via `process.env.VARIABLE_NAME`.

---

## 4. Models (Database Layer)

- Define the **structure of documents** in MongoDB or any database.
- Usually done with Mongoose in Node.js.

```js
// models/bookModel.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, min: 1 },
  published: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
```

- Models handle **data validation**, schema enforcement, and database operations.

---

## 5. Controllers (Business Logic Layer)

- Controllers contain **functions that handle HTTP requests** for specific routes.
- Keep controllers focused on **business logic**; database queries happen here.

```js
// controllers/bookController.js
import Book from "../models/bookModel.js";

export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err); // Pass error to error middleware
  }
};

export const createBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};
```

---

## 6. Routes (Routing Layer)

- Routes define **endpoints** and map them to **controllers**.
- Keeps route URLs separate from business logic.

```js
// routes/bookRoutes.js
import express from "express";
import { getBooks, createBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);

export default router;
```

- Route-level middleware can also be applied here.

---

## 7. Middleware

- Middleware functions **process requests** before they reach controllers.
- Common middleware types:
  - Logging requests
  - Authentication/authorization
  - Input validation
  - Global error handling

```js
// middlewares/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};
```

- Middleware improves **code reuse** and **separation of concerns**.

---

## 8. Helpers / Utility Functions

- Helpers contain **reusable logic** not specific to any route.
- Examples:
  - Generating unique IDs
  - Formatting dates
  - Password hashing or token generation

```js
// helpers/generateToken.js
import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
```

- Keeps controllers clean and focused.

---

## 9. Database Connection

- Use a separate file to handle **DB connection**.

```js
// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process on DB failure
  }
};

export default connectDB;
```

- Centralized DB connection makes it **easier to manage environments**.

---

## 10. Summary of Roles

| Layer / File   | Responsibility                                                            |
| -------------- | ------------------------------------------------------------------------- |
| `server.js`    | Entry point; loads environment, connects DB, mounts routes, starts server |
| `.env`         | Stores sensitive info and environment-specific configuration              |
| `models/`      | Defines database schema and data structure                                |
| `controllers/` | Contains business logic for routes; interacts with models                 |
| `routes/`      | Maps URLs and HTTP methods to controllers                                 |
| `middlewares/` | Functions that process requests (auth, logging, error handling)           |
| `helpers/`     | Utility functions shared across controllers                               |
| `config/`      | Database connections and environment-specific setup                       |

---

## 11. Best Practices

1. Separate **controllers, models, and routes**.
2. Use **async/await with try/catch** in controllers and forward errors to middleware.
3. Keep sensitive credentials in **.env**.
4. Use **middlewares for logging, auth, and error handling**.
5. Organize project for scalability and maintainability.

---

## 12. Request Flow (Mental Model)

1. Client sends HTTP request → `server.js`.
2. Request passes through **global middleware**.
3. Routed to the **correct route** → calls controller.
4. Controller interacts with **model/database**.
5. Controller returns **JSON response**.
6. Errors are handled by **error-handling middleware**.

---
