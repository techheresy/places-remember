import { PLACES_LOAD, PLACES_SET } from "./types";

const initialState = {
  places: "",
  loading: false,
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case PLACES_SET:
      return {
        ...state,
        places: action.payload,
      };
    case PLACES_LOAD:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
