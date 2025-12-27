const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");

const public_users = express.Router();

/**
 * GET all books
 * Async/Await with Axios (simulated async call)
 */
public_users.get("/", async (req, res) => {
  try {
    // Simulated async operation using axios
    await axios.get("https://jsonplaceholder.typicode.com/posts/1");

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

/**
 * GET book details by ISBN
 */
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    await Promise.resolve();

    if (books[isbn]) {
      return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET books by Author
 */
public_users.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    await Promise.resolve();

    const filteredBooks = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    }

    return res
      .status(404)
      .json({ message: "No books found for this author" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET books by Title
 */
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();

    await Promise.resolve();

    const filteredBooks = Object.values(books).filter(
      (book) => book.title.toLowerCase() === title
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    }

    return res
      .status(404)
      .json({ message: "No books found with this title" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET reviews by ISBN
 */
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    await Promise.resolve();

    if (books[isbn] && books[isbn].reviews) {
      return res.status(200).json(books[isbn].reviews);
    }

    return res
      .status(404)
      .json({ message: "Reviews not found for this book" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports.general = public_users;
