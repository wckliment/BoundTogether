const SET_BOOKS = 'books/SET_BOOKS';
const ADD_BOOK = 'books/ADD_BOOK';
const EDIT_BOOK = 'books/EDIT_BOOK';
const DELETE_BOOK = 'books/DELETE_BOOK';
const UPDATE_BOOK_STATUS = 'books/UPDATE_BOOK_STATUS'; // New action type for updating book status
const UPDATE_BOOK = 'books/UPDATE_BOOK';

// Action creators
export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
});

export const addBook = (book) => ({
  type: ADD_BOOK,
  book,
});

export const editBook = (book) => ({
  type: EDIT_BOOK,
  book,
});

export const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  bookId,
});

// New action for updating the status of a book
export const updateBookStatus = (bookId, status) => ({
  type: UPDATE_BOOK_STATUS,
  bookId,
  status,
});

// Action creator for updating a book
export const updateBook = (book) => ({
  type: UPDATE_BOOK,
  book,
});

// Thunk action for getting books
export const thunkGetBooks = () => async (dispatch) => {
  const response = await fetch('/api/books/user');
  if (response.ok) {
    const books = await response.json();
    dispatch(setBooks(books));
  }
};

// Thunk action for adding a book
export const thunkAddBook = (bookData) => async (dispatch) => {
  try {
    const response = await fetch('/api/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      const newBook = await response.json();
      dispatch(addBook(newBook));  // Dispatch the addBook action with the new book
      return newBook;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.errors);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Thunk action for deleting a book
export const thunkDeleteBook = (bookId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteBook(bookId));  // Dispatch the delete action
      return Promise.resolve();  // Resolve the promise
    } else {
      return Promise.reject('Failed to delete book');
    }
  } catch (error) {
    return Promise.reject(error);  // Reject the promise with error
  }
};

// Thunk action for editing a book
export const thunkEditBook = (bookData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (response.ok) {
      const updatedBook = await response.json();
      dispatch(editBook(updatedBook));  // Dispatch the editBook action with the updated book
      return updatedBook;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData.errors);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// Thunk action for updating the status of a book (available/not available)
export const thunkUpdateBookStatus = (bookId, status) => async (dispatch) => {
  try {
    const response = await fetch(`/api/books/${bookId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),  // Send the new status in the body
    });

    if (response.ok) {
      dispatch(updateBookStatus(bookId, status));  // Dispatch the updateBookStatus action
    } else {
      console.error('Failed to update book status');
    }
  } catch (error) {
    console.error('Error updating book status:', error);
  }
};

// Thunk action for getting books from all users except the current user
export const thunkExploreBooks = () => async (dispatch) => {
  try {
    const response = await fetch('/api/books/explore');
    if (response.ok) {
      const books = await response.json();
      console.log('Books fetched:', books); // Add this line to check the response
      dispatch(setBooks(books)); // Reusing setBooks for now, adjust if needed
    } else {
      console.error('Failed to fetch books');
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

// Initial state
const initialState = {
  userBooks: [], // Initialize as an empty array
};
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, userBooks: action.books };  // Books include averageRating
    case ADD_BOOK:
      return { ...state, userBooks: [...state.userBooks, action.book] };
    case EDIT_BOOK:
      return {
        ...state,
        userBooks: state.userBooks.map((book) =>
          book.id === action.book.id ? action.book : book
        ),
      };
    case DELETE_BOOK:
      return {
        ...state,
        userBooks: state.userBooks.filter((book) => book.id !== action.bookId),
      };
    case UPDATE_BOOK_STATUS:  // Handle updating the status of a book
      return {
        ...state,
        userBooks: state.userBooks.map((book) =>
          book.id === action.bookId ? { ...book, status: action.status } : book
        ),
      };
    case UPDATE_BOOK:  // Handle updating the entire book with new details (including rating)
      return {
        ...state,
        userBooks: state.userBooks.map((book) =>
          book.id === action.book.id ? action.book : book
        ),
      };
    default:
      return state;
  }
}
