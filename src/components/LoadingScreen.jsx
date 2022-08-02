import React from 'react';
import "../styles/loadingScreen.css";
import {Spinner} from 'react-bootstrap'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="danger" />
        </div>
    );
};

export default LoadingScreen;