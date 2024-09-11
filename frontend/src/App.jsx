import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import RequestsPage from "./pages/RequestsPage";
import BooksPage from "./pages/BooksPage";
import Login from "./pages/Login";
import MyBooks from "./components/MyBooks";
import AddBook from "./components/AddBook";
import Register from "./pages/Register";
import Matching from "./pages/Matching";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/matching" element={<Matching />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
