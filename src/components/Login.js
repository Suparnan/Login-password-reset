// import logo from './logo.svg';
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getLoginData } from "../Services/user.service.js"
// import { validateLoginData } from "../Services/user.service.js"
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
    email:"",
    password:""
}

function Login() {

  const [userData, setUserData] = useState(initialState);

  //let history = useHistory();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
          ...userData,
          [name]: value
      })
     // console.log(userData,"Inside handlechange");
  } 

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(userData.email,"Inside handle Submit");
      // validateLoginData(userData);
      getLoginData(userData)
      .then((res) => {
          localStorage.setItem("auth", JSON.stringify(res.data));
          toast.success("Login Succesfully");
          setUserData({
              email:"",
              password:"",
          })
          console.log("Here is where you link your home page");
      })
      .catch((err) => {
          toast.error(err.response.data.message);
      })
    
  }

  return (
    <div className="App">
      <Container >
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <h3>
              Login/Sign-in
            </h3>
            <br />
            <br />
            <hr />
            <br />

            <Form.Label column sm="2">Email address</Form.Label>
            <Col sm={4}>
              <Form.Control type="email" value={userData.email} name="email" placeholder="abc@gmail.com" onChange={handleChange} />
            </Col>

          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">


            <Form.Label column sm="2">Password</Form.Label>
            <Col sm={4}>
              <Form.Control type="password" value={userData.password} name="password" placeholder="Password" onChange={handleChange} />
             
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">

          </Form.Group>

          <br />

          <Row>
            <Col sm="2">
            <Link to ="/signup">
            <Button variant="primary" type="submit">
             Signup
              </Button>
              </Link>
              <p>
                  Forget Password?<Link to="/reset">Reset</Link>
              </p>
            </Col>
            <Col sm="2">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export { Login };
