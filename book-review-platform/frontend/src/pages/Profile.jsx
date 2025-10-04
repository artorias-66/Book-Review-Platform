import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userBooks, setUserBooks] = useState([]);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const fetchUserBooksAndReviews = async () => {
            try {
                const booksResponse = await api.get(`/books/user/${user.id}`);
                const reviewsResponse = await api.get(`/reviews/user/${user.id}`);
                setUserBooks(booksResponse.data);
                setUserReviews(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserBooksAndReviews();
    }, [user.id]);

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <h2>Added Books</h2>
            <ul>
                {userBooks.map(book => (
                    <li key={book._id}>{book.title} by {book.author}</li>
                ))}
            </ul>
            <h2>Your Reviews</h2>
            <ul>
                {userReviews.map(review => (
                    <li key={review._id}>
                        <strong>{review.bookTitle}</strong>: {review.reviewText} (Rating: {review.rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;