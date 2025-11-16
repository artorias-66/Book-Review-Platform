const Book = require('../models/Book');

// Get all books with pagination, search, and filter
exports.getBooks = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const search = req.query.search || '';
    const genre = req.query.genre || '';

    try {
        let query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by genre
        if (genre && genre !== 'All') {
            query.genre = genre;
        }

        const count = await Book.countDocuments(query);
        const books = await Book.find(query)
            .populate('addedBy', 'name')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ 
            books, 
            page, 
            pages: Math.ceil(count / pageSize),
            total: count
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
};

// Create/Add a new book
exports.addBook = async (req, res) => {
    const { title, author, description, genre, year, coverImage } = req.body;
    const addedBy = req.user.id;

    try {
        // Input validation
        if (!title || !author || !description || !genre || !year) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (title.trim().length < 2) {
            return res.status(400).json({ message: 'Title must be at least 2 characters long' });
        }

        if (author.trim().length < 2) {
            return res.status(400).json({ message: 'Author name must be at least 2 characters long' });
        }

        if (description.trim().length < 10) {
            return res.status(400).json({ message: 'Description must be at least 10 characters long' });
        }

        const currentYear = new Date().getFullYear();
        if (year < 1000 || year > currentYear + 10) {
            return res.status(400).json({ message: 'Please provide a valid publication year' });
        }

        const book = new Book({
            title: title.trim(),
            author: author.trim(),
            description: description.trim(),
            genre,
            year,
            coverImage: coverImage || '',
            addedBy,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        console.error('Error adding book:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { title, author, description, genre, year, coverImage } = req.body;

    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.addedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this book' });
        }

        // Validate inputs if provided
        if (title && title.trim().length < 2) {
            return res.status(400).json({ message: 'Title must be at least 2 characters long' });
        }

        if (author && author.trim().length < 2) {
            return res.status(400).json({ message: 'Author name must be at least 2 characters long' });
        }

        if (description && description.trim().length < 10) {
            return res.status(400).json({ message: 'Description must be at least 10 characters long' });
        }

        if (year) {
            const currentYear = new Date().getFullYear();
            if (year < 1000 || year > currentYear + 10) {
                return res.status(400).json({ message: 'Please provide a valid publication year' });
            }
        }

        // Update fields
        book.title = title ? title.trim() : book.title;
        book.author = author ? author.trim() : book.author;
        book.description = description ? description.trim() : book.description;
        book.genre = genre || book.genre;
        book.year = year || book.year;
        book.coverImage = coverImage !== undefined ? coverImage : book.coverImage;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            if (book.addedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

// Get books by user
exports.getBooksByUser = async (req, res) => {
    try {
        const books = await Book.find({ addedBy: req.params.userId }).populate('addedBy', 'name');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user books', error });
    }
};
