import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addProductThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
        .then((res) => dispatch(getCartThunk())) 
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteProductThunk = (productId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`, getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then((res) => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const changeQuantityThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.patch("https://ecommerce-api-react.herokuapp.com/api/v1/cart", product, getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}


export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
