import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { RiAddCircleLine } from "react-icons/ri";


export default function TaskForm() {
  const { addTask } = useContext(TaskContext);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError('Task cannot be empty.');
      return;
    }

    addTask(trimmed);
    setText('');
    setError('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a new task..."
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
          <button type="submit" className="btn btn-primary">
            <RiAddCircleLine size={20}/>
          </button>
        </div>
      </form>
      {error && (
        <div className="text-danger" style={{ fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
    </>
  );
}
