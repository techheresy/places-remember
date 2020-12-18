import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import { showNotify } from "../notification/notifyActions";
import { SET_CURRENT_USER } from "./types";

export const loginUser = ({ accessToken }) => (dispatch) => {
  axios
    .post("http://localhost:8000/auth/facebook/", { access_token: accessToken })
    .then((res) => {
      const {
        token,
        user: { first_name, last_name, photo },
      } = res.data;
      const accountInfo = {
        firstName: first_name,
        lastName: last_name,
        photoUrl: photo,
      };
      const decoded = jwt_decode(token);
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser({ accountInfo: accountInfo, decoded: decoded }));
    })
    .catch((err) => {
      dispatch(showNotify("danger", String(err)));
    });
};

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  };
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
