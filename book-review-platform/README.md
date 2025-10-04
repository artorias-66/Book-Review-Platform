# Book Review Platform

A comprehensive full-stack MERN application that allows users to discover, review, and manage books. Built with modern web technologies and featuring a beautiful, responsive user interface.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens and password hashing
- **Book Management**: Complete CRUD operations for books with pagination (5 books per page)
- **Review System**: Rate and review books with 1-5 star ratings and text reviews
- **User Profiles**: View and manage your added books and reviews
- **Responsive Design**: Beautiful, modern UI that works on all devices

### Technical Features
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM and proper schema relationships
- **API**: RESTful API with proper error handling and validation
- **Frontend**: React with Context API for state management
- **Routing**: Protected routes and dynamic navigation
- **Styling**: Custom CSS with responsive design and modern UI components

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 17** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
book-review-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   │   ├── authController.js
│   │   │   ├── bookController.js
│   │   │   └── reviewController.js
│   │   ├── models/          # Database schemas
│   │   │   ├── User.js
│   │   │   ├── Book.js
│   │   │   └── Review.js
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── bookRoutes.js
│   │   │   └── reviewRoutes.js
│   │   ├── middleware/      # Custom middleware
│   │   │   └── authMiddleware.js
│   │   ├── config/          # Configuration
│   │   │   └── db.js
│   │   └── app.js           # Express app setup
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Books/
│   │   │   │   ├── BookList.jsx
│   │   │   │   └── BookDetail.jsx
│   │   │   ├── Reviews/
│   │   │   │   ├── AddReview.jsx
│   │   │   │   └── ReviewList.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── BookPage.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── AddBook.jsx
│   │   ├── context/         # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app component
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Global styles
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-review-platform
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/book-review-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   # or for development with auto-restart
   npm run dev
   ```

5. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   ```

6. **Start the frontend application**
   ```bash
   npm start
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Book Endpoints
- `GET /api/books?page=1` - Get all books with pagination
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Add a new book (protected)
- `PUT /api/books/:id` - Update a book (protected)
- `DELETE /api/books/:id` - Delete a book (protected)
- `GET /api/books/user/:userId` - Get books by user

### Review Endpoints
- `GET /api/reviews/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add a new review (protected)
- `PUT /api/reviews/:id` - Update a review (protected)
- `DELETE /api/reviews/:id` - Delete a review (protected)
- `GET /api/reviews/user/:userId` - Get reviews by user

## 🎯 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Browse Books** - View all available books with pagination
3. **View Book Details** - Click on any book to see details and reviews
4. **Add Books** - Logged-in users can add new books
5. **Write Reviews** - Rate and review books you've read
6. **Manage Profile** - View and manage your added books and reviews

### For Developers
- **Protected Routes** - Certain features require authentication
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Error Handling** - Comprehensive error handling throughout
- **Loading States** - User-friendly loading indicators
- **Form Validation** - Client and server-side validation

## 🔧 Development

### Running in Development Mode
```bash
# Backend (with auto-restart)
cd backend
npm run dev

# Frontend (with hot reload)
cd frontend
npm start
```

### Database Schema

#### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

#### Book Schema
```javascript
{
  title: String (required),
  author: String (required),
  description: String (required),
  genre: String (required),
  year: Number (required),
  addedBy: ObjectId (ref: 'User')
}
```

#### Review Schema
```javascript
{
  bookId: ObjectId (ref: 'Book'),
  userId: ObjectId (ref: 'User'),
  rating: Number (required, min: 1, max: 5),
  reviewText: String (required, max: 500)
}
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform
2. Deploy the backend code
3. Update frontend API URL to production backend URL

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the build folder
3. Set environment variables if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as a MERN stack assignment
- Inspired by modern book review platforms
- Uses best practices for authentication and security