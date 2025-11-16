import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBook, updateBook, fetchBookById } from '../utils/api';
import '../index.css';

const AddBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: new Date().getFullYear(),
    coverImage: ''
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      const book = await fetchBookById(id);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        genre: book.genre || '',
        year: book.year || new Date().getFullYear(),
        coverImage: book.coverImage || ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim() || !formData.author.trim() || !formData.description.trim() || !formData.genre.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.year < 1000 || formData.year > new Date().getFullYear() + 10) {
      setError('Please enter a valid year');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateBook(id, formData);
        setSuccess('Book updated successfully!');
      } else {
        await createBook(formData);
        setSuccess('Book added successfully!');
      }
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} book`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="container"><p>Please log in to add books.</p></div>;
  }

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h1 className="page-title">{isEditMode ? 'Edit Book' : 'Add New Book'}</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            maxLength="200"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            maxLength="100"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre *</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Poetry">Poetry</option>
            <option value="Children">Children</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="year">Publication Year *</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter publication year"
            required
            min="1000"
            max={new Date().getFullYear() + 10}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL (optional)</label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
            required
            maxLength="2000"
            rows="6"
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ flex: 1 }}
          >
            {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Book' : 'Add Book')}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/profile')} 
            className="btn btn-secondary"
            disabled={loading}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
