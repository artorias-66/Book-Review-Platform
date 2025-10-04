import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserBooks, fetchUserReviews } from '../utils/api';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    const [userBooks, setUserBooks] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const [booksData, reviewsData] = await Promise.all([
                    fetchUserBooks(user.id),
                    fetchUserReviews(user.id)
                ]);
                setUserBooks(booksData);
                setUserReviews(reviewsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.id]);

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem' }}>Loading profile...</div>
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

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem', 
                color: '#333',
                fontSize: '2.5rem'
            }}>
                {user.name}'s Profile
            </h1>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Added Books Section */}
                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ 
                        margin: '0 0 1.5rem 0', 
                        color: '#333',
                        fontSize: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        Added Books ({userBooks.length})
                        <Link 
                            to="/add-book"
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontSize: '0.9rem'
                            }}
                        >
                            Add New Book
                        </Link>
                    </h2>
                    
                    {userBooks.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '2rem',
                            color: '#6c757d'
                        }}>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                You haven't added any books yet.
                            </p>
                            <Link 
                                to="/add-book"
                                style={{
                                    color: '#007bff',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                    display: 'inline-block'
                                }}
                            >
                                Add your first book!
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {userBooks.map(book => (
                                <div key={book._id} style={{
                                    border: '1px solid #e9ecef',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    backgroundColor: '#f8f9fa'
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ 
                                                margin: '0 0 0.5rem 0', 
                                                color: '#333',
                                                fontSize: '1.2rem'
                                            }}>
                                                <Link 
                                                    to={`/book/${book._id}`}
                                                    style={{ 
                                                        textDecoration: 'none', 
                                                        color: 'inherit' 
                                                    }}
                                                >
                                                    {book.title}
                                                </Link>
                                            </h3>
                                            <p style={{ 
                                                margin: '0 0 0.5rem 0', 
                                                color: '#666',
                                                fontSize: '1rem'
                                            }}>
                                                by {book.author}
                                            </p>
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '1rem',
                                                fontSize: '0.9rem',
                                                color: '#6c757d'
                                            }}>
                                                <span style={{ 
                                                    backgroundColor: '#e9ecef',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '12px'
                                                }}>
                                                    {book.genre}
                                                </span>
                                                <span>{book.year}</span>
                                            </div>
                                        </div>
                                        <Link 
                                            to={`/edit-book/${book._id}`}
                                            style={{
                                                backgroundColor: '#6c757d',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '4px',
                                                textDecoration: 'none',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h2 style={{ 
                        margin: '0 0 1.5rem 0', 
                        color: '#333',
                        fontSize: '1.5rem'
                    }}>
                        Your Reviews ({userReviews.length})
                    </h2>
                    
                    {userReviews.length === 0 ? (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '2rem',
                            color: '#6c757d'
                        }}>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                You haven't written any reviews yet.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {userReviews.map(review => (
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
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ 
                                                margin: '0 0 0.5rem 0', 
                                                color: '#333',
                                                fontSize: '1.1rem'
                                            }}>
                                                <Link 
                                                    to={`/book/${review.bookId._id}`}
                                                    style={{ 
                                                        textDecoration: 'none', 
                                                        color: 'inherit' 
                                                    }}
                                                >
                                                    {review.bookId.title}
                                                </Link>
                                            </h3>
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <span style={{ 
                                                    color: '#ffc107',
                                                    fontSize: '1.1rem'
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
            </div>
        </div>
    );
};

export default Profile;