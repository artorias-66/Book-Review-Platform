import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { deleteReview } from '../../utils/api';

const ReviewList = ({ reviews, onReviewDeleted }) => {
    const { user } = useAuth();

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReview(reviewId);
                if (onReviewDeleted) {
                    onReviewDeleted();
                }
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('Failed to delete review');
            }
        }
    };

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    return (
        <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ 
                margin: '0 0 1.5rem 0', 
                color: '#333',
                fontSize: '1.5rem'
            }}>
                Reviews ({reviews.length})
            </h3>
            
            {reviews.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '2rem',
                    color: '#6c757d'
                }}>
                    <p style={{ margin: 0, fontSize: '1.1rem' }}>
                        No reviews yet. Be the first to review this book!
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {reviews.map(review => (
                        <div key={review._id} style={{
                            border: '1px solid #e9ecef',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            backgroundColor: '#f8f9fa'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <h4 style={{ 
                                        margin: '0 0 0.5rem 0', 
                                        color: '#333',
                                        fontSize: '1.1rem'
                                    }}>
                                        {review.userId?.name || 'Anonymous'}
                                    </h4>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ 
                                            color: '#ffc107',
                                            fontSize: '1.2rem'
                                        }}>
                                            {renderStars(review.rating)}
                                        </span>
                                        <span style={{ 
                                            color: '#6c757d',
                                            fontSize: '0.9rem'
                                        }}>
                                            {review.rating} star{review.rating !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                                
                                {user && user.id === review.userId?._id && (
                                    <button
                                        onClick={() => handleDeleteReview(review._id)}
                                        style={{
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            
                            <p style={{ 
                                margin: 0,
                                lineHeight: '1.6',
                                color: '#555'
                            }}>
                                {review.reviewText}
                            </p>
                            
                            <div style={{ 
                                marginTop: '1rem',
                                fontSize: '0.8rem',
                                color: '#6c757d'
                            }}>
                                {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;
