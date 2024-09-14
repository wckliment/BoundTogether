import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateReview } from '../../redux/reviews';

const SubmitReviewForm = ({ bookId, revieweeId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      comment,
      reviewee_id: revieweeId, 
    };

    dispatch(thunkCreateReview(bookId, reviewData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default SubmitReviewForm;
