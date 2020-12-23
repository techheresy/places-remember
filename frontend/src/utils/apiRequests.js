import axios from "axios";

const base = "http://127.0.0.1:8000/";
const auth = "auth/";
const api = "api/places/";

const providers = {
  facebook: "facebook/",
};

export function createFacebookUser(token) {
  return axios.post(`${base}${auth}${providers.facebook}`, {
    access_token: token,
  });
}

export function getPlaceAll() {
  return axios.get(`${base}${api}`);
}

export function getPlaceByID(id) {
  return axios.get(`${base}${api}${id}/`);
}

export function createPlace(data) {
  return axios.post(`${base}${api}`, data);
}

export function updatePlaceByID(id, data) {
  return axios.patch(`${base}${api}${id}/`, data);
}

export function deletePlaceByID(id) {
  return axios.delete(`${base}${api}${id}/`);
}
