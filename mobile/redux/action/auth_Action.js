/*
 * action types
 */

export const Clicked_Login = "Clicked_Login";
export const Login_Success = "Login_Success";
export const Login_Fail = "Login_Fail";

export const login = (username, password) => (dispatch) => {
  // Perform authentication logic here (e.g. check credentials against database)
  if (username === "doctor" && password === "password1") {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        username,
        userType: "doctor",
      },
    });
  } else if (username === "patient" && password === "password2") {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        username,
        userType: "patient",
      },
    });
  } else {
    dispatch({ type: LOGIN_FAIL });
  }
};