import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

import PurchaseItem from '../components/PurchaseItem'

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases.data?.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk());

    }, [])

    

    return (
        <div style={{ width: "100%" }}>
            <h5 style={{ display: "flex", justifyContent: "center" }}>History Purchases</h5>
            {
                purchases?.map(purchase => (
                    <PurchaseItem key={purchase.id} purchase={purchase}/>

                ))
            }
        </div>
    );
};

export default Purchases;