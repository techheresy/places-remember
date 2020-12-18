import axios from "axios";

import { showNotify } from "../notification/notifyActions";
import { PLACE_SET } from "./types";

export const save = (state) => (dispatch) => {
  const data = {
    name: `${state.title}`,
    description: `${state.description}`,
    coordinates: JSON.stringify({
      type: "Point",
      coordinates: [state.coordinates.lat, state.coordinates.lng],
    }),
  };

  axios
    .post("http://localhost:8000/api/places/", data)
    .then((res) => {
      dispatch(showNotify("success", `${res.status} ${res.statusText}`));
    })
    .catch((err) => {
      dispatch(showNotify("danger", String(err)));
    });
};

export const setPlace = (id, title, description, coordinates) => {
  return {
    type: PLACE_SET,
    payload: {
      id: id,
      title: title,
      description: description,
      coordinates: coordinates,
    },
  };
};
