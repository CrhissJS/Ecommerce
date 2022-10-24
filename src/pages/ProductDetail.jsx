import "../styles/productDetail.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import {
  Card,
  Col,
  Row,
  Button,
  InputGroup,
  Form,
  Carousel,
  Container,
} from "react-bootstrap";
import { addProductThunk } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const allProducts = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [quantity, setQuantity] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  useEffect(() => {
    const products = allProducts.find(
      (productItem) => productItem.id === Number(id)
    );
    setProductDetail(products);

    const filteredProducts = allProducts.filter(
      (productItem) => productItem.category.id === products.category.id
    );
    setSuggestedProducts(filteredProducts);
  }, [allProducts, id]);

  const addProduct = () => {
    alert("adding product");
    const product = {
      id: productDetail.id,
      quantity,
    };
    dispatch(addProductThunk(product));
    setQuantity("");
  };

  return (
    <Container>
      <Row>
        <Col lg={5}>
          <Carousel style={{ padding: "50px" }} variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productDetail?.productImgs?.[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productDetail?.productImgs?.[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={productDetail?.productImgs?.[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              color: "paleturquoise",
            }}
          >
            {productDetail?.title}
          </h3>
          <p>{productDetail?.description}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>
              Price: $ <b>{productDetail?.price}</b>
              <br />
              QUANTITY OF PRODUCTS TO ADD:
            </h5>
            <div>
              <InputGroup className="mb-3">
                <Form.Control
                  style={{
                    background: "white",
                    border: "1px solid paleturquoise",
                  }}
                  placeholder="Quantity"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button
                  onClick={addProduct}
                  variant="outline-info"
                  id="button-addon2"
                  style={{ border: "1px solid paleturquoise" }}
                >
                  Add to cart
                </Button>
              </InputGroup>
            </div>
          </div>
        </Col>

        <div style={{ marginTop: "100px" }}>
          <h1>Discover similar products</h1>
        </div>
        {suggestedProducts.map((products) => (
          <Col key={products.id}>
            <Card
              style={{
                padding: "5px",
                paddingTop: "15px",
                boxShadow: "0 2px 8px 0 paleturquoise",
                marginTop: "50px",
              }}
            >
              <div
                style={{ display: "block" }}
                onClick={() => navigate(`/shop/${products.id}`)}
              >
                <div className="tc-container">
                  <Card.Img src={products.productImgs[0]} variant="top" />
                  <Card.Img
                    className="top-img"
                    src={products.productImgs[1]}
                    variant="top"
                  />
                </div>

                <Card.Body
                  style={{ borderTop: "1px solid black", marginTop: "10px" }}
                >
                  <Card.Title style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {products.title}
                  </Card.Title>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <small>
                        Price: <br /> ${Math.round(products.price)}
                      </small>
                      <Button
                        variant="outline-success"
                        style={{
                          width: "10px",
                          display: "flex",
                          justifyContent: "center",
                          height: "45px",
                        }}
                      >
                        <i
                          style={{ fontSize: "20px" }}
                          className="fa-solid fa-cart-plus"
                        ></i>
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetail;
