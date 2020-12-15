import React from "react";
import { Navbar, NavDropdown, Nav, NavLink } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Navigation({ auth }) {
  if (auth.isAuthenticated) {
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://www.flaticon.com/svg/static/icons/svg/64/64572.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          UserName
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
            <Nav.Link href="#exit">Logout</Nav.Link>
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

export default connect(mapStateToProps)(Navigation);
