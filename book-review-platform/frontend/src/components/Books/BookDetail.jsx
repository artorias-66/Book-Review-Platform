import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const BookDetail = ({ book, reviews }) => {
    const { user } = useAuth();

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ 
                    color: i <= rating ? '#FFD700' : '#ddd',
                    fontSize: '1.8rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (!book) {
        return <div>Book not found.</div>;
    }

    const avgRating = calculateAverageRating();

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            marginBottom: '2rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                left: '-80px',
                width: '250px',
                height: '250px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '400px',
                height: '400px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header Section */}
                <div style={{ 
                    display: 'flex',
                    gap: '2rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Book Cover */}
                    {book.coverImage ? (
                        <div style={{
                            flexShrink: 0,
                            width: '200px',
                            height: '300px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                            border: '4px solid rgba(255,255,255,0.2)'
                        }}>
                            <img 
                                src={book.coverImage} 
                                alt={book.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                        <div style="
                                            width: 100%;
                                            height: 100%;
                                            background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 4rem;
                                            color: white;
                                        ">📚</div>
                                    `;
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            flexShrink: 0,
                            width: '200px',
                            height: '300px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                            border: '4px solid rgba(255,255,255,0.2)'
                        }}>
                            📚
                        </div>
                    )}

                    {/* Book Info */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h1 style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '2.8rem',
                            fontWeight: '700',
                            lineHeight: '1.2',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                            {book.title}
                        </h1>
                        
                        <h2 style={{
                            margin: '0 0 1.5rem 0',
                            fontSize: '1.6rem',
                            fontWeight: '400',
                            opacity: 0.95,
                            fontStyle: 'italic'
                        }}>
                            by {book.author}
                        </h2>

                        {/* Tags */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{
                                background: 'rgba(255,255,255,0.25)',
                                backdropFilter: 'blur(10px)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}>
                                📖 {book.genre}
                            </span>
                            <span style={{
                                background: 'rgba(255,255,255,0.25)',
                                backdropFilter: 'blur(10px)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}>
                                📅 {book.year}
                            </span>
                        </div>

                        {/* Rating Section */}
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '0.5rem'
                            }}>
                                <span style={{
                                    fontSize: '3rem',
                                    fontWeight: '700',
                                    lineHeight: '1'
                                }}>
                                    {avgRating}
                                </span>
                                <div>
                                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                                        {renderStars(Math.round(avgRating))}
                                    </div>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        opacity: 0.9,
                                        marginTop: '0.25rem'
                                    }}>
                                        {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        {user && user.id === book.addedBy?._id && (
                            <Link
                                to={`/edit-book/${book._id}`}
                                style={{
                                    display: 'inline-block',
                                    background: 'rgba(255,255,255,0.95)',
                                    color: '#667eea',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    transition: 'all 0.3s ease',
                                    border: 'none'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                }}
                            >
                                ✏️ Edit Book
                            </Link>
                        )}
                    </div>
                </div>

                {/* Description Section */}
                <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <h3 style={{
                        margin: '0 0 1rem 0',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        📝 About This Book
                    </h3>
                    <p style={{
                        lineHeight: '1.8',
                        fontSize: '1.1rem',
                        margin: 0,
                        opacity: 0.95
                    }}>
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
