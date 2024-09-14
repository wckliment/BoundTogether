import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateReview, thunkUpdateReview } from '../../redux/reviews';
import './ReviewModal.css';

const ReviewModal = ({ book, onClose, existingReview }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      reviewee_id: book.user_id,
    };


    if (existingReview) {
      dispatch(thunkUpdateReview(existingReview.id, reviewData));
    } else {
      dispatch(thunkCreateReview(book.id, reviewData));  
    }

    onClose();  // Close modal after submission
  };

  const Star = ({ starNumber }) => (
    <i
      className={`fas fa-star ${starNumber <= (hoverRating || rating) ? 'filled' : 'empty'}`}
      onClick={() => setRating(starNumber)}
      onMouseEnter={() => setHoverRating(starNumber)}
      onMouseLeave={() => setHoverRating(0)}
      style={{ cursor: 'pointer' }}
    ></i>
  );

  return (
    <div className="review-modal">
      <h2>Leave a Review for {book.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <Star key={starNumber} starNumber={starNumber} />
          ))}
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button" disabled={rating === 0}>
            Submit Rating
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
