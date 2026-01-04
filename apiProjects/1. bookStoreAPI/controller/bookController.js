import { Book } from "../models/book.js";

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});

    if (allBooks.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: allBooks,
      });
    } else {
      return res.status(404).json({
        sucess: false,
        message: "Books not found",
      });
    }
  } catch (error) {
    console.log("Error getting all books:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all books",
      error: error.message,
    });
  }
};

export const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const selectedBook = await Book.findById(getCurrentBookID);

    if (!selectedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Selected Book fetched succesfully",
        data: selectedBook,
      });
    }
  } catch (error) {
    console.log("Error getting selected book:", error);
    return res.status(500).json({
      success: false,
      message: "Book with the current ID is not found! Please try another ID",
      error: error.message,
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);

    if (!newlyCreatedBook) {
      return res.status(400).json({
        success: false,
        message: "Book not found",
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log("Error adding new book:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBookFormData = req.body;
    const getCurrentBookID = req.params.id;
    const updatedSelectedBook = await Book.findByIdAndUpdate(getCurrentBookID, updatedBookFormData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSelectedBook) {
      return res.status(404).json({
        success: false,
        message: "Book is not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Selected Book is updated",
      data: updatedSelectedBook,
    });
  } catch (error) {
    console.log("Error updating selected book:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const getCurrentBookID = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookID);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book is not found with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Selected Book is deleted",
      data: deleteBook,
    });
  } catch (error) {
    console.log("Error deleting new book:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};
