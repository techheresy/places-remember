import { NOTIFY_CLOSE, NOTIFY_SEND } from "./types";

export const showNotify = (variant, message) => (dispatch) => {
  dispatch({
    type: NOTIFY_SEND,
    payload: {
      showed: true,
      variant: variant,
      message: message,
    },
  });
};

export const closeNotify = () => (dispatch) => {
  dispatch({
    type: NOTIFY_CLOSE,
    payload: {
      showed: false,
    },
  });
};
