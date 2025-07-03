import { useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { MdBrightness6 } from "react-icons/md";


export default function ThemeToggle() {
  const { theme, changeTheme } = useContext(TaskContext);

  useEffect(() => {
    document.body.classList.toggle('theme', theme);
  }, [theme]);

  return (
    <div onClick={changeTheme}>
      <MdBrightness6 size={20}/>
    </div>
  );
}