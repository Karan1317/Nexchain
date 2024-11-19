import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar bg-primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">NeXchain</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/inventory">Inventory</Nav.Link>
            <Nav.Link href="/order">Order</Nav.Link>
            <Nav.Link href="/buyer">Buyer</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
            {/* <NavDropdown title="Orders" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Track Orders</NavDropdown.Item>
              <NavDropdown.Item href="#action5">Returns</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <button class="btn btn-outline-light" type="submit">
              Search
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
