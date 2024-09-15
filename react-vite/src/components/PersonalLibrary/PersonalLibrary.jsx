import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetBooks, thunkDeleteBook } from '../../redux/books';
import LeftNav from '../LeftNav/LeftNav';
import AddBookForm from '../AddBookForm/AddBookForm';
import EditBookForm from '../EditBookForm/EditBookForm';
import { useModal } from '../../context/Modal';
import './PersonalLibrary.css'; //comment

const PersonalLibrary = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.userBooks);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkGetBooks());
  }, [dispatch]);

  const openAddBookModal = () => {
    setModalContent(<AddBookForm closeModal={closeModal} />);
  };

  const openEditBookModal = (book) => {
    setModalContent(<EditBookForm book={book} closeModal={closeModal} />);
  };

  const handleDelete = (bookId) => {
  dispatch(thunkDeleteBook(bookId))
    .then(() => {
      dispatch(thunkGetBooks());
      closeModal();
    })
    .catch(err => {
      if (err.message.includes('active exchange requests')) {
        setModalContent(
          <div>
            <h2>Cannot Delete Book</h2>
            <p>This book has active exchange requests and cannot be deleted.</p>
            <button onClick={closeModal} className="confirm-button">Okay</button>
          </div>
        );
      } else {
        console.error("Failed to delete book:", err);
      }
    });
};

const openDeleteConfirmationModal = (bookId) => {
  setModalContent(
    <div>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this book?</p>
      <button onClick={() => handleDelete(bookId)} className="confirm-button">Yes, delete</button>
      <button onClick={closeModal} className="cancel-button">Cancel</button>
    </div>
  );
};

  return (
    <div className="personal-library-layout">
      <LeftNav />
      <div className="personal-library-container">
        <div className="header-container">
          <h1>My Personal Library</h1>
          <button className="add-book-button" onClick={openAddBookModal}>Add Book</button>
        </div>

        {/* Show this message when there are no books */}
        {books.length === 0 ? (
          <div className="empty-library-message">
            <p>Your library is empty! Start by adding a new book.</p>
          </div>
        ) : (
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
                  <button className="edit-button" onClick={() => openEditBookModal(book)}>Edit</button>
                  <button
                    className="delete-button"
                    onClick={() => openDeleteConfirmationModal(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalLibrary;
