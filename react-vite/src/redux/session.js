const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  console.log("Authenticate Response:", response);

  if (response.ok) {
    const data = await response.json();
    console.log("Authenticated User Data:", data);
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  } else {
    const error = await response.json();
    console.error("Authentication Error:", error);
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  console.log("Login Response:", response);

  if(response.ok) {
    const data = await response.json();
    console.log("User Data on Login:", data);
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.error("Login Error Messages:", errorMessages);
    return errorMessages;
  } else {
    console.error("Server Error during Login");
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  console.log("Signup Response:", response);

  if(response.ok) {
    const data = await response.json();
    console.log("User Data on Signup:", data);
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.error("Signup Error Messages:", errorMessages);
    return errorMessages;
  } else {
    console.error("Server Error during Signup");
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout");
  console.log("Logout Response:", response);

  if (response.ok) {
    dispatch(removeUser());
    console.log("User logged out successfully");
  } else {
    console.error("Error during Logout");
  }
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
