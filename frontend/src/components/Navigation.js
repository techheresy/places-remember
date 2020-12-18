import React, { useEffect } from "react";
import { Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { userLogout } from "../redux/login/loginActions";

function Navigation(props) {
  const { login, userLogout } = props;

  useEffect(() => {}, [props.location]);

  if (login.isAuthenticated) {
    const { firstName, lastName, photoUrl } = login.info;

    return (
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand>
          <img
            alt=""
            src={photoUrl}
            width="30"
            height="30"
            className="d-inline-block align-top rounded"
          />{" "}
          {firstName} {lastName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={window.location.pathname}>
            <NavLink as={Link} eventKey="/list" to="/list">
              My places
            </NavLink>
            <NavLink as={Link} eventKey="/add" to="/add">
              Add place
            </NavLink>
          </Nav>
          <NavDropdown.Divider />
          <Nav>
            <NavLink onClick={() => userLogout()}>Logout</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  return "";
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default withRouter(connect(mapStateToProps, { userLogout })(Navigation));
