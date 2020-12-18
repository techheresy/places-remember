import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import editorReducer from "./editor/editorReducer";
import loginReducer from "./login/loginReducer";
import notifyReducer from "./notification/notifyReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  editor: editorReducer,
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
