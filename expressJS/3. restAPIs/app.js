import express from "express";
const app = express();

// Middleware
app.use(express.json());

// data
let books = [
  { id: "1", title: "Book 1" },
  { id: "2", title: "Book 2" },
  { id: "3", title: "Book 3" },
];

// Intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

// Get all books
app.get("/get", (req, res) => {
  res.json(books);
});

// Get a single book
app.get("/get/:id", (req, res) => {
  const selectedBook = books.find((book) => book.id === req.params.id);

  if (selectedBook) {
    res.status(200).json(selectedBook);
  } else {
    res.status(404).json({
      message: "ERROR 404! | Book not found.",
    });
  }
});

// add a new book
app.post("/add", (req, res) => {
  const newBook = { id: String(Math.floor(Math.random() * 1000)), title: `Book: ${Math.floor(Math.random() * 1000)}` };

  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "New books is added successfully",
  });
});

// update a book
app.put("/update/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Update title only if body exists and has title
  if (req.body && req.body.title) {
    book.title = req.body.title || book.title;
  }

  res.status(200).json({
    message: `Book with ID ${req.params.id} updated successfully`,
    data: book,
  });
});

// Delete a book
app.delete("/delete/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json({
    message: "Book deleted successfully",
    data: deletedBook[0],
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});
