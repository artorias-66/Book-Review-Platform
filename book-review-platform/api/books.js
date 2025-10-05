const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

// Routes
app.get('/api/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const books = await Book.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Book.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({
            books,
            currentPage: page,
            totalPages,
            totalBooks: total
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/books', authMiddleware, async (req, res) => {
    try {
        const { title, author, description, genre, publishedYear } = req.body;
        
        const book = new Book({
            title,
            author,
            description,
            genre,
            publishedYear,
            createdBy: req.user.id
        });

        await book.save();
        await book.populate('createdBy', 'name email');
        
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/books/:id', authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { title, author, description, genre, publishedYear } = req.body;
        book.title = title;
        book.author = author;
        book.description = description;
        book.genre = genre;
        book.publishedYear = publishedYear;

        await book.save();
        await book.populate('createdBy', 'name email');
        
        res.json(book);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/books/:id', authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;
