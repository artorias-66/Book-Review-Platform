# Book Review Platform - Testing Guide

## Quick Setup Test

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Expected: Server running on port 5000 with MongoDB connection

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Expected: React app running on port 3000

### 3. Test User Flow

#### Registration
1. Go to http://localhost:3000/register
2. Fill in name, email, password
3. Submit form
4. Should redirect to home page and show user name in navbar

#### Login
1. Go to http://localhost:3000/login
2. Enter email and password
3. Submit form
4. Should redirect to home page and show user name in navbar

#### Add Book
1. Click "Add Book" in navbar (when logged in)
2. Fill in book details (title, author, description, genre, year)
3. Submit form
4. Should redirect to home page and show new book in list

#### View Book Details
1. Click on any book from the home page
2. Should show book details, reviews, and average rating
3. Should show "Add Review" form if logged in

#### Add Review
1. On book details page, fill in rating and review text
2. Submit review
3. Should see review appear in the reviews list

#### Profile Page
1. Click "Profile" in navbar
2. Should show user's added books and reviews
3. Should have edit links for books

#### Pagination
1. Add more than 5 books
2. Should see pagination controls at bottom
3. Test previous/next buttons

### 4. Test Authentication
- Try accessing /profile without logging in (should redirect to login)
- Try adding a book without logging in (should redirect to login)
- Logout and verify user is logged out

### 5. Test Responsive Design
- Test on different screen sizes
- Check mobile navigation
- Verify forms work on mobile

## Expected Features Working

✅ User registration and login
✅ JWT token authentication
✅ Password hashing
✅ Book CRUD operations
✅ Review system with ratings
✅ Pagination (5 books per page)
✅ User profiles
✅ Protected routes
✅ Responsive design
✅ Error handling
✅ Loading states
✅ Form validation
✅ Average rating calculation
✅ Edit/delete permissions (users can only edit their own content)

## Common Issues and Solutions

### Backend Issues
- **MongoDB connection error**: Check .env file and MongoDB service
- **Port already in use**: Change PORT in .env or kill existing process
- **JWT errors**: Check JWT_SECRET in .env

### Frontend Issues
- **API connection error**: Check backend is running on port 5000
- **CORS errors**: Backend has CORS enabled, should work
- **Authentication not working**: Check token storage in localStorage

### Database Issues
- **Empty database**: Add some books and reviews to test
- **Schema errors**: Check model definitions match API usage

## Performance Notes
- Books load with pagination (5 per page)
- Reviews load with book details
- User data loads on profile page
- All API calls have proper error handling

