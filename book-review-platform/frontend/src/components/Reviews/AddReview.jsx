import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addReview } from '../../utils/api';

const AddReview = ({ bookId, onReviewAdded }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!rating || !reviewText) {
            setError('Please provide a rating and review text.');
            setLoading(false);
            return;
        }

        try {
            await addReview({
                bookId,
                rating: parseInt(rating),
                reviewText,
            });
            setSuccess('Review added successfully!');
            setRating(0);
            setReviewText('');
            if (onReviewAdded) {
                onReviewAdded();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <p style={{ margin: 0, color: '#6c757d' }}>
                    Please log in to add a review.
                </p>
            </div>
        );
    }

    return (
        <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        }}>
            <h2 style={{ 
                margin: '0 0 1.5rem 0', 
                color: '#333',
                fontSize: '1.5rem'
            }}>
                Add a Review
            </h2>
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    backgroundColor: '#f8d7da',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #f5c6cb'
                }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{ 
                    color: '#155724', 
                    backgroundColor: '#d4edda',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    border: '1px solid #c3e6cb'
                }}>
                    {success}
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Rating *
                    </label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>
                                {rate} star{rate !== 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Review *
                    </label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="4"
                        required
                        placeholder="Share your thoughts about this book..."
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        alignSelf: 'flex-start'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default AddReview;
