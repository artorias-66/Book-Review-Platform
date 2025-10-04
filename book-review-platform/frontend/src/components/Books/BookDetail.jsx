import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import ReviewList from '../Reviews/ReviewList';
import AddReview from '../Reviews/AddReview';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await api.get(`/books/${id}`);
                setBook(bookResponse.data);

                const reviewsResponse = await api.get(`/reviews/${id}`);
                setReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    const calculateAverageRating = () => {
        if (reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
            <p>{book.description}</p>
            <p>Genre: {book.genre}</p>
            <p>Published: {book.year}</p>
            <h3>Average Rating: {calculateAverageRating()}</h3>
            <hr />
            <h3>Reviews</h3>
            <ReviewList reviews={reviews} />
            <AddReview bookId={book._id} />
        </div>
    );
};

export default BookDetail;
