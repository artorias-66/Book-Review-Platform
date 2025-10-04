import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById, fetchReviewsByBookId } from '../utils/api';
import BookDetail from '../components/Books/BookDetail';
import ReviewList from '../components/Reviews/ReviewList';
import AddReview from '../components/Reviews/AddReview';

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                setLoading(true);
                const [bookData, reviewsData] = await Promise.all([
                    fetchBookById(id),
                    fetchReviewsByBookId(id)
                ]);
                setBook(bookData);
                setReviews(reviewsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem' }}>Loading book details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                color: 'red',
                backgroundColor: '#f8d7da',
                borderRadius: '4px',
                margin: '1rem'
            }}>
                Error: {error}
            </div>
        );
    }

    if (!book) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>Book not found</h2>
                <p>The book you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <BookDetail book={book} reviews={reviews} />
            <AddReview bookId={book._id} onReviewAdded={() => {
                // Refresh reviews when a new one is added
                fetchReviewsByBookId(id).then(setReviews);
            }} />
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default BookPage;