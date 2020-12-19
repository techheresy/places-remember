import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import loginReducer from "./login/loginReducer";
import notifyReducer from "./notification/notifyReducer";
import placesReducer from "./places/placesReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  places: placesReducer,
  login: loginReducer,
  notify: notifyReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose,
  ),
);

export default store;
