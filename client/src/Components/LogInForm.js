import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function LogInForm(props) {
    return(
        <Container className="form-container">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <p className="form-paragraph ml-5">Not registered yet? Register <a onClick={props.isRegistered} href="">Here</a></p>
            </Form>
        </Container>
    )
}


export default LogInForm;