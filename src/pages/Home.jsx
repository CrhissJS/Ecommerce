import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterCategoryThunk, filterProductThunk, getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios';

const Home = () => {

    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));
    }, [])
    console.log(categories)
    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    {categories.map((category) => (
                        <ListGroup.Item onClick={() => dispatch(filterCategoryThunk(category.id))} key={category.id}>{category.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>

            <Col >
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductThunk(searchValue))}>
                        Button
                    </Button>
                </InputGroup>
                <Row xs={1} md={2} lg={3} className="g-4">

                    {products.map((productItem) => (
                        <Col key={productItem.id}>
                            <Card >
                                <div style={{ display: "block" }} onClick={() => navigate(`/shop/${productItem.id}`)} >
                                    <Card.Title>{productItem.title}</Card.Title>
                                    <Card.Img src={productItem.productImgs[1]} variant="top" />
                                    <Card.Body>
                                        <div>
                                            <small>{productItem.status}</small>
                                        </div>
                                        <h3>price: {productItem.price}</h3>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </Col>
        </Row>
    );
};

export default Home;