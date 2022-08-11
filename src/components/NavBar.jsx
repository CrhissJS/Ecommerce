import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import Cart from './Cart';

const NavBar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const token = localStorage.getItem("token")
    
    const handleShow = () => {
        if(token){
            setShow(true);
        }else{
            navigate("/login")
        }
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/")
    }



    return (
        <Navbar className="my-2 p-1" style={{border: "none"}} bg="light" expand="lg">
            <Navbar.Brand style={{ color: "lightcoral" }} onClick={() => dispatch(getProductsThunk())} href="/#/">E-commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                <Nav>
                    <Nav.Link onClick={() => dispatch(getProductsThunk())} href="/#/">Home</Nav.Link>
                    <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                    {
                        token ? (<Nav.Link variant="danger" style={{ color: "white", fontSize: "10px", marginRight: "20px", marginLeft: "10px"}} as={Button} onClick={logout}>
                            Log out
                            <i style={{fontSize: "20px", marginLeft: "10px"}} className="fa-solid fa-right-from-bracket"></i>
                            </Nav.Link>)
                            :
                            (<Nav.Link style={{marginRight: "20px", marginLeft: "10px"}} href="/#/login">
                                <i style={{display: "flex", justifyContent: "center", color: "lightcoral"}} className="fa-solid fa-user-shield"></i>
                                <div style={{display: 'flex', justifyContent: "center"}}>Login</div>
                                </Nav.Link>)
                    }
                
                    < Nav.Link style={{margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", height: "40px"}}
                        variant="warning"
                        as={Button}
                        onClick={handleShow}>
                        <small style={{fontSize: "10px", color: 'white'}}>Cart</small>
                        <i style={{fontSize: "25px", color: 'white'}} className="fa-solid fa-cart-shopping"></i>
                    </Nav.Link>
                </Nav>


            </Navbar.Collapse>

            <Cart show={show} handleClose={handleClose} />
        </Navbar>
    );
};

export default NavBar;