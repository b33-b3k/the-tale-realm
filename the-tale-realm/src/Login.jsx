import React, { useState } from "react";
import { Button, Form, Container, Image, Card } from "react-bootstrap";
import axios from "axios"; // Import axios

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to your backend's login endpoint
            const response = await axios.post("http://localhost:5000/users/login", {
                username,
                password,
            });

            // Handle successful login (e.g., store user token or navigate to a different page)
            console.log("Login successful:", response.data);

            // Clear form fields and errors
            setUsername("");
            setPassword("");
            setError(null);
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light"
            style={{ backgroundImage: "url('./src/assets/side.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>

            <Card className="shadow-lg p-4" style={{ width: '400px' }}>
                <Image src="./src/assets/feather.png" alt="TaleRealm Logo" className="d-block mx-auto mb-4" width={100} />
                <h2 className="text-center mb-4">TaleRealm</h2>

                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-2">
                        Login
                    </Button>
                </Form>
                {error && <div className="text-danger text-center">{error}</div>}
                <div className="text-end">
                    <small>New here? <a href="/signup">Sign up</a></small>
                </div>
            </Card>
        </Container>
    );
}

export default LoginPage;
