# Book Review Platform

## Overview
The Book Review Platform is a full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, manage books, and write reviews for their favorite books. This project aims to provide a seamless experience for book lovers to share their thoughts and discover new reads.

## Features
- User authentication (sign up, login, JWT token management)
- Book management (CRUD operations for books)
- Review system (add, edit, delete reviews)
- User profiles to manage added books and reviews

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React, React Router, Axios

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB connection in `src/config/db.js`.

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React application:
   ```
   npm start
   ```

## API Documentation
- **Authentication**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in an existing user

- **Books**
  - `GET /api/books`: Retrieve all books
  - `POST /api/books`: Add a new book
  - `PUT /api/books/:id`: Update a book
  - `DELETE /api/books/:id`: Delete a book

- **Reviews**
  - `GET /api/reviews/:bookId`: Retrieve reviews for a specific book
  - `POST /api/reviews`: Add a new review
  - `PUT /api/reviews/:id`: Update a review
  - `DELETE /api/reviews/:id`: Delete a review

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.