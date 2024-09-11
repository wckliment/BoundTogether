import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftNav from '../LeftNav/LeftNav';
import { thunkExploreBooks } from '../../redux/books';
import BookExchangeRequestModal from '../BookExchangeRequestModal/BookExchangeRequestModal';
import { useModal } from '../../context/Modal';
import './BookExplorer.css';

const BookExplorer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.userBooks);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkExploreBooks());
  }, [dispatch]);

  const handleExchangeRequest = (book) => {
    // Open the modal with BookExchangeRequestModal and pass the book (including owner_id)
    setModalContent(
      <BookExchangeRequestModal
        book={book}
        onClose={() => {
          closeModal(); // Close the modal
        }}
      />
    );
  };

  // Check for loading or empty books state
  if (!books) {
    return <div>Loading books...</div>;
  }

  if (books.length === 0) {
    return <div>No books available at the moment.</div>;
  }

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
                <p className="book-owner">
                  Owner: {book.owner ? book.owner.username : 'Unknown'}
                </p> {/* Ensure the owner is displayed */}
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p className="book-description">{book.description}</p>

                {/* Display average rating */}
                <div className="book-rating">
                  <i className="fas fa-star" style={{ color: 'gold' }}></i> {book.averageRating || 'No reviews yet'}
                </div>
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
                <button
                  className="exchange-request-btn"
                  onClick={() => handleExchangeRequest(book)} // Pass the book object, including owner_id
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
