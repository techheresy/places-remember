import React from "react";
import { Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userLogout } from "../redux/auth/authActions";

function Navigation(props) {
  const { auth, userLogout } = props;

  if (auth.isAuthenticated) {
    const { firstName, lastName, photoUrl } = auth.info;

    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand>
          <img
            alt=""
            src={photoUrl}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {firstName} {lastName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey="list">
            <NavLink as={Link} eventKey="list" to="/list">
              My places
            </NavLink>
            <NavLink as={Link} eventKey="add" to="/add">
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
  auth: state.auth,
});

export default connect(mapStateToProps, { userLogout })(Navigation);
