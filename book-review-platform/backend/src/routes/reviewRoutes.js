const express = require('express');
const { addReview, getReviewsByBookId, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, addReview);

router.route('/:bookId')
    .get(getReviewsByBookId);

router.route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;