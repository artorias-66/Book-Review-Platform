import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import BookDetail from '../components/Books/BookDetail';
import ReviewList from '../components/Reviews/ReviewList';
import AddReview from '../components/Reviews/AddReview';

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {book && <BookDetail book={book} />}
            <AddReview bookId={book._id} />
            <ReviewList bookId={book._id} />
        </div>
    );
};

export default BookPage;