import { PLACE_SET } from "./types";

const initialState = {
  id: "",
  title: "",
  description: "",
  coordinates: "",
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_SET:
      return {
        ...state,
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        coordinates: action.payload.coordinates,
      };
    default:
      return state;
  }
}
