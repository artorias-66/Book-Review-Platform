const Review = require('../models/Review');

// Get all reviews for a book
exports.getReviewsByBookId  = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

// Add a new review
exports.addReview = async (req, res) => {
    const { rating, reviewText, bookId } = req.body;
    const userId = req.user.id;

    try {
        const review = new Review({
            bookId,
            userId,
            rating,
            reviewText,
        });

        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { rating, reviewText } = req.body;

    try {
        const review = await Review.findById(req.params.id);

        if (review) {
            if (review.userId.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            review.rating = rating || review.rating;
            review.reviewText = reviewText || review.reviewText;

            const updatedReview = await review.save();
            res.json(updatedReview);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (review) {
            if (review.userId.toString() !== req.user.id) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await review.remove();
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};

// Get reviews by user
exports.getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId })
            .populate('bookId', 'title author')
            .populate('userId', 'name');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error });
    }
};
