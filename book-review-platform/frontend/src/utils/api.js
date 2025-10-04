import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// Auth API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

// Book API calls
export const fetchBooks = async () => {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
};

export const fetchBookById = async (bookId) => {
    const response = await axios.get(`${API_URL}/books/${bookId}`);
    return response.data;
};

export const createBook = async (bookData, token) => {
    const response = await axios.post(`${API_URL}/books`, bookData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Review API calls
export const fetchReviewsByBookId = async (bookId) => {
    const response = await axios.get(`${API_URL}/reviews/${bookId}`);
    return response.data;
};

export const addReview = async (bookId, reviewData, token) => {
    const response = await axios.post(`${API_URL}/reviews/${bookId}`, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};