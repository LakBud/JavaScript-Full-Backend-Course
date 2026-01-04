# Mongoose — Connecting and Schemas (Short Note)

Mongoose is an **ODM (Object Data Modeling) library** for MongoDB and Node.js. It provides **schemas, validation, and easier querying**.

---

## 1. Connecting to MongoDB

```js
import mongoose from "mongoose";

const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));
```

- `mongoose.connect()` establishes a connection to MongoDB Atlas or local MongoDB.
- Always handle **connection success** and **errors**.

---

## 2. Defining a Schema

```js
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, min: 1 },
  published: { type: Date, default: Date.now },
});
```

- **Schema** defines the structure of documents in a collection.
- Supports **data types, validation, defaults**, and constraints.

---

## 3. Creating a Model

```js
const Book = mongoose.model("Book", bookSchema);
```

- **Model** provides an interface for CRUD operations.
- Represents a **collection** in MongoDB (`books` in this case).

---

## 4. Using the Model

```js
// Create a new book
const newBook = new Book({ title: "Book 1", author: "Buddo", pages: 200 });
await newBook.save();

// Query books
const allBooks = await Book.find();
const specificBook = await Book.findOne({ title: "Book 1" });
```

- Use `.save()` to insert a document.
- Use `.find()`, `.findOne()`, `.updateOne()`, `.deleteOne()` for CRUD operations.

---

## 5. Summary

- Mongoose simplifies MongoDB operations with **schemas and models**.
- Ensures **data consistency, validation, and structured queries**.
- Essential for **production-ready Node.js applications** using MongoDB.

---
