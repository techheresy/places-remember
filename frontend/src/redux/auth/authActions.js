import { SET_CURRENT_USER } from "./types";

const axios = require("axios");

// TODO: login, token etc
export const loginUser = (userData) => (dispatch) => {
  dispatch(setCurrentUser(userData));
};

// TODO: check?
export const checkUser = () => (dispatch) => {};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// TODO: logout
export const userLogout = () => (dispatch) => {};
