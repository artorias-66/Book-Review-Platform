import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'https://book-review-platform-1-vnd3.onrender.com/api'
        : 'http://localhost:5000/api');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.status, error.response.data);
            
            // Handle unauthorized access
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
            error.message = 'Network error. Please check your connection.';
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
};

// Book API calls
export const fetchBooks = async (page = 1, search = '', genre = '') => {
    const params = new URLSearchParams();
    params.append('page', page);
    if (search) params.append('search', search);
    if (genre) params.append('genre', genre);
    
    const response = await api.get(`/books?${params.toString()}`);
    return response.data;
};

export const fetchBookById = async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
};

export const createBook = async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
};

export const updateBook = async (bookId, bookData) => {
    const response = await api.put(`/books/${bookId}`, bookData);
    return response.data;
};

export const deleteBook = async (bookId) => {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
};

// Review API calls
export const fetchReviewsByBookId = async (bookId) => {
    const response = await api.get(`/reviews/${bookId}`);
    return response.data;
};

export const addReview = async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};

// User API calls
export const fetchUserBooks = async (userId) => {
    const response = await api.get(`/books/user/${userId}`);
    return response.data;
};

export const fetchUserReviews = async (userId) => {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
};

export default api;