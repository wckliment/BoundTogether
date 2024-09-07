const SET_EXCHANGE_REQUESTS = 'exchangeRequests/SET_EXCHANGE_REQUESTS';
const UPDATE_EXCHANGE_REQUEST = 'exchangeRequests/UPDATE_EXCHANGE_REQUEST';

// Action creators
export const setExchangeRequests = (requests) => ({
  type: SET_EXCHANGE_REQUESTS,
  requests,
});

export const updateExchangeRequest = (request) => ({
  type: UPDATE_EXCHANGE_REQUEST,
  request,
});

// Thunk action for getting exchange requests
export const thunkGetExchangeRequests = () => async (dispatch) => {
  const response = await fetch('/api/exchange-requests/');  // Updated to correct URL
  if (response.ok) {
    const exchangeRequests = await response.json();
    dispatch(setExchangeRequests(exchangeRequests));
  } else {
    console.error('Failed to fetch exchange requests'); // Handle errors if the response is not okay
  }
};

// Thunk action for updating an exchange request (e.g., accepting/rejecting)
export const thunkUpdateExchangeRequest = (requestId, status) => async (dispatch) => {
  const response = await fetch(`/api/exchange-requests/${requestId}/`, {  // Updated to correct URL
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (response.ok) {
    const updatedRequest = await response.json();
    dispatch(updateExchangeRequest(updatedRequest));
  } else {
    console.error('Failed to update exchange request'); // Handle errors if the response is not okay
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
    default:
      return state;
  }
}
