import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftNav from '../LeftNav/LeftNav';
import { thunkExploreBooks } from '../../redux/books';
import { thunkGetReviews } from '../../redux/reviews'; // Import the review thunk
import BookExchangeRequestModal from '../BookExchangeRequestModal/BookExchangeRequestModal';
import ReviewModal from '../ReviewModal/ReviewModal'; // Import the review modal
import { useModal } from '../../context/Modal';
import './BookExplorer.css';

const BookExplorer = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.userBooks); // Select books from Redux store
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkExploreBooks()); // Fetch the books on mount
  }, [dispatch]);

  // Use this effect to log updates to the books array
  useEffect(() => {
    console.log('Books updated:', books);  // This will log when the `books` state updates
  }, [books]);

  const handleExchangeRequest = (book) => {
    setModalContent(
      <BookExchangeRequestModal
        book={book}
        onClose={() => closeModal()}
      />
    );
  };

  const handleLeaveReview = (book) => {
    // Fetch reviews for the book before showing the modal
    dispatch(thunkGetReviews(book.id));

    setModalContent(
      <ReviewModal
        book={book}  // Pass book details to ReviewModal
        onClose={() => closeModal()}
      />
    );
  };

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
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p className="book-description">{book.description}</p>

                {/* Display average rating */}
                <div className="book-rating">
                  <i className="fas fa-star" style={{ color: 'gold' }}></i>
                  {book.averageRating || 'No reviews yet'}
                </div>

                {/* Leave a Review button */}
                <button
                  className="leave-review-btn"
                  onClick={() => handleLeaveReview(book)}
                >
                  Leave a Review
                </button>
              </div>

              <div className="book-actions">
                {book.status === 'available' ? (
                  <>
                    <div className="availability-status">
                      <i className="fas fa-check-circle" style={{ color: 'green' }}></i> Available
                    </div>
                    <button
                      className="exchange-request-btn"
                      onClick={() => handleExchangeRequest(book)}
                    >
                      ER
                    </button>
                  </>
                ) : (
                  <div className="availability-status">
                    <i className="fas fa-hourglass-half" style={{ color: 'orange' }}></i> Borrowed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookExplorer;
