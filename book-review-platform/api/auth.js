const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../backend/src/models/User');

const app = express();

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookreview', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = app;
