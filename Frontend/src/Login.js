import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'; // Importar los estilos

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Container className="login-container d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="login-card">
            <Card.Body>
              <div className="text-center mb-4">
                <Image src="/logo.png" alt="Logo" className="logo-img" />
              </div>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="w-100 mt-4" variant="primary">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/roles" className="custom-link">Ir a Roles</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
