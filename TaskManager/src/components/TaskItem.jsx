import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const TaskItem = React.memo(({ task }) => {
  const { toggleComplete, deleteTask , theme } = useContext(TaskContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 300);
  };

  return (
    <div
      className={`task-item d-flex justify-content-between align-items-center p-3 mb-2 rounded border ${isDeleting ? 'fade-out' : ''}`}
      style={{
        backgroundColor: 'transparent',
        color: theme ? 'bg-light' : 'bg-dark',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      <div
        className="d-flex align-items-center flex-grow-1"
        onClick={() => toggleComplete(task.id)}
        style={{
          cursor: 'pointer',
          textDecoration: task.completed ? 'line-through' : 'none',
          fontStyle: task.completed ? 'italic' : 'normal'
        }}
      >
        {task.completed ? (
          <FaCheckCircle className="me-2 text-success" />
        ) : (
          <FaRegCircle className="me-2 text-secondary" />
        )}
        {task.text}
      </div>

      <button onClick={handleDelete} className="btn btn-sm btn-outline-danger ms-2">
        <FaTrash />
      </button>
    </div>
  );
});

export default TaskItem;
