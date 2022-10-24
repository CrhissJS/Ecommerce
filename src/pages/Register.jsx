import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
      .then((res) => {
        navigate("/login");
        localStorage.setItem("token", res.data.data.token);
      });
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return (
    <div className="register-container">
      <Form
        onSubmit={handleSubmit(submit)}
        style={{ marginTop: "30px", width: "270px" }}
      >
        <Form.Group
          className="mb-3"
          controlId="formBasicSubmit"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <i
            style={{ fontSize: "100px", color: "paleturquoise" }}
            className="fa-solid fa-users"
          ></i>
        </Form.Group>

        <Form.Group
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasiFirstName">
            <Form.Label style={{ display: "flex", justifyContent: "center" }}>
              First Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label style={{ display: "flex", justifyContent: "center" }}>
              Last Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Phone
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            {...register("phone")}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicSubmit"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="outline-info" type="submit">
            Create User
          </Button>
        </Form.Group>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else. Do you already have an
          account?
          <Link
            className="register"
            style={{ textDecoration: "none", marginLeft: "10px" }}
            to="/login"
          >
            Let's login
          </Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Register;
