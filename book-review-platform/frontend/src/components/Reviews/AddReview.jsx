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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                color: 'white',
                marginBottom: '2rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    Please log in to add a review
                </p>
            </div>
        );
    }

    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
            border: '1px solid #e0e0e0'
        }}>
            <h2 style={{
                margin: '0 0 1.5rem 0',
                color: '#333',
                fontSize: '1.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span>✍️</span> Add Your Review
            </h2>
            
            {error && (
                <div style={{
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                    color: 'white',
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 15px rgba(255,107,107,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    <span>{error}</span>
                </div>
            )}
            
            {success && (
                <div style={{
                    background: 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)',
                    color: 'white',
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 15px rgba(81,207,102,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                    <span>{success}</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '1rem'
                    }}>
                        ⭐ Rating *
                    </label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    >
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <option key={rate} value={rate}>
                                {'⭐'.repeat(rate)} ({rate} star{rate !== 1 ? 's' : ''})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '1rem'
                    }}>
                        💭 Your Review *
                    </label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows="5"
                        required
                        placeholder="What did you think about this book? Share your experience, favorite moments, or insights..."
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            backgroundColor: '#f8f9fa',
                            transition: 'all 0.3s ease',
                            lineHeight: '1.6'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#667eea'}
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.85rem',
                        color: '#6c757d'
                    }}>
                        {reviewText.length}/1000 characters
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: loading ? '#6c757d' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        alignSelf: 'flex-start',
                        boxShadow: loading ? 'none' : '0 4px 15px rgba(102,126,234,0.4)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        if (!loading) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(102,126,234,0.5)';
                        }
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
                    }}
                >
                    {loading ? '⏳ Submitting...' : '📝 Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default AddReview;
