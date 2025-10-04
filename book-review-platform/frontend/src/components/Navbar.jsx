import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1rem 2rem',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #dee2e6'
        }}>
            <h1><Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Book Review Platform</Link></h1>
            <ul style={{ 
                display: 'flex', 
                listStyle: 'none', 
                gap: '1rem', 
                margin: 0, 
                padding: 0 
            }}>
                <li><Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link></li>
                {user ? (
                    <>
                        <li><Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link></li>
                        <li><Link to="/add-book" style={{ textDecoration: 'none', color: '#333' }}>Add Book</Link></li>
                        <li>
                            <span style={{ marginRight: '1rem' }}>Welcome, {user.name}!</span>
                            <button onClick={logout} style={{ 
                                background: '#dc3545', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.5rem 1rem', 
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login</Link></li>
                        <li><Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;