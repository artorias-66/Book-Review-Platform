const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            console.error('MongoDB connection failed: MONGO_URI environment variable is not set');
            console.log('Please set MONGO_URI in your environment variables');
            
            // For development, you can use a local MongoDB
            if (process.env.NODE_ENV !== 'production') {
                mongoURI = 'mongodb://localhost:27017/bookreview';
                console.log('Using local MongoDB for development');
            } else {
                process.exit(1);
            }
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;