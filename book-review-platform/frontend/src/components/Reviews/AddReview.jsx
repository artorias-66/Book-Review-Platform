import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const AddReview = ({ bookId }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!rating || !reviewText) {
            setError('Please provide a rating and review text.');
            return;
        }

        try {
            await api.post(`/reviews`, {
                bookId,
                rating,
                reviewText,
            });
            setSuccess('Review added successfully!');
            setRating(0);
            setReviewText('');
        } catch (err) {
            setError('Failed to add review. Please try again.');
        }
    };

    if (!user) {
        return <p>Please log in to add a review.</p>;
    }

    return (
        <div>
            <h2>Add a Review</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>{rate}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="4"
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
