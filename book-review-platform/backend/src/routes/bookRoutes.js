const express = require('express');
const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBooksByUser
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.route('/')
    .post(protect, addBook)
    .get(getBooks);

router.route('/user/:userId')
    .get(getBooksByUser);

router.route('/:id')
    .get(getBookById)
    .put(protect, updateBook)
    .delete(protect, deleteBook);

module.exports = router;
