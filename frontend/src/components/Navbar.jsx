import { Link } from "react-router-dom";
import { logout } from "../api";

const Navbar = () => {
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  console.log(localStorage.getItem("userName"));

  return (
    <nav className="w-full bg-blue-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        {/* Left: Logo or App Name */}
        <div className="text-2xl font-bold">
          <Link to="/books">Book Exchange</Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/books"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            All Books
          </Link>
          <Link
            to="/requests"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            My Exchange Requests
          </Link>
          <Link
            to="/mybooks"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            My Books
          </Link>
          <Link
            to="/addbook"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Add Book
          </Link>
          <Link
            to="/matching"
            className="hover:text-gray-200 transition-colors duration-200"
          >
            Find Matches
          </Link>
        </div>

        {/* Right: Logout Button */}
        {localStorage.getItem("token") ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors duration-200"
            >
              Logout
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
