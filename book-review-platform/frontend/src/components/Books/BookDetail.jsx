import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const BookDetail = ({ book, reviews }) => {
    const { user } = useAuth();

    const calculateAverageRating = () => {
        if (reviews.length === 0) {
            return 0;
        }
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ 
                    margin: '0 0 0.5rem 0', 
                    color: '#333',
                    fontSize: '2.5rem',
                    lineHeight: '1.2'
                }}>
                    {book.title}
                </h1>
                <h2 style={{ 
                    margin: '0 0 1rem 0', 
                    color: '#666',
                    fontSize: '1.5rem',
                    fontWeight: '400'
                }}>
                    by {book.author}
                </h2>
                
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                }}>
                    <span style={{ 
                        backgroundColor: '#e9ecef',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        color: '#495057'
                    }}>
                        {book.genre}
                    </span>
                    <span style={{ 
                        color: '#6c757d',
                        fontSize: '0.9rem',
                        padding: '0.25rem 0'
                    }}>
                        Published: {book.year}
                    </span>
                </div>

                <p style={{ 
                    lineHeight: '1.6',
                    color: '#555',
                    fontSize: '1.1rem',
                    marginBottom: '1.5rem'
                }}>
                    {book.description}
                </p>

                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ 
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Average Rating: {calculateAverageRating()}
                        </span>
                        <span style={{ 
                            color: '#ffc107',
                            fontSize: '1.2rem'
                        }}>
                            {renderStars(Math.round(calculateAverageRating()))}
                        </span>
                    </div>
                    <span style={{ 
                        color: '#6c757d',
                        fontSize: '0.9rem'
                    }}>
                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                    </span>
                </div>

                {user && user.id === book.addedBy?._id && (
                    <div style={{ 
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        border: '1px solid #dee2e6'
                    }}>
                        <p style={{ 
                            margin: '0 0 0.5rem 0',
                            color: '#495057',
                            fontSize: '0.9rem'
                        }}>
                            You added this book
                        </p>
                        <Link 
                            to={`/edit-book/${book._id}`}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                display: 'inline-block'
                            }}
                        >
                            Edit Book
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
