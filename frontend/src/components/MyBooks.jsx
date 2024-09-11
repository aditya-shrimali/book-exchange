import { useState, useEffect } from "react";
import { getUserBooks, deleteBook } from "../api";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await getUserBooks();
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user's books:", error);
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(bookId);
        setBooks(books.filter((book) => book._id !== bookId));
        alert("Book deleted successfully!");
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete the book. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold">Loading your books...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Books</h1>
      {books.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <li
              key={book._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-1">Owner: {book.ownerName}</p>
              <p className="text-gray-600 mb-4">Genre: {book.genre}</p>
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          You don t have any books yet.
        </p>
      )}
    </div>
  );
};

export default MyBooks;
