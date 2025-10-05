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
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://book-review-platform.vercel.app', 'https://book-review-platform-frontend.vercel.app']  // Allow Vercel frontend
        : 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

// Export for Vercel
module.exports = app;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});