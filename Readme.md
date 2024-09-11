## Technologies Used

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Setup and Installation

Easily Access the application at : -

    ```
        https://book-exchange-puce.vercel.app/
    ```

1. Clone the repository:

   ```
   git clone https://github.com/aditya-shrimali/book-exchange.git
   cd book-exchange
   ```

2. Setup Backend:

   ```
   cd backend
   npm install
   # Edit .env with your MongoDB URI and JWT secret and PORT
   ```

3. Setup Frontend:
   ```
   cd ../frontend
   npm install
   ```

## Running the Application

1. Start the backend server:

   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend:

   ```
   cd frontend
   npm run dev
   ```

3. Access the application at `https://book-exchange-puce.vercel.app/`

## API Endpoints

- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- POST /api/books/list - List a new book
- GET /api/books - Get all books
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book
