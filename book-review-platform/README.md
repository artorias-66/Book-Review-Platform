# Book Review Platform

## Overview
The Book Review Platform is a full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. This platform allows users to manage books, write reviews, and authenticate themselves to access personalized features.

## Features
- User authentication (sign up, login)
- Book management (CRUD operations)
- Review system (add, edit, delete reviews)
- User profiles to manage added books and reviews
- Responsive design for a seamless user experience

## Technologies Used
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, Mongoose, JSON Web Tokens (JWT)
- **Database**: MongoDB

## Project Structure
```
book-review-platform
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   ├── config
│   │   └── app.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd book-review-platform
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file in the backend directory and add your MongoDB connection string:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```
   - Start the backend server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the frontend application:
     ```
     npm start
     ```

### API Documentation
- **Authentication**
  - POST `/api/auth/register`: Register a new user
  - POST `/api/auth/login`: Log in an existing user

- **Books**
  - GET `/api/books`: Retrieve all books
  - POST `/api/books`: Add a new book
  - GET `/api/books/:id`: Retrieve a specific book
  - PUT `/api/books/:id`: Update a specific book
  - DELETE `/api/books/:id`: Delete a specific book

- **Reviews**
  - GET `/api/reviews/:bookId`: Retrieve all reviews for a specific book
  - POST `/api/reviews`: Add a new review
  - PUT `/api/reviews/:id`: Update a specific review
  - DELETE `/api/reviews/:id`: Delete a specific review

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.