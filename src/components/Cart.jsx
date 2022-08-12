import React, {useEffect, useState} from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { changeQuantityThunk, checkoutThunk, deleteProductThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({show, handleClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const cart = useSelector(state => state.cart)

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getCartThunk());
    },[])

    const getTotal = () => {
        let total = 0;

        cart.forEach(product => {
            total+= Number(product.price) * product.productsInCart.quantity
        });

        return total
    }

    const increase = (product) => {

        const newProductQuantity = {
            id: product.id,
            newQuantity: product.productsInCart.quantity + quantity
        }
        dispatch(changeQuantityThunk(newProductQuantity));
    }

    const decrease = (product) => {

        const newProductQuantity = {
            id: product.id,
            newQuantity: product.productsInCart.quantity - quantity
        }
        
        dispatch(changeQuantityThunk(newProductQuantity));
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>CART</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    cart.map(product => (
                        <li style={{marginBottom: "10px", borderBottom: "1px solid lightgreen", padding: "20px", listStyle: "none"}} key={product.id}>
                            <div style={{display: 'flex', justifyContent: "flex-end"}}>
                                <Button size='sm' variant="outline-danger" style={{}} onClick={()=> dispatch(deleteProductThunk(product.id))}>Delete</Button>
                            </div>
                            <br />
                            {product.title}
                            <br />
                            quantity: {product.productsInCart.quantity}
                            <br />
                            price: $ {product.price * product.productsInCart.quantity}
                            <div style={{display: 'flex', justifyContent: "flex-end", height: "30px"}}>
                                <button style={{background: "white", border: "1px solid lightgreen"}} onClick={() => decrease(product)} >-</button> 
                                <div style={{padding: "3px",border: "1px solid lightgreen"}}>
                                    {product.productsInCart.quantity}
                                </div> 
                                <button style={{background: "white", border: "1px solid lightgreen"}} onClick={() => increase(product)}>+</button>

                            </div>
                        </li>

                    ))
                }
                <h4>Total: {getTotal()}</h4>
                <div style={{display: "flex", justifyContent: "center", borderTop: "1px solid lightgreen", paddingTop: "20px"}}>
                    <Button onClick={() => dispatch(checkoutThunk())}>Checkout</Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;