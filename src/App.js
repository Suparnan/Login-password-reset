// import logo from './logo.svg';
import React from "react";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function App() {

  // const [mems, setMems] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please Enter an appropriate email. ex: tim@gmail.com")
      .max(30, "Any Short versions of your email"),
    password: Yup.string()
      .required("Please enter you Password")
      .min(8, "Your Password should be more than 8 charecters")
      .max(20, "Your Password should be less than 20 charecters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (users) => {
    console.log(users,"You are in onSubmit call");
    
    compareUsers();
  };

  const [users, setUsers] = useState([]);
  // const [mems, setMems] = useState("");

  useEffect(() => {
    fetch(
      "http://localhost:4180/users/", {
     // "https://609e2ac333eed80017957e36.mockapi.io/recipe",
     // {
        method: "GET"
      }
    )
      .then((res) => res.json())
      .then((x) => console.log(x,"Hello this is from useEffect fetch"))
      .then((x) => setUsers(x));
  }, []);

  // function getUsers() {
  //   fetch("http://localhost:4180/users/",{method:'GET'})
  //     .then((res) => res.json())
  //     .then((x) => console.log(x,"You are in get user function"))
  //     //.then((res) => users(res));
  //     compareUsers();
  // }

  function compareUsers() {
    console.log({users},"this is compare users function");
    {users
      .filter((x) => {
        if (x.email.includes(setUsers)) {
          console.log("Successfully loggged in. Welcome!!")
         return x;
        } else if (!x.email.includes(setUsers)) {
          console.log("Login Failed")
         return x;
        }
      })}
  }

  // useEffect(() => {
  //   getUsers();
  // }, []);

  function addUser(data) {
    fetch("http://localhost:4180/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/josn"
      },
      // body: JSON.stringify({ ...data, createdAt: new Date().toISOString() })
    })
      .then((res) => res.json())
      // .then((res) => refreshUsers(res));
      .then((res) => console.log(res));
  }

  return (
    <div className="App">
      <Container >
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Form.Control {...register('email')} type="email" placeholder="abc@gmail.com" />
              {errors.email && (
                <span style={{ color: "crimson" }}> {errors.email.message} </span>
              )}
              {(event) => setUsers(event.target.value)}
            </Col>

            {/* <Form.Text column sm="8" className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}

          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">


            <Form.Label column sm="2">Password</Form.Label>
            <Col sm={4}>
              <Form.Control {...register('password')}type="password" placeholder="Password" />
              {errors.password && (
              <span style={{ color: "crimson" }}> {errors.password.message} </span>
              )}
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">

          </Form.Group>

          <br />

          <Row>
            <Col sm="2">
              <Button variant="outline-primary" type="submit" >
                Forget Password
              </Button>
            </Col>
            <Col sm="2">
              <Button variant="primary" type="submit" onClick="getUsers()">
                Submit
              </Button>
              {/* {users.map((user) => (
                    <div key={user.id}>
                      <p>{user.name}</p>
                    </div>
          ))} */}
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default App;
