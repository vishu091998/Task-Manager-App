import React, { createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', false);

  const [theme, setTheme] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setTheme(storedTheme);
    setTasks(storedTasks);
  }, [storedTasks]);

  const changeTheme = useCallback(() => {
    setTheme(prev => !prev)
    setStoredTheme(prev => !prev);
  }, [theme]);

  const addTask = useCallback((text) => {
    const newTasks = [...tasks, { id: Date.now().toString(), text, completed: false }];
    setTasks(newTasks);
    setStoredTasks(newTasks);
  }, [tasks, setStoredTasks]);

  const deleteTask = useCallback((id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    setStoredTasks(newTasks);
  }, [tasks, setStoredTasks]);

  const toggleComplete = useCallback((id) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    setTasks(newTasks);
    setStoredTasks(newTasks);
  }, [tasks, setStoredTasks]);

  const value = useMemo(() => ({ tasks, addTask, deleteTask, toggleComplete, filter, setFilter, setTasks, theme, changeTheme }), [tasks, addTask, deleteTask, toggleComplete, filter, setTasks, theme, changeTheme]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};