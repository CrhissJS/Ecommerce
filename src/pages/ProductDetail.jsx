import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Col, Row, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'

const ProductDetail = () => {

    const allProducts = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([]);


    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    useEffect(() => {
        const products = allProducts.find(productItem => productItem.id === Number(id))
        console.log(products)
        setProductDetail(products)

        const filteredProducts = allProducts.filter(productItem => productItem.category.id === products.category.id);
        setSuggestedProducts(filteredProducts);
    }, [allProducts, id])

    console.log(suggestedProducts)

    return (
        <Row>
            <Col lg={5}>
                {
                    productDetail?.productImgs?.map(productImg => (
                        <img key={productImg} src={productImg} alt="" />
                    ))
                }
            </Col>

            <Col>
                <h3 >{productDetail?.title}</h3>
                <p>{productDetail?.description}</p>
                <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                    <small>Price: $ <b>{productDetail?.price}</b> </small>
                    <select name="" id="">
                        <option value="">Select a quantity</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>
                </div>
                <br />
                <button style={{ width: "100%", background: "lightcoral", color: "white" }}>Add to cart</button>
            </Col>
            <h1>Discover similar products</h1>
            {
                suggestedProducts.map(products => (
                    <Col key={products.id} >
                        <Card style={{ padding: "5px" }} >
                            <div style={{ display: "block" }} onClick={() => navigate(`/shop/${products.id}`)}>
                                <div className="tc-container">
                                    <Card.Img src={products.productImgs[0]} variant="top" />
                                    <Card.Img className="top-img" src={products.productImgs[1]} variant="top" />
                                </div>

                                <Card.Body style={{ borderTop: "1px solid black", marginTop: "10px" }}>
                                    <Card.Title style={{ fontSize: "14px", fontWeight: "bold" }}>{products.title}</Card.Title>
                                    <div>
                                        Price
                                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                            <small>$ {products.price}</small>
                                            <Button variant="outline-danger"><i className="fa-solid fa-cart-circle-plus"></i></Button>
                                        </div>

                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                ))
            }

        </Row>
    );
};

export default ProductDetail;