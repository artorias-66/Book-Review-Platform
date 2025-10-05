const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Review = require('../backend/src/models/Review');
const Book = require('../backend/src/models/Book');
const authMiddleware = require('../backend/src/middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookreview', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get reviews for a book
app.get('/api/reviews/book/:bookId', async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add review
app.post('/api/reviews', authMiddleware, async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if user already reviewed this book
        const existingReview = await Review.findOne({
            book: bookId,
            user: req.user.id
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        const review = new Review({
            book: bookId,
            user: req.user.id,
            rating,
            comment
        });

        await review.save();
        await review.populate('user', 'name email');

        // Update book's average rating
        const reviews = await Review.find({ book: bookId });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        book.averageRating = averageRating;
        await book.save();

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update review
app.put('/api/reviews/:id', authMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { rating, comment } = req.body;
        review.rating = rating;
        review.comment = comment;

        await review.save();
        await review.populate('user', 'name email');

        // Update book's average rating
        const reviews = await Review.find({ book: review.book });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Book.findByIdAndUpdate(review.book, { averageRating });

        res.json(review);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete review
app.delete('/api/reviews/:id', authMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Review.findByIdAndDelete(req.params.id);

        // Update book's average rating
        const reviews = await Review.find({ book: review.book });
        const averageRating = reviews.length > 0 
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
            : 0;
        await Book.findByIdAndUpdate(review.book, { averageRating });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;
