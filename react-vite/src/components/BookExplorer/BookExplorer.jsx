import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftNav from '../LeftNav/LeftNav';
import { thunkExploreBooks } from '../../redux/books';  // Import your thunk
import './BookExplorer.css';

const BookExplorer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.userBooks); // Assuming you'll use the same state

  useEffect(() => {
    dispatch(thunkExploreBooks()); // Fetch books for the explorer page
  }, [dispatch]);

  const handleExchangeRequest = (bookId) => {
    // Placeholder for handling exchange request initiation logic
    console.log(`Exchange request initiated for book ID: ${bookId}`);
  };

  return (
    <div className="book-explorer-layout">
      <LeftNav />
      <div className="book-explorer-container">
        <h1>Book Explorer</h1>
        <div className="books-list">
          {books.map((book) => (
            <div key={book.id} className="book-tile">
              <img src={book.image_url} alt={book.title} className="book-image" />
              <div className="book-details">
                <h2>{book.title}</h2>
                <p className="book-owner">Owner: {book.owner}</p>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p className="book-description">{book.description}</p>
              </div>
              <div className="book-actions">
                {book.status === 'available' ? (
                  <div className="availability-status">
                    <i className="fas fa-check-circle" style={{ color: 'green' }}></i> Available
                  </div>
                ) : (
                  <div className="availability-status">
                    <i className="fas fa-hourglass-half" style={{ color: 'orange' }}></i> Borrowed
                  </div>
                )}
                {/* Add the circular Exchange Request button here */}
                <button
                  className="exchange-request-btn"
                  onClick={() => handleExchangeRequest(book.id)}
                >
                  ER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookExplorer;
