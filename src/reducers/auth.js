import LsService from "../services/localstorage";

let user = LsService.getCurrentUser();
// console.log(user);

const initialState = {
  user: user ? user : null,
  email_verified: user ? (user.email_verified ? 1:0 ) : 0,
  is_subscribed: user ? (user.is_subscribed ? 1:0 ) : 0 ,
  isLoading: false,
  errorMessage: null,
  data: {},
};
// console.log(initialState);

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  // console.log(payload);
  switch (type) {
    case "LOGIN_SUCCESS":
      LsService.setCurrentUser(payload);
      return {
        ...state,
        email_verified: payload.email_verified,
        is_subscribed: payload.is_subscribed,
        user: payload,
      };

    case "LOGIN_UPDATED":
      var changedProfile = LsService.updateCurrentUser(payload);
      return { ...state, user: changedProfile };

    case "LOGOUT":
      LsService.removeCurrentUser();
      return { ...state, email_verified: 0, user: null, usertype: null };

    default:
      return state;
  }
}
