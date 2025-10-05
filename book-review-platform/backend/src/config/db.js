const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            console.warn('MONGO_URI environment variable is not set');
            console.log('Please set MONGO_URI in your environment variables for full functionality');
            
            // For development, you can use a local MongoDB
            if (process.env.NODE_ENV !== 'production') {
                mongoURI = 'mongodb://localhost:27017/bookreview';
                console.log('Using local MongoDB for development');
            } else {
                console.log('Skipping MongoDB connection in production without MONGO_URI');
                return; // Don't exit, just skip the connection
            }
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.log('Continuing without MongoDB connection...');
        // Don't exit the process, just log the error
    }
};

module.exports = connectDB;