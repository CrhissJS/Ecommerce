import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterCategoryThunk, filterProductThunk, getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row, InputGroup, Form, Button, ListGroup, Container } from 'react-bootstrap'
import axios from 'axios';
import { setCategorySelected } from '../store/slices/categorySelected.slice';


const Home = () => {

    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);

    const categorySelected = useSelector(state => state.categorySelected)


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));


    }, [])


    document.body.style = `
    margin: 10px
    `

    return (
        <Container style={{ marginTop: "50px" }}>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        <small style={{ color: "paleturquoise" }}>Filter by category</small>
                        {categories.map((category) => (
                            <ListGroup.Item className="category-filter" style={{ background: categorySelected === category.id ? "paleturquoise" : "" }} onClick={() => dispatch(filterCategoryThunk(category.id))} key={category.id}>{category.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col >
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder='What are you looking for?'
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button variant="outline-info" style={{ border: "1px solid paleturquoise" }} id="button-addon2" onClick={() => dispatch(filterProductThunk(searchValue))}>
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">

                        {products.map((productItem) => (
                            <Col key={productItem.id}>
                                <Card style={{ padding: "10px", paddingTop: "15px", boxShadow: "0 2px 8px 0 paleturquoise", border: "none", height: "100%" }} >
                                    <div style={{ display: "block" }} onClick={() => navigate(`/shop/${productItem.id}`)} >

                                        <div className="tc-container">
                                            <Card.Img src={productItem.productImgs[0]} variant="top" />
                                            <Card.Img className="top-img" src={productItem.productImgs[1]} variant="top" />
                                        </div>

                                        <Card.Body style={{ borderTop: "1px solid black", marginTop: "10px" }}>
                                            <Card.Title style={{ fontSize: "12px", fontWeight: "bold" }}>{productItem.title}</Card.Title>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: "space-between", marginTop: "20px" }}>
                                                    <small>Price: <br /> ${Math.round(productItem.price)}</small>
                                                    <Button style={{ width: "10px", display: "flex", justifyContent: "center", height: "45px", border: "1px solid lightgreen" }} variant="outline-success"><i style={{ fontSize: "20px" }} className="fa-solid fa-cart-plus"></i></Button>
                                                </div>
                                            </div>


                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;