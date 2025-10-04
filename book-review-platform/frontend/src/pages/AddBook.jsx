import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBook, updateBook, fetchBookById } from '../utils/api';

const AddBook = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        if (isEdit) {
            const fetchBook = async () => {
                try {
                    const book = await fetchBookById(id);
                    setFormData({
                        title: book.title,
                        author: book.author,
                        description: book.description,
                        genre: book.genre,
                        year: book.year.toString()
                    });
                } catch (err) {
                    setError('Failed to fetch book details');
                }
            };
            fetchBook();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const bookData = {
                ...formData,
                year: parseInt(formData.year)
            };

            if (isEdit) {
                await updateBook(id, bookData);
            } else {
                await createBook(bookData);
            }
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save book');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div>Please log in to add/edit books.</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1>{isEdit ? 'Edit Book' : 'Add New Book'}</h1>
            
            {error && (
                <div style={{ 
                    color: 'red', 
                    backgroundColor: '#f8d7da', 
                    padding: '0.75rem', 
                    borderRadius: '4px',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
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
                    <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Author *
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
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
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            resize: 'vertical'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="genre" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Genre *
                    </label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
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
                    <label htmlFor="year" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Published Year *
                    </label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        min="1000"
                        max="2024"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Saving...' : (isEdit ? 'Update Book' : 'Add Book')}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;

