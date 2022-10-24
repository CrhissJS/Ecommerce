import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import Cart from "./Cart";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const token = localStorage.getItem("token");

  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  return (
    <Navbar
      className="my-2 p-1"
      style={{ border: "none" }}
      bg="light"
      expand="lg"
    >
      <Container>
        <Navbar.Brand onClick={() => dispatch(getProductsThunk())} href="/#/">
          <h1
            style={{
              color: "paleturquoise",
              borderBottom: "1px solid paleturquoise",
            }}
          >
            FLEA MARKET
          </h1>{" "}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link onClick={() => dispatch(getProductsThunk())} href="/#/">
              Home
            </Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            {token ? (
              <div style={{ height: "10px" }}>
                <Nav.Link
                  style={{
                    color: "white",
                    fontSize: "10px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    height: "40px",
                    background: "paleturquoise",
                  }}
                  as={Button}
                  onClick={logout}
                >
                  <div>
                    Log out
                    <i
                      style={{ fontSize: "15px", marginLeft: "5px" }}
                      className="fa-solid fa-right-from-bracket"
                    ></i>
                  </div>
                </Nav.Link>
              </div>
            ) : (
              <Nav.Link
                style={{ marginRight: "10px", marginLeft: "10px" }}
                href="/#/login"
              >
                <i
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "paleturquoise",
                  }}
                  className="fa-solid fa-user-shield"
                ></i>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  Login
                </div>
              </Nav.Link>
            )}

            {}

            <Nav.Link
              className="carrito"
              style={{
                margin: "0 auto",
                height: "60px",
                position: "fixed",
                right: "20px",
                bottom: "20px",
                display: "flex",
                alignItems: "center",
                zIndex: "998",
                borderRadius: "100%",
                background: "lightgreen",
                opacity: ".7",
              }}
              as={Button}
              onClick={handleShow}
            >
              <small style={{ fontSize: "10px", color: "white" }}>Cart</small>
              <i
                style={{ fontSize: "20px", color: "white" }}
                className="fa-solid fa-cart-shopping"
              ></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Cart show={show} handleClose={handleClose} />
      </Container>
    </Navbar>
  );
};

export default NavBar;
