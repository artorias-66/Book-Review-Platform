import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://book-review-platform.vercel.app/api'  // Vercel URL
    : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
export const fetchBooks = async (page = 1) => {
    const response = await api.get(`/books?page=${page}`);
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