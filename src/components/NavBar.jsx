import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';

const NavBar = () => {
    
    const dispatch = useDispatch();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand style={{color: "lightcoral"}} onClick={() => dispatch(getProductsThunk())} href="/#/">E-commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => dispatch(getProductsThunk())} href="/#/">Home</Nav.Link>
                        <Nav.Link href="/#/login">Login</Nav.Link>
                        <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;