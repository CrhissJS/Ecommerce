import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const allProducts = useSelector(state => state.products)
    const [ productDetail, setProductDetail ] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([]);


    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(()=>{
        dispatch(getProductsThunk());
    },[])

    useEffect(()=>{
        const products = allProducts.find(productItem => productItem.id === Number(id))
        console.log(products)
        setProductDetail(products)

        const filteredProducts = allProducts.filter(productItem => productItem.category.id === products.category.id);
        setSuggestedProducts(filteredProducts);
    },[allProducts])


    
    return (
        <div>
            <h1>{productDetail?.title} <small style={{fontSize: "10px"}}>Status: {productDetail?.status}</small>  <br /> Category: <small>{productDetail?.category?.name}</small> </h1>
            {
                productDetail?.productImgs?.map(productImg => (
                    <img key={productImg} src={productImg} alt="" />
                ))
            }
            <h1>Description:</h1>
            <p>{productDetail?.description}</p>
            <h3>Price: {productDetail?.price}</h3>

            {
                suggestedProducts.map(products => (
                    <li onclick={()=> navigate(`/shop/${products.id}`)}>
                        {products.title}
                    </li>
                ))
            }
        </div>
    );
};

export default ProductDetail;