import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import './TodoItem.css'; 

const TodoItem = ({ todo, onUpdate, onDelete, icon }) => {
  return (
    <ListGroup.Item className={`d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-title">{todo.title}</span>
      <div>
        {onUpdate && (
          <Button
            variant="outline-success"
            onClick={() => onUpdate(todo._id, !todo.completed)}
            className="me-2"
          >
            {icon}
          </Button>
        )}
        <Button variant="outline-danger" onClick={() => onDelete(todo._id)}>
          <FaTimes />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TodoItem;
