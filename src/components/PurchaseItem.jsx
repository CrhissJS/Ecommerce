import React from 'react';
import { Container } from 'react-bootstrap'

const PurchaseItem = ({purchase}) => {
    const getTotal = () => {
        let total = 0;

        purchase.cart.products.forEach(product => {
            total+= Number(product.price) * product.productsInCart.quantity
        });

        return total
    }
    return (
        <div>
            <Container key={purchase.id}>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", borderTop: "1px solid lightgreen", paddingTop: "20px" }}>
                            {new Date(purchase.createdAt).toLocaleDateString()}
                        </div>
                        <br />
                        <h5 style={{ marginBottom: "20px" }}>Purchase Number: <span style={{ color: "red" }}>{purchase.id}</span></h5>
                        {
                            purchase.cart.products.map(product => (
                                <li style={{ listStyle: "none" }} key={product.id}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                                        <h5 style={{ color: "lightgreen" }}>
                                            {product.title}

                                        </h5>
                                        <h5 style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ color: "red" }}>
                                                <span style={{ color: "black", paddingRight: "5px" }}>
                                                    quantity:
                                                </span>
                                                {product.productsInCart.quantity}
                                            </span>
                                            <span style={{ color: "red" }}>
                                                <span style={{color: "black", paddingRight: "5px"}}>
                                                    price:
                                                </span>
                                                {product.price}
                                            </span>
                                        </h5>
                                    </div>
                                </li>
                            ))
                        }

                        <h5 style={{display: "flex", justifyContent: "flex-end"}}>Total: {getTotal()}</h5>
                    </Container>
        </div>
    );
};

export default PurchaseItem;