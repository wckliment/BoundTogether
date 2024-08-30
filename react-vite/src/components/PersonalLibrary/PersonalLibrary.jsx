import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBooks } from '../../redux/books';
import LeftNav from '../LeftNav/LeftNav';
import './PersonalLibrary.css';

const PersonalLibrary = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.userBooks);

  useEffect(() => {
    dispatch(thunkGetBooks());
  }, [dispatch]);

  return (
    <div className="personal-library-layout">
      <LeftNav />
      <div className="personal-library-container">
        <div className="header-container">
          <h1>My Personal Library</h1>
          <button className="add-book-button">Add Book</button>
        </div>
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book-tile">
              <img src={book.image_url} alt={book.title} className="book-image" />
              <div className="book-details">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
              <div className="book-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalLibrary;
