import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../../utils/api';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const genres = [
        'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance',
        'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help',
        'Business', 'Poetry', 'Horror', 'Adventure', 'Other'
    ];

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (selectedGenre) params.append('genre', selectedGenre);
                params.append('page', page);
                
                const response = await fetchBooks(page, searchTerm, selectedGenre);
                setBooks(response.books);
                setTotalPages(response.pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            loadBooks();
        }, 300);

        return () => clearTimeout(debounce);
    }, [page, searchTerm, selectedGenre]);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <div style={styles.loadingText}>Loading amazing books...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <span style={styles.errorIcon}>⚠️</span>
                <div style={styles.errorText}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div>
            {/* Search and Filter Bar */}
            <div style={styles.searchBar}>
                <div style={styles.searchInputWrapper}>
                    <span style={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search books by title, author, or description..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                        style={styles.searchInput}
                    />
                </div>
                <select
                    value={selectedGenre}
                    onChange={(e) => {
                        setSelectedGenre(e.target.value);
                        setPage(1);
                    }}
                    style={styles.genreSelect}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <div style={styles.bookGrid}>
                {books.map(book => (
                    <Link 
                        key={book._id} 
                        to={`/book/${book._id}`} 
                        style={styles.bookCard}
                        className="book-card"
                    >
                        <div style={styles.bookCover}>
                            {book.coverImage ? (
                                <img 
                                    src={book.coverImage} 
                                    alt={book.title}
                                    style={styles.coverImage}
                                />
                            ) : (
                                <div style={styles.placeholderCover}>
                                    <span style={styles.placeholderEmoji}>📚</span>
                                </div>
                            )}
                        </div>
                        <div style={styles.bookInfo}>
                            <h3 style={styles.bookTitle}>
                                {book.title}
                            </h3>
                            <p style={styles.bookAuthor}>
                                by {book.author}
                            </p>
                            <p style={styles.bookDescription}>
                                {book.description}
                            </p>
                            <div style={styles.bookMeta}>
                                <span style={styles.genreBadge}>
                                    {book.genre}
                                </span>
                                <span style={styles.yearBadge}>
                                    📅 {book.year}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {books.length === 0 && (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📚</div>
                    <h3 style={styles.emptyTitle}>No books found</h3>
                    <p style={styles.emptyText}>
                        {searchTerm || selectedGenre 
                            ? 'Try adjusting your search or filters' 
                            : 'Be the first to add a book to the platform!'}
                    </p>
                </div>
            )}

            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button 
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        style={{
                            ...styles.pageButton,
                            opacity: page === 1 ? 0.5 : 1,
                            cursor: page === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ← Previous
                    </button>
                    
                    <div style={styles.pageNumbers}>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (page <= 3) {
                                pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = page - 2 + i;
                            }
                            
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    style={{
                                        ...styles.pageNumber,
                                        ...(page === pageNum ? styles.pageNumberActive : {})
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                    
                    <button 
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        style={{
                            ...styles.pageButton,
                            opacity: page === totalPages ? 0.5 : 1,
                            cursor: page === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    loadingContainer: {
        textAlign: 'center',
        padding: '4rem 2rem',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        margin: '0 auto 1rem auto',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        fontSize: '1.1rem',
        color: '#666',
    },
    errorContainer: {
        textAlign: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
        borderRadius: '12px',
        color: 'white',
        margin: '1rem 0',
    },
    errorIcon: {
        fontSize: '3rem',
        display: 'block',
        marginBottom: '0.5rem',
    },
    errorText: {
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    searchBar: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
    },
    searchInputWrapper: {
        flex: '1',
        minWidth: '250px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        fontSize: '1.2rem',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '0.9rem 1rem 0.9rem 3rem',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
    },
    genreSelect: {
        padding: '0.9rem 1.5rem',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        fontSize: '1rem',
        background: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        outline: 'none',
        minWidth: '150px',
    },
    bookGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
    },
    bookCard: {
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
    },
    bookCover: {
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholderCover: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderEmoji: {
        fontSize: '5rem',
        opacity: 0.5,
    },
    bookInfo: {
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    bookTitle: {
        margin: '0 0 0.5rem 0',
        color: '#333',
        fontSize: '1.3rem',
        fontWeight: '600',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    bookAuthor: {
        margin: '0 0 1rem 0',
        color: '#667eea',
        fontWeight: '500',
        fontSize: '0.95rem',
    },
    bookDescription: {
        margin: '0 0 1rem 0',
        color: '#666',
        lineHeight: '1.6',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1,
    },
    bookMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
    },
    genreBadge: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.4rem 0.8rem',
        borderRadius: '20px',
        fontWeight: '500',
    },
    yearBadge: {
        color: '#888',
        fontWeight: '500',
    },
    emptyState: {
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    },
    emptyIcon: {
        fontSize: '4rem',
        marginBottom: '1rem',
    },
    emptyTitle: {
        fontSize: '1.5rem',
        color: '#333',
        margin: '0 0 0.5rem 0',
    },
    emptyText: {
        color: '#666',
        fontSize: '1.1rem',
        margin: 0,
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '3rem',
        flexWrap: 'wrap',
    },
    pageButton: {
        padding: '0.7rem 1.5rem',
        border: '2px solid #667eea',
        background: 'white',
        color: '#667eea',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
    },
    pageNumbers: {
        display: 'flex',
        gap: '0.5rem',
    },
    pageNumber: {
        padding: '0.7rem 1rem',
        border: '2px solid #e0e0e0',
        background: 'white',
        color: '#333',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minWidth: '45px',
    },
    pageNumberActive: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderColor: '#667eea',
    },
};

// Add animations and hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .book-card:hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 12px 30px rgba(102, 126, 234, 0.2) !important;
    }
    input[style*="searchInput"]:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    select[style*="genreSelect"]:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    }
    button[style*="pageButton"]:not(:disabled):hover {
        background: #667eea !important;
        color: white !important;
        transform: translateY(-2px);
    }
    button[style*="pageNumber"]:hover {
        border-color: #667eea !important;
        transform: translateY(-2px);
    }
`;
if (!document.head.querySelector('style[data-booklist-styles]')) {
    styleSheet.setAttribute('data-booklist-styles', 'true');
    document.head.appendChild(styleSheet);
}

export default BookList;
