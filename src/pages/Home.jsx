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

    document.body.style =`
    margin: 10px
    `

    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    <small style={{color: "lightcoral"}}>Filter by category</small>
                    {categories.map((category) => (
                        <ListGroup.Item className="category-filter" onClick={() => dispatch(filterCategoryThunk(category.id))} key={category.id}>{category.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>

            <Col >
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder='What are you looking for?'
                        aria-describedby="basic-addon2"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                        style={{background: "white", color: "white"}}
                        />
                    <Button style={{color: "lightcoral"}} variant="outline-secondary" id="button-addon2" onClick={() => dispatch(filterProductThunk(searchValue))}>
                        Search
                    </Button>
                </InputGroup>
                <Row xs={1} md={2} lg={3} className="g-4">

                    {products.map((productItem) => (
                        <Col key={productItem.id}>
                            <Card style={{padding: "5px"}} >
                                <div style={{ display: "block" }} onClick={() => navigate(`/shop/${productItem.id}`)} >

                                    <div className="tc-container">
                                        <Card.Img  src={productItem.productImgs[0]} variant="top" />
                                        <Card.Img  className="top-img"  src={productItem.productImgs[1]} variant="top" />
                                    </div>

                                    <Card.Body style={{borderTop: "1px solid black", marginTop: "10px"}}>
                                        <Card.Title style={{fontSize: "14px", fontWeight: "bold"}}>{productItem.title}</Card.Title>
                                        <div>
                                            Price
                                            <div style={{display: 'flex', justifyContent: "space-between"}}>
                                                <small>$ {productItem.price}</small>
                                                <Button variant="outline-danger"><i class="fa-solid fa-cart-circle-plus"></i></Button>
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
    );
};

export default Home;