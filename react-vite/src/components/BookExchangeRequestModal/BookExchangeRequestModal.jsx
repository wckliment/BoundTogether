import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateExchangeRequest } from '../../redux/exchangeRequests';
import { useModal } from '../../context/Modal';
import './BookExchangeRequestModal.css';

const BookExchangeRequestModal = ({ book }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [dueDate, setDueDate] = useState('');
  const modalRef = useRef();


  console.log('Rendering Modal for book:', book);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      book_id: book.id,
      due_date: dueDate,
      owner_id: book.user_id
    };

    
    console.log('Submitting exchange request with data:', requestData);

    try {
      await dispatch(thunkCreateExchangeRequest(requestData));
      closeModal();
    } catch (error) {
      console.error("Failed to create exchange request:", error);
    }
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="modal-title" style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
            Request Exchange for {book.title}
          </h2>
          <button className="close-button" style={{ fontSize: '18px', cursor: 'pointer', background: 'none', border: 'none' }} onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="due-date" style={{ display: 'block', marginBottom: '10px' }}>Requested Due Date:</label>
          <input
            type="date"
            id="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '20px', padding: '10px', fontSize: '16px', width: '100%' }}
          />
          <div className="modal-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" className="submit-button" style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit Exchange Request
            </button>
            <button type="button" onClick={closeModal} className="cancel-button" style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookExchangeRequestModal;
