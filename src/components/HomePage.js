import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import './HomePage.css'; // Custom styles

const HomePage = () => {
  return (
    <Container fluid className="home-page">
      <div className="hero-section">
        <Container className="text-center">
          <h1 className="display-4">Welcome to To-Do App</h1>
          <p className="lead">
            Manage your tasks efficiently and keep track of your progress with ease.
          </p>
          <Row className="justify-content-center">
            <Col md="auto">
              <Button href="/register" variant="primary" size="lg" className="mr-3">
                Register
              </Button>
            </Col>
            <Col md="auto">
              <Button href="/login" variant="secondary" size="lg">
                Login
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="features">
        <Container>
          <Row>
            <Col md={4} className="text-center mb-4">
              <FaCheckCircle size={50} color="#28a745" />
              <h3>Organize Your Tasks</h3>
              <p>Keep your tasks organized with categories and priorities.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <FaCheckCircle size={50} color="#17a2b8" />
              <h3>Track Progress</h3>
              <p>Track your progress and stay motivated with completed tasks.</p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <FaCheckCircle size={50} color="#dc3545" />
              <h3>Secure and Reliable</h3>
              <p>Your data is secure with us. Access your tasks anytime, anywhere.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default HomePage;
