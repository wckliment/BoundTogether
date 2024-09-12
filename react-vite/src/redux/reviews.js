// Import the updateBook action from redux/books.js
import { updateBook } from './books';

// Action types
const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action creators
const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Fetch all reviews for a book
export const thunkGetReviews = (bookId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/books/${bookId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(setReviews(reviews));
  }
};

// Create a new review
export const thunkCreateReview = (bookId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/books/${bookId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (response.ok) {
    const updatedBook = await response.json();  // The updated book with the new average rating
    dispatch(addReview(updatedBook.reviews[updatedBook.reviews.length - 1]));  // Add the new review
    dispatch(updateBook(updatedBook));  // Update the book's average rating in the Redux store
  }
};

// Update an existing review
export const thunkUpdateReview = (reviewId, reviewData) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview));

    // Fetch the updated book to recalculate the average rating
    const bookResponse = await fetch(`/api/books/${updatedReview.book_id}`);
    if (bookResponse.ok) {
      const updatedBook = await bookResponse.json();
      dispatch(updateBook(updatedBook)); // Update the book's average rating in the state
    }
  }
};

// Delete a review
export const thunkDeleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(reviewId));
  }
};

// Initial state
const initialState = {
  reviews: [],
};

// Reducer
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.reviews };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review.id === action.review.id ? action.review : review
        ),
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.reviewId),
      };
    default:
      return state;
  }
}
