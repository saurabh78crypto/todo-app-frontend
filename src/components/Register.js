import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../api';
import './Register.css'; // Import custom CSS for additional styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/register', { email, password, name });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div className='register-page'>
      <a href="/" className="text-logo">Todo</a>
    
    <Container className="register-container">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="register-card">
            <Card.Body>
              <Card.Title className="text-center">Create Your Account</Card.Title>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>Already have an account? <a href="/login">Login here</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Register;
