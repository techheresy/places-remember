import { NOTIFY_CLOSE, NOTIFY_SEND } from "./types";

const initialState = {
  showed: false,
  message: "",
  variant: "",
};

export default function notifyReducer(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_SEND:
      return {
        ...state,
        showed: action.payload.showed,
        message: action.payload.message,
        variant: action.payload.variant,
      };
    case NOTIFY_CLOSE:
      return {
        ...state,
        showed: action.payload.showed,
      };
    default:
      return state;
  }
}
