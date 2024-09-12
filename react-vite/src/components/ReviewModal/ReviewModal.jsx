import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateReview, thunkUpdateReview } from '../../redux/reviews'; // Import both thunks
import './ReviewModal.css';  // Assuming you will have some CSS for the stars

const ReviewModal = ({ book, onClose, existingReview }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 0); // Pre-populate if updating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      reviewee_id: book.user_id,  // The owner of the book
    };

    // If an existing review is provided, update it; otherwise, create a new one
    if (existingReview) {
      dispatch(thunkUpdateReview(existingReview.id, reviewData));  // Update review
    } else {
      dispatch(thunkCreateReview(book.id, reviewData));  // Create new review
    }

    onClose();  // Close modal after submission
  };

  const Star = ({ starNumber }) => (
    <i
      className={`fas fa-star ${starNumber <= (hoverRating || rating) ? 'filled' : 'empty'}`}
      onClick={() => setRating(starNumber)}
      onMouseEnter={() => setHoverRating(starNumber)}
      onMouseLeave={() => setHoverRating(0)}
      style={{ cursor: 'pointer', color: starNumber <= (hoverRating || rating) ? 'gold' : 'gray' }}
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
        <button type="submit" disabled={rating === 0}>Submit Rating</button>  {/* Disable until a rating is selected */}
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default ReviewModal;
