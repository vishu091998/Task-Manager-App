import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { RiAddCircleLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";



export default function TaskForm() {
  const { addTask, tasks, setTasks } = useContext(TaskContext);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [count , setCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    console.log(e)

    if (!trimmed) {
      setError('Task cannot be empty.');
      return;
    }

    addTask(trimmed);
    handleCount(tasks.map((item)=> item.text))
    setText('');
    setError('');
  };

  const handleCount = async(arr)=>{
    const datatoSend = {
      tasks : arr
    }
    const totalCount = await fetch('http://localhost:8081/add-task',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(datatoSend)
    });
    const res = await totalCount.json();
    setCount(res.totalCount);
  }

  const handleAllTaskComplete = () => {
    const completedTasks = tasks.map((item) => ({ ...item, completed: true }));
    setTasks(completedTasks)
  }

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
          <button type="submit" className="btn btn-primary" id='addBtn'>
            <RiAddCircleLine size={20} />
          </button>
          <button type='button' onClick={handleAllTaskComplete} className="btn btn-secondary" id='completeBtn'>
            <FaCheck size={20} />
          </button>
          {count}
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
