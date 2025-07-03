import { useContext } from 'react';
import ThemeToggle from './ThemeToggle';
import { TaskContext } from '../context/TaskContext';

export default function Navbar() {
  const { theme } = useContext(TaskContext);

  return (
    <nav className={`navbar navbar-expand-lg ${theme ? 'bg-dark navbar-dark' : 'bg-light navbar-light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Task Manager</a>
        <div className="d-flex" role="search">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
