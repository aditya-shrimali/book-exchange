import { useState, useEffect } from "react";
import { getAllBooks, requestExchange } from "../api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleExchangeRequest = async (bookId) => {
    try {
      await requestExchange(bookId);
      alert("Exchange request sent!");
    } catch (error) {
      console.error("Error requesting exchange:", error);
      alert("Failed to send exchange request");
    }
  };
  const genres = [...new Set(books.map((book) => book.genre))];
  const authors = [...new Set(books.map((book) => book.author))];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === "" || book.genre === selectedGenre) &&
      (selectedAuthor === "" || book.author === selectedAuthor)
  );

  if (loading) {
    return (
      <p className="text-center text-xl font-semibold">Loading books...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="text-center text-xl font-semibold">Loading books...</p>
      ) : filteredBooks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <li
              key={book._id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-1">Author: {book.author}</p>
              <p className="text-gray-600 mb-1">Owner: {book.ownerName}</p>
              <p className="text-gray-600 mb-4">Genre: {book.genre}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleExchangeRequest(book._id)}
              >
                Request Exchange
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No books available for exchange.
        </p>
      )}
    </div>
  );
};

export default BookList;
