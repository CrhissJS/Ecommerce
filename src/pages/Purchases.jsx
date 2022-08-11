import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases.data?.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk());

    }, [])


    return (
        <div>
            Purchases
            {
                purchases?.map(purchase => (
                    <ul key={purchase.id}>
                        Purchase Number: {purchase.id}
                        {purchase.cart.products.map(product => (
                            <li key={product.id}>
                                {product.title}
                                <br />
                                price: {product.price}
                            </li>
                        ))}
                    </ul>
                    
                ))
            }
        </div>
    );
};

export default Purchases;