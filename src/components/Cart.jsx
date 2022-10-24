import React, { useEffect, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeQuantityThunk,
  checkoutThunk,
  deleteProductThunk,
  getCartThunk,
} from "../store/slices/cart.slice";

const Cart = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const getTotal = () => {
    let total = 0;

    cart.forEach((product) => {
      total += Number(product.price) * product.productsInCart.quantity;
    });

    return total;
  };

  const increase = (product) => {
    const newProductQuantity = {
      id: product.id,
      newQuantity: product.productsInCart.quantity + quantity,
    };
    dispatch(changeQuantityThunk(newProductQuantity));
  };

  const decrease = (product) => {
    const newProductQuantity = {
      id: product.id,
      newQuantity: product.productsInCart.quantity - quantity,
    };

    dispatch(changeQuantityThunk(newProductQuantity));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: "red" }}>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.map((product) => (
          <li
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid lightgreen",
              padding: "20px",
              listStyle: "none",
            }}
            key={product.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => dispatch(deleteProductThunk(product.id))}
              >
                Delete product
              </Button>
            </div>
            <br />
            <h5 style={{ color: "lightgreen" }}>{product.title}</h5>
            <h5>quantity: {product.productsInCart.quantity}</h5>
            <h5>
              price: ${" "}
              <span style={{ color: "red" }}>
                {" "}
                {product.price * product.productsInCart.quantity}
              </span>
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "30px",
              }}
            >
              <button
                className="button-hovered"
                style={{ background: "white" }}
                onClick={() => decrease(product)}
              >
                -
              </button>
              <div
                style={{
                  padding: "3px",
                  margin: "0 10px",
                  borderBottom: "4px solid red",
                }}
              >
                {product.productsInCart.quantity}
              </div>
              <button
                className="button-hovered"
                style={{ background: "white" }}
                onClick={() => increase(product)}
              >
                +
              </button>
            </div>
          </li>
        ))}
        <h4>
          Total: <span style={{ color: "lightgreen" }}>$</span>{" "}
          <span style={{ color: "red" }}>{getTotal()}</span>{" "}
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderTop: "1px solid lightgreen",
            paddingTop: "20px",
          }}
        >
          <Button
            variant="outline-success"
            onClick={() => dispatch(checkoutThunk())}
          >
            Checkout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
