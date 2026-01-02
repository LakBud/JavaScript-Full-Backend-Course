# REST APIs in Node.js with Express — In-Depth Notes

REST APIs allow clients (web, mobile, etc.) to communicate with servers over **HTTP** using standard methods (GET, POST, PUT, DELETE). Express.js simplifies building REST APIs by providing **routing, middleware, and JSON parsing** out of the box.

---

## 1 Core Concepts

- **Resource**: Any object you expose via API (e.g., books, users).
- **Endpoint**: URL path to access a resource (e.g., `/books`).
- **HTTP Methods**: Define the action on the resource:
  - `GET` → read
  - `POST` → create
  - `PUT` / `PATCH` → update
  - `DELETE` → remove
- **Stateless**: Each request contains all necessary info; server does not store client state.
- **JSON Responses**: Standard format for REST APIs; ensures interoperability.

---

## 2 Using Express.js

- **Routing**: Define endpoints corresponding to resources and methods.
- **Middleware**: Functions that process requests before reaching routes.
  - Example: `express.json()` parses incoming JSON.
- **Error Handling**: Use middleware and proper status codes (`400`, `404`, `500`).

---

## 3 Example: Bookstore API (Illustrative)

```js
// GET all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// GET a book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
});

// POST a new book
app.post("/books", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  const newBook = { id: generateId(), title };
  books.push(newBook);
  res.status(201).json(newBook);
});
```

**Key takeaways:**

- Use **plural nouns** for endpoints (`/books`).
- Validate inputs (`title` must exist in POST/PUT).
- Return proper **HTTP status codes**.
- JSON responses should be **consistent and structured**.

---

## 4 Best Practices for Production

1. **Route Organization**
   - Keep routes modular, e.g., `/books`, `/users`.
   - Separate **controllers** from route definitions.
2. **Validation**
   - Validate all user inputs (e.g., with `Joi` or `express-validator`).
3. **Error Handling**
   - Use `try/catch` in async routes.
   - Use a global error handler middleware.
4. **Security**
   - Use HTTPS.
   - Sanitize inputs to prevent injection attacks.
   - Authenticate requests (JWT, API keys).
5. **Logging & Monitoring**
   - Track requests and errors (e.g., `morgan`, `winston`).
6. **Consistent Responses**
   - Success: `{ status: "success", data: ... }`
   - Error: `{ status: "error", message: ... }`

---

## 5 Summary

- Express.js simplifies **building REST APIs** by handling routing, JSON parsing, and middleware.
- Your bookstore example illustrates **basic CRUD operations**, input validation, and HTTP status usage.
- Following REST principles ensures your API is **scalable, maintainable, and production-ready**.

---
