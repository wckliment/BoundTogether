const SET_EXCHANGE_REQUESTS = 'exchangeRequests/SET_EXCHANGE_REQUESTS';
const UPDATE_EXCHANGE_REQUEST = 'exchangeRequests/UPDATE_EXCHANGE_REQUEST';
const ADD_EXCHANGE_REQUEST = 'exchangeRequests/ADD_EXCHANGE_REQUEST'; // New action type

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
  type: ADD_EXCHANGE_REQUEST, // New action creator for adding a new request
  request,
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

// Thunk action for updating an exchange request (e.g., accepting/rejecting)
export const thunkUpdateExchangeRequest = (requestId, status) => async (dispatch) => {
  const response = await fetch(`/api/exchange-requests/${requestId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (response.ok) {
    const updatedRequest = await response.json();
    dispatch(updateExchangeRequest(updatedRequest));
  } else {
    const error = await response.json();
    console.error('Failed to update exchange request:', error);
  }
};

// Thunk action for creating a new exchange request
export const thunkCreateExchangeRequest = (requestData) => async (dispatch) => {
  const response = await fetch('/api/exchange-requests/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });

  if (response.ok) {
    const newRequest = await response.json();
    dispatch(addExchangeRequest(newRequest)); // Dispatch the action to add the new request
    return newRequest;
  } else {
    const error = await response.json();
    console.error('Failed to create exchange request:', error);
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
    case ADD_EXCHANGE_REQUEST: // Handle adding the new request
      return {
        ...state,
        exchangeRequests: [...state.exchangeRequests, action.request], // Add new request to the state
      };
    default:
      return state;
  }
}
