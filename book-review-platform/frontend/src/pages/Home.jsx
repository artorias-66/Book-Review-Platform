import React from 'react';
import BookList from '../components/Books/BookList';

const Home = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
                Welcome to Book Review Platform
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontSize: '1.1rem' }}>
                Discover, review, and share your favorite books with the community
            </p>
            <BookList />
        </div>
    );
};

export default Home;