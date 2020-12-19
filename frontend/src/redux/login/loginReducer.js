import { SET_CURRENT_USER } from "./types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload.user,
      };
    default:
      return state;
  }
}
