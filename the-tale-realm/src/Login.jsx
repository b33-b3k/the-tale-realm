import React from "react";
import { Button, Form, Container, Row, Col, Image, Card } from "react-bootstrap";

function LoginPage() {
    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light"
            style={{ backgroundImage: "url('./src/assets/side.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

            <Card className="shadow-lg p-4" style={{ width: '400px' }}>
                <Image src="./src/assets/feather.png" alt="TaleRealm Logo" className="d-block mx-auto mb-4" width={100} />
                <h2 className="text-center mb-4">TaleRealm</h2>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-2">
                        Login
                    </Button>
                </Form>
                <div className="text-end">
                    <small>New here? <a href="/signup">Sign up</a></small>
                </div>
            </Card>

        </Container>
    );
}

export default LoginPage;
