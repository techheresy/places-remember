import { deletePlaceByID, getPlaceAll } from "../../utils/apiRequests";
import { updatePlaceByID, createPlace } from "../../utils/apiRequests";
import { packer } from "../../utils/packer";
import { showNotify } from "../notification/notifyActions";
import { PLACES_LOAD, PLACES_SET } from "./types";

export const savePlace = (state) => (dispatch) => {
  const data = packer(state);
  let req;
  if (state.id) {
    req = updatePlaceByID(state.id, data);
  } else {
    req = createPlace(data);
  }
  req
    .then((res) => {
      dispatch(
        showNotify(
          "success",
          `[STATUS CODE ${res.status}] PLACE ${state.id ? "UPDATED" : "SAVED"}`,
        ),
      );
      dispatch(getPlaces());
    })
    .catch((err) => {
      dispatch(showNotify("danger", err));
    });
};

export const getPlaces = () => (dispatch) => {
  setLoading(false);
  getPlaceAll()
    .then((res) => {
      dispatch(setPlaces(res.data));
      dispatch(setLoading(true));
    })
    .catch((err) => {
      dispatch(showNotify("danger", String(err)));
    });
};

export const deletePlace = (id) => (dispatch) => {
  deletePlaceByID(id)
    .then((res) => {
      dispatch(
        showNotify("success", `[STATUS CODE ${res.status}] PLACE DELETED`),
      );
      dispatch(getPlaces());
    })
    .catch((err) => {
      dispatch(showNotify("danger", err));
    });
};

export const setPlaces = (data) => {
  return {
    type: PLACES_SET,
    payload: data,
  };
};

export const setLoading = (loading) => {
  return {
    type: PLACES_LOAD,
    payload: loading,
  };
};
