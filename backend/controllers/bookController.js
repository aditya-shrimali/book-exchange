const Book = require("../models/Book");
const User = require("../models/User");

const listBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    if (!req.user) {
      console.log(req.user);
      return res.status(401).json({ message: "User not authenticated" });
    }
    const userId = req.user._id;
    const userName = req.user.name;

    const book = await Book.create({
      title,
      author,
      genre,
      owner: userId,
      ownerName: userName,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error("Error in listBook:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editBook = async (req, res) => {
  const { bookId, title, author, genre } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author, genre },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "Error editing book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findOne({ _id: bookId, owner: userId });

    if (!book) {
      return res.status(404).json({
        message: "Book not found or you don't have permission to delete it",
      });
    }

    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Error deleting book" });
  }
};

const getMyBooks = async (req, res) => {
  const userId = req.user.id;
  try {
    const books = await Book.find({ owner: userId });
    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: "Error fetching books" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: "Error fetching books" });
  }
};

module.exports = { listBook, editBook, deleteBook, getBooks, getMyBooks };
