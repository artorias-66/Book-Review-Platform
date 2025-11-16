import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookList from '../components/Books/BookList';

const Home = () => {
    const { user } = useAuth();

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <div style={styles.heroText}>
                        <h1 style={styles.heroTitle}>
                            Welcome to BookReview 📚
                        </h1>
                        <p style={styles.heroSubtitle}>
                            Discover amazing books, share your thoughts, and connect with fellow readers from around the world
                        </p>
                        {!user ? (
                            <div style={styles.heroButtons}>
                                <Link to="/register" style={styles.primaryBtn}>
                                    ✨ Get Started
                                </Link>
                                <Link to="/books" style={styles.secondaryBtn}>
                                    📖 Browse Books
                                </Link>
                            </div>
                        ) : (
                            <div style={styles.heroButtons}>
                                <Link to="/profile" style={styles.primaryBtn}>
                                    📝 Add a Book
                                </Link>
                                <Link to="/books" style={styles.secondaryBtn}>
                                    📖 Browse All Books
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Decorative elements */}
                    <div style={styles.decorativeCircle1}></div>
                    <div style={styles.decorativeCircle2}></div>
                    <div style={styles.decorativeCircle3}></div>
                </div>
            </div>

            {/* Features Section */}
            <div style={styles.features}>
                <div style={styles.featureCard}>
                    <div style={styles.featureIcon}>📚</div>
                    <h3 style={styles.featureTitle}>Discover Books</h3>
                    <p style={styles.featureText}>Explore thousands of books across all genres</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.featureIcon}>⭐</div>
                    <h3 style={styles.featureTitle}>Share Reviews</h3>
                    <p style={styles.featureText}>Rate and review your favorite reads</p>
                </div>
                <div style={styles.featureCard}>
                    <div style={styles.featureIcon}>👥</div>
                    <h3 style={styles.featureTitle}>Join Community</h3>
                    <p style={styles.featureText}>Connect with fellow book lovers</p>
                </div>
            </div>

            {/* Latest Books Section */}
            <div style={styles.booksSection}>
                <h2 style={styles.sectionTitle}>Latest Books</h2>
                <BookList />
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
    },
    hero: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '3rem',
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    heroText: {
        textAlign: 'center',
        color: 'white',
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: '800',
        margin: '0 0 1rem 0',
        lineHeight: '1.2',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    heroSubtitle: {
        fontSize: '1.3rem',
        margin: '0 0 2rem 0',
        opacity: 0.95,
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6',
    },
    heroButtons: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    primaryBtn: {
        background: 'white',
        color: '#667eea',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1.1rem',
        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        display: 'inline-block',
    },
    secondaryBtn: {
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1.1rem',
        border: '2px solid white',
        transition: 'all 0.3s ease',
        display: 'inline-block',
    },
    decorativeCircle1: {
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        top: '-100px',
        right: '-50px',
        zIndex: 0,
    },
    decorativeCircle2: {
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        bottom: '-50px',
        left: '-30px',
        zIndex: 0,
    },
    decorativeCircle3: {
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        top: '50%',
        right: '10%',
        zIndex: 0,
    },
    features: {
        maxWidth: '1200px',
        margin: '0 auto 4rem auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    featureTitle: {
        fontSize: '1.3rem',
        fontWeight: '600',
        margin: '0 0 0.5rem 0',
        color: '#333',
    },
    featureText: {
        color: '#666',
        margin: 0,
        lineHeight: '1.6',
    },
    booksSection: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 3rem 2rem',
    },
    sectionTitle: {
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '2rem',
        color: '#333',
        textAlign: 'center',
    },
};

// Add hover effects via CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    a[href="/register"]:hover, a[href*="profile"]:hover {
        transform: translateY(-3px) scale(1.05) !important;
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
    }
    a[href="/books"]:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-3px) !important;
    }
    div[style*="featureCard"]:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15) !important;
    }
    @media (max-width: 768px) {
        h1[style*="heroTitle"] {
            font-size: 2.5rem !important;
        }
        p[style*="heroSubtitle"] {
            font-size: 1.1rem !important;
        }
    }
`;
if (!document.head.querySelector('style[data-home-styles]')) {
    styleSheet.setAttribute('data-home-styles', 'true');
    document.head.appendChild(styleSheet);
}

export default Home;