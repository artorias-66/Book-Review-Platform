import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userPayload = {
                id: decodedToken.id,
                token: token
            };
            setUser(userPayload);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        const userPayload = {
            id: decodedToken.id,
            token: data.token
        };
        setUser(userPayload);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const register = async (name, email, password) => {
        await api.post('/auth/register', { name, email, password });
    };

    const value = {
        user,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
