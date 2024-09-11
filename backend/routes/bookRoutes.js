const express = require("express");
const {
  listBook,
  editBook,
  deleteBook,
  getBooks,
  getMyBooks,
} = require("../controllers/bookController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.post("/list", listBook);
router.get("/", getBooks);
router.get("/mybooks", getMyBooks);
router.put("/edit", editBook);
router.delete("/:bookId", deleteBook);
// router.delete("/:id", authMiddleware, bookController.deleteBook);

module.exports = router;
