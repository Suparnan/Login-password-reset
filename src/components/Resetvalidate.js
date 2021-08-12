import react from "react";
import { useState } from "react";
import { postResetData } from "../Services/user.service.js";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const initialState = {
    secretkey: "",
}

function Reset() {
    const [userData, setUserData] = useState(initialState);

    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        postResetData(userData)
            .then((res) => {
                history.push("/resetform");
                toast.success("Passcode verified");
                setUserData({
                    secretkey: "",
                })
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    }

    return (
        <div className="App">
            <Container >
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPasscode">
                        <h3>
                            Reset Password
                        </h3>
                        <br />
                        <br />
                        <hr />
                        <br />

                        <Form.Label column sm="2">Passcode</Form.Label>
                        <Col sm={4}>
                            <Form.Control type="text" value={userData.email} name="secretkey" placeholder="Enter passcode" onChange={handleChange} />
                        </Col>

                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicCheckbox">

                    </Form.Group>

                    <br />

                    <Row>
                        <Col sm="2">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );

}

export {Reset};