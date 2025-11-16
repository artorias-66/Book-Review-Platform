import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                {/* Logo/Brand */}
                <Link to="/" style={styles.logo}>
                    <span style={styles.logoIcon}>📚</span>
                    <span style={styles.logoText}>BookReview</span>
                </Link>

                {/* Desktop Navigation */}
                <ul style={styles.navLinks}>
                    <li style={styles.navItem}>
                        <Link to="/" style={styles.navLink}>🏠 Home</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/books" style={styles.navLink}>📖 Books</Link>
                    </li>
                    {user ? (
                        <>
                            <li style={styles.navItem}>
                                <Link to="/profile" style={styles.navLink}>👤 Profile</Link>
                            </li>
                            <li style={styles.navItem}>
                                <button onClick={handleLogout} style={styles.logoutBtn}>
                                    🚪 Logout
                                </button>
                            </li>
                            <li style={styles.navItem}>
                                <span style={styles.username}>👋 {user.name}</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li style={styles.navItem}>
                                <Link to="/login" style={styles.navLink}>🔑 Login</Link>
                            </li>
                            <li style={styles.navItem}>
                                <Link to="/register" style={styles.registerBtn}>✨ Register</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    style={styles.menuButton} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span style={styles.menuIcon}>{isMenuOpen ? '✕' : '☰'}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div style={styles.mobileMenu}>
                    <Link to="/" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        🏠 Home
                    </Link>
                    <Link to="/books" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                        📖 Books
                    </Link>
                    {user ? (
                        <>
                            <Link to="/profile" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                                👤 Profile
                            </Link>
                            <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                                🚪 Logout
                            </button>
                            <div style={styles.mobileUsername}>👋 Welcome, {user.name}</div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                                🔑 Login
                            </Link>
                            <Link to="/register" style={styles.mobileRegisterBtn} onClick={() => setIsMenuOpen(false)}>
                                ✨ Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

const styles = {
    navbar: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0',
        backdropFilter: 'blur(10px)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '700',
        transition: 'transform 0.3s ease',
    },
    logoIcon: {
        fontSize: '1.8rem',
    },
    logoText: {
        background: 'linear-gradient(to right, #fff, #f0f0f0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '800',
        letterSpacing: '-0.5px',
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        gap: '0.5rem',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: 0,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        display: 'inline-block',
        fontSize: '0.95rem',
        fontWeight: '500',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    registerBtn: {
        color: '#667eea',
        background: 'white',
        textDecoration: 'none',
        padding: '0.6rem 1.5rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        display: 'inline-block',
        fontSize: '0.95rem',
        fontWeight: '600',
        boxShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
    },
    logoutBtn: {
        color: 'white',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '0.95rem',
        fontWeight: '500',
    },
    username: {
        color: 'white',
        padding: '0.6rem 1rem',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: '600',
    },
    menuButton: {
        display: 'none',
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        padding: '0.5rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    menuIcon: {
        display: 'block',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
    },
    mobileMenu: {
        display: 'none',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'rgba(102, 126, 234, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    },
    mobileLink: {
        color: 'white',
        textDecoration: 'none',
        padding: '0.8rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.1)',
        fontSize: '1rem',
        fontWeight: '500',
    },
    mobileRegisterBtn: {
        color: '#667eea',
        background: 'white',
        textDecoration: 'none',
        padding: '0.8rem 1rem',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
        fontWeight: '600',
        textAlign: 'center',
    },
    mobileLogoutBtn: {
        color: 'white',
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '0.8rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '1rem',
        fontWeight: '500',
    },
    mobileUsername: {
        color: 'white',
        padding: '0.8rem 1rem',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        fontSize: '0.95rem',
        fontWeight: '600',
        textAlign: 'center',
    },
};

// Add media query styles via CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @media (max-width: 768px) {
        nav ul {
            display: none !important;
        }
        nav button[aria-label="Toggle menu"] {
            display: block !important;
        }
        nav > div:last-child {
            display: flex !important;
        }
    }
    nav a:hover {
        background: rgba(255, 255, 255, 0.25) !important;
        transform: translateY(-2px);
    }
    nav button:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-2px);
    }
    nav a[style*="background: white"]:hover {
        background: #f0f0f0 !important;
        transform: translateY(-2px) scale(1.05);
    }
`;
document.head.appendChild(styleSheet);

export default Navbar;