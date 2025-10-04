import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../utils/api';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const response = await fetchBooks(page);
                setBooks(response.books);
                setTotalPages(response.pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [page]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem' }}>Loading books...</div>
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
                margin: '1rem 0'
            }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {books.map(book => (
                    <div key={book._id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease-in-out',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <Link to={`/book/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3 style={{ 
                                margin: '0 0 0.5rem 0', 
                                color: '#333',
                                fontSize: '1.3rem',
                                lineHeight: '1.4'
                            }}>
                                {book.title}
                            </h3>
                            <p style={{ 
                                margin: '0 0 0.5rem 0', 
                                color: '#666',
                                fontWeight: '500'
                            }}>
                                by {book.author}
                            </p>
                            <p style={{ 
                                margin: '0 0 1rem 0', 
                                color: '#555',
                                lineHeight: '1.5',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book.description}
                            </p>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.9rem',
                                color: '#888'
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
                        </Link>
                    </div>
                ))}
            </div>

            {books.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem',
                    color: '#666'
                }}>
                    <h3>No books found</h3>
                    <p>Be the first to add a book to the platform!</p>
                </div>
            )}

            {totalPages > 1 && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '2rem'
                }}>
                    <button 
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ddd',
                            backgroundColor: page === 1 ? '#f8f9fa' : 'white',
                            color: page === 1 ? '#6c757d' : '#333',
                            borderRadius: '4px',
                            cursor: page === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Previous
                    </button>
                    
                    <span style={{ 
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '4px'
                    }}>
                        Page {page} of {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ddd',
                            backgroundColor: page === totalPages ? '#f8f9fa' : 'white',
                            color: page === totalPages ? '#6c757d' : '#333',
                            borderRadius: '4px',
                            cursor: page === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookList;
