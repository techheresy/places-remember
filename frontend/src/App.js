import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import Editor from "./pages/Editor";
import List from "./pages/List";
import Login from "./pages/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route component={Login} exact path="/" />
        <Navigation />
        <Switch>
          <PrivateRoute component={List} exact path="/list" />
          <PrivateRoute component={Editor} exact path="/add" />
        </Switch>
      </Router>
      <Notification />
    </Provider>
  );
}

export default App;
