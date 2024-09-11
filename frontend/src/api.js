import axios from "axios";

// const API_URL = "http://localhost:3000/api"; // Your backend server URL
const API_URL = "https://book-exchange-backend-zeta.vercel.app/api";

// Get all books
export const getAllBooks = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Request exchange
export const requestExchange = async (bookId) => {
  const token = localStorage.getItem("token");
  return axios.post(
    `${API_URL}/exchange/request`,
    { bookId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get all exchange requests for the logged-in user
export const getExchangeRequests = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/exchange/requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// respond to exchange request
export const respondToRequest = async (requestId, response) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `${API_URL}/exchange/respond`,
    { requestId, status: response },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get all books for the logged-in user
export const getUserBooks = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/books/mybooks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// list a book
export const listBook = async (book) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/books/list`, book, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// for logout
export const logout = async () => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// edit preferences
export const editPreferences = async (preferences) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `${API_URL}/edit/preference`,
    { preferences },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// delete a book
export const deleteBook = async (bookId) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
