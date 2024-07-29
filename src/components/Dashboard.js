import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaPlus, FaCheck, FaEdit } from 'react-icons/fa';
import api from '../api';
import TodoItem from './TodoItem';
import './Dashboard.css'; 

const Dashboard = ({ onLogout }) => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/todos');
        setTodos(response.data);
      } catch (error) {
        setError(error.response?.data?.error || 'An unexpected error occurred.');
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/todos', { title });
      setTitle('');
      setSuccess('To-do item created successfully!');
      const response = await api.get('/todos');
      setTodos(response.data);
      setTimeout(() => {
        setSuccess('');
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  const handleStatusChange = async (id, completed) => {
    try {
      await api.put(`/todos/${id}`, { completed });
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      const response = await api.get('/todos');
      setTodos(response.data);
      setSuccess('To-do item deleted successfully!');
      setTimeout(() => {
        setSuccess('');
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Container className="dashboard-container">
      <Row className="justify-content-center">
        <Col md={12} lg={10}>
          <Card className="dashboard-card mb-4">
            <Card.Body>
              <Button variant="danger" onClick={onLogout} className="float-end">
                Logout
              </Button>
              <Card.Title className="text-center">Dashboard</Card.Title>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>To-Do Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter to-do title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mb-2"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  <FaPlus /> Add To-Do
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Row>
            <Col md={12} lg={4}>
              <Card className="todo-list-card mb-4">
                <Card.Body>
                  <Card.Title>To-Do List</Card.Title>
                  {todos.length === 0 ? (
                    <Alert variant="info">No to-dos found. Please add a to-do item.</Alert>
                  ) : (
                    <ListGroup>
                      {todos.map((todo, index) => (
                        <>
                          <TodoItem
                            key={todo._id}
                            todo={todo}
                            onDelete={handleDelete}
                          />
                          {index < todos.length - 1 && <hr />}
                        </>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4}>
              <Card className="pending-todo-card mb-4">
                <Card.Body>
                  <Card.Title>Pending To-Do List</Card.Title>
                  {pendingTodos.length === 0 ? (
                    <Alert variant="info">No pending to-dos found.</Alert>
                  ) : (
                    <ListGroup>
                      {pendingTodos.map((todo, index) => (
                        <>
                          <TodoItem
                            key={todo._id}
                            todo={todo}
                            onUpdate={handleStatusChange}
                            onDelete={handleDelete}
                            icon={<FaCheck />}
                          />
                          {index < pendingTodos.length - 1 && <hr />}
                        </>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4}>
              <Card className="completed-todo-card mb-4">
                <Card.Body>
                  <Card.Title>Completed To-Do List</Card.Title>
                  {completedTodos.length === 0 ? (
                    <Alert variant="info">No completed to-dos found.</Alert>
                  ) : (
                    <ListGroup>
                      {completedTodos.map((todo, index) => (
                        <>
                          <TodoItem
                            key={todo._id}
                            todo={todo}
                            onUpdate={handleStatusChange}
                            onDelete={handleDelete}
                            icon={<FaEdit />}
                          />
                          {index < completedTodos.length - 1 && <hr />}
                        </>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
