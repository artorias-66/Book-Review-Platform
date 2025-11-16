const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Science Fiction', 
               'Fantasy', 'Romance', 'Horror', 'Biography', 'History', 
               'Self-Help', 'Poetry', 'Children', 'Young Adult', 'Other']
    },
    year: {
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1000, 'Year must be after 1000'],
        max: [new Date().getFullYear() + 10, 'Year cannot be too far in the future']
    },
    coverImage: {
        type: String,
        trim: true,
        default: ''
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

// Index for faster queries
bookSchema.index({ title: 'text', author: 'text', description: 'text' });
bookSchema.index({ genre: 1 });
bookSchema.index({ year: -1 });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;