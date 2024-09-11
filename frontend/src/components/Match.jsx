import { useState, useEffect } from "react";
import { getAllBooks, requestExchange } from "../api";

const Match = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(Array.isArray(booksData.data) ? booksData.data : []);
        const preferences =
          JSON.parse(localStorage.getItem("userPreference")) || [];
        setUserPreferences(preferences);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExchangeRequest = async (bookId) => {
    try {
      await requestExchange(bookId);
      alert("Exchange request sent successfully!");
    } catch (error) {
      console.error("Error requesting exchange:", error);
      alert("Failed to send exchange request. Please try again.");
    }
  };

  const filteredBooks = books.filter((book) =>
    userPreferences.some(
      (pref) =>
        book.author.toLowerCase().includes(pref.toLowerCase()) ||
        book.genre.toLowerCase().includes(pref.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recommended Books</h1>

      {loading ? (
        <p className="text-center text-xl font-semibold">Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <li key={book._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
              <button
                onClick={() => handleExchangeRequest(book._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Request Exchange
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No books available matching your preferences.
        </p>
      )}
    </div>
  );
};

export default Match;
