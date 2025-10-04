import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '2rem auto', 
            padding: '0 1rem' 
        }}>
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '2rem', 
                    color: '#333',
                    fontSize: '2rem'
                }}>
                    Register
                </h2>
                
                {error && (
                    <div style={{ 
                        color: 'red', 
                        backgroundColor: '#f8d7da',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Name
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={handleChange} 
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handleChange} 
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={handleChange} 
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#6c757d' : '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '1rem'
                        }}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '1.5rem',
                    color: '#6c757d'
                }}>
                    <p style={{ margin: 0 }}>
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            style={{ 
                                color: '#007bff', 
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
