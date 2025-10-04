import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get(`/books?page=${page}`);
                setBooks(response.data.books);
                setTotalPages(response.data.pages);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <h3><Link to={`/book/${book._id}`}>{book.title}</Link></h3>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                    </li>
                ))}
            </ul>
            <div>
                {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
                <span>Page {page} of {totalPages}</span>
                {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
            </div>
        </div>
    );
};

export default BookList;
