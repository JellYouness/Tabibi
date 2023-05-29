/**
 *
 */

export const Clicked_Login = "Clicked_Login";
export const Login_Success = "Login_Success";
export const Login_Fail = "Login_Fail";

const initialState = {
  isAuthenticated: false,
  username: "",
  userType: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        userType: action.payload.userType,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
        userType: "",
      };
    default:
      return state;
  }
}
