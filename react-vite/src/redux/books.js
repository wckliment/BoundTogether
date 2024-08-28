const SET_BOOKS = 'books/SET_BOOKS';
const ADD_BOOK = 'books/ADD_BOOK';
const EDIT_BOOK = 'books/EDIT_BOOK';
const DELETE_BOOK = 'books/DELETE_BOOK';

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

// Thunk action
export const thunkGetBooks = () => async (dispatch) => {
  const response = await fetch('/api/books/user');
  if (response.ok) {
    const books = await response.json();
    dispatch(setBooks(books));
  }
};

// Initial state
const initialState = {
  userBooks: [], // Initialize as an empty array
};

// Reducer
export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, userBooks: action.books };  // Save books in userBooks array
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
    default:
      return state;
  }
}
