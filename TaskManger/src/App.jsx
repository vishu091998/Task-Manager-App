import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Navbar from './components/NavBar';

export default function App() {
  return (
    <TaskProvider>
        <Navbar />
      <div className="app" >
        <div>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}
