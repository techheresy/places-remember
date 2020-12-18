import { SET_CURRENT_USER } from "./types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  info: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload.decoded,
        info: action.payload.accountInfo,
      };
    default:
      return state;
  }
}
