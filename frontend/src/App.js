import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Places from "./pages/Places";
import PrivateRoute from "./private-route/PrivateRoute";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Login} exact path="/" />
        <Navigation />
        <Switch>
          <PrivateRoute component={Places} exact path="/places" />
          <PrivateRoute component={Editor} path="/add" />
          <PrivateRoute component={Editor} path="/edit/:id" />
        </Switch>
      </Router>
      <Notification />
    </Provider>
  );
}

export default App;
