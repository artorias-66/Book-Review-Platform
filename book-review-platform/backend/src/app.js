require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: true,  // Allow all origins in production (temporary fix)
    credentials: true
}));
app.use(bodyParser.json());

// Database Connection
connectDB();

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Book Review Platform API is running',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected',
        endpoints: {
            auth: '/api/auth',
            books: '/api/books',
            reviews: '/api/reviews'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

// Export for Vercel
module.exports = app;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`MongoDB URI: ${process.env.MONGO_URI ? 'Set' : 'Not set'}`);
});