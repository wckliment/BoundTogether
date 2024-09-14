const SET_EXCHANGE_REQUESTS = 'exchangeRequests/SET_EXCHANGE_REQUESTS';
const UPDATE_EXCHANGE_REQUEST = 'exchangeRequests/UPDATE_EXCHANGE_REQUEST';
const ADD_EXCHANGE_REQUEST = 'exchangeRequests/ADD_EXCHANGE_REQUEST'; // New action type
const DELETE_EXCHANGE_REQUEST = 'exchangeRequests/DELETE_EXCHANGE_REQUEST';

// Action creators
export const setExchangeRequests = (requests) => ({
  type: SET_EXCHANGE_REQUESTS,
  requests,
});

export const updateExchangeRequest = (request) => ({
  type: UPDATE_EXCHANGE_REQUEST,
  request,
});

export const addExchangeRequest = (request) => ({
  type: ADD_EXCHANGE_REQUEST,
  request,
});

export const deleteExchangeRequest = (requestId) => ({
  type: DELETE_EXCHANGE_REQUEST,
  requestId,
});

// Thunk action for getting exchange requests
export const thunkGetExchangeRequests = () => async (dispatch) => {
  const response = await fetch('/api/exchange-requests/');
  if (response.ok) {
    const exchangeRequests = await response.json();
    dispatch(setExchangeRequests(exchangeRequests));
  } else {
    console.error('Failed to fetch exchange requests');
  }
};

// Thunk action for updating an exchange request (e.g., status, due date, etc.)
export const thunkUpdateExchangeRequest = (requestId, requestData) => async (dispatch) => {
  const response = await fetch(`/api/exchange-requests/${requestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),  // Pass the full request data, not just the status
  });

  if (response.ok) {
    const updatedRequest = await response.json();
    dispatch(updateExchangeRequest(updatedRequest));  // Update Redux with the updated request
  } else {
    const error = await response.json();
    console.error('Failed to update exchange request:', error);
  }
};

// Thunk action for creating a new exchange request
export const thunkCreateExchangeRequest = (requestData) => async (dispatch) => {
  try {
    const response = await fetch('/api/exchange-requests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const newRequest = await response.json();
      dispatch(addExchangeRequest(newRequest));
      return newRequest;
    } else {
      const errorData = await response.json();
      console.error('Failed to create exchange request:', errorData);
      return Promise.reject(errorData);
    }
  } catch (error) {
    console.error('Failed to create exchange request:', error);
    return Promise.reject(error);
  }
};

export const thunkDeleteExchangeRequest = (requestId) => async (dispatch) => {
  const response = await fetch(`/api/exchange-requests/${requestId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteExchangeRequest(requestId));
  } else {
    const error = await response.json();
    console.error('Failed to delete exchange request:', error);
  }
};


// Reducer
const initialState = { exchangeRequests: [] };

export default function exchangeRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXCHANGE_REQUESTS:
      return { ...state, exchangeRequests: action.requests };
    case UPDATE_EXCHANGE_REQUEST:
      return {
        ...state,
        exchangeRequests: state.exchangeRequests.map((req) =>
          req.id === action.request.id ? action.request : req
        ),
      };
    case ADD_EXCHANGE_REQUEST:
      return {
        ...state,
        exchangeRequests: [...state.exchangeRequests, action.request],
      };
    case DELETE_EXCHANGE_REQUEST:
      return {
        ...state,
        exchangeRequests: state.exchangeRequests.filter(
          (req) => req.id !== action.requestId 
        ),
      };
    default:
      return state;
  }
}
