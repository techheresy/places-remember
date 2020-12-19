import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  login: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps)(PrivateRoute);
