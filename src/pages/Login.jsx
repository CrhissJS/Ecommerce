import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit, reset } = useForm();

    const navigate = useNavigate();

    
    const submit = data => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                navigate("/")
                localStorage.setItem('token', res.data.data.token)
            })
            .catch(error => {
                if(error.response.status === 404){
                    alert("Credenciales inválidas")
                }
                console.log(error.response)
                
            })
        reset({
            email: "",
            password: ""
        })
    }

    return (
        <div className='login-container'>
            <Form onSubmit={handleSubmit(submit)} style={{marginTop: "30px"}}>
                <Form.Group className="mb-3" controlId="formBasicSubmit" style={{display: 'flex', justifyContent: "center"}}>
                    <i style={{fontSize: "100px", color: "lightcoral"}} className="fa-solid fa-users"></i>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{display: 'flex', justifyContent: "center"}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password")} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubmit" style={{display: 'flex', justifyContent: "center"}}>
                    <Button variant="outline-danger" type="submit" >
                        Login
                    </Button>
                </Form.Group>
                <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
            </Form>
        </div>
    );
};

export default Login;