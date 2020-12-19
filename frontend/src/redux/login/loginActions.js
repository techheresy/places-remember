import { createFacebookUser } from "../../utils/apiRequests";
import setAuthToken from "../../utils/setAuthToken";
import { showNotify } from "../notification/notifyActions";
import { SET_CURRENT_USER } from "./types";

export const loginUser = ({ accessToken }) => (dispatch) => {
  createFacebookUser(accessToken)
    .then((res) => {
      const {
        token,
        user: { first_name, last_name, photo },
      } = res.data;
      const user = {
        firstName: first_name,
        lastName: last_name,
        photoUrl: photo,
      };
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser({ user: user }));
    })
    .catch((err) => {
      dispatch(showNotify("danger", err));
    });
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
