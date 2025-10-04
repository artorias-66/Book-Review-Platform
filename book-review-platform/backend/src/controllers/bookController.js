const Book = require('../models/Book');

// Get all books with pagination
exports.getBooks = async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.page) || 1;

    try {
        const count = await Book.countDocuments();
        const books = await Book.find()
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ books, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
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
    const { title, author, description, genre, year } = req.body;
    const addedBy = req.user.id;

    try {
        const book = new Book({
            title,
            author,
            description,
            genre,
            year,
            addedBy,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

// Update a book
exports.updateBook = async (req, res) => {
    const { title, author, description, genre, year } = req.body;

    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            if (book.addedBy.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.genre = genre || book.genre;
            book.year = year || book.year;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
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
