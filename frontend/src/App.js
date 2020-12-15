import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import Login from "./pages/Login";
import PlaceEditor from "./pages/PlaceEditor";
import PlacesList from "./pages/PlacesList";
import PrivateRoute from "./private-route/PrivateRoute";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Login} exact path="/" />
        <Navigation />
        <Switch>
          <PrivateRoute component={PlacesList} exact path="/list" />
          <PrivateRoute component={PlaceEditor} exact path="/add" />
        </Switch>
      </Router>
      <Notification />
    </Provider>
  );
}

export default App;
