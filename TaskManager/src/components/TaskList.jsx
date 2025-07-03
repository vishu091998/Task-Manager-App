import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TaskList() {
  const { tasks, setTasks, filter, setFilter } = useContext(TaskContext);

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : filter === 'Completed' ? task.completed : !task.completed
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const updatedTasks = Array.from(tasks);
    const sourceTask = filteredTasks[source.index];
    const destinationTask = filteredTasks[destination.index];
    const sourceIndex = tasks.findIndex((t) => t.id === sourceTask.id);
    const destinationIndex = tasks.findIndex((t) => t.id === destinationTask.id);
    const [moved] = updatedTasks.splice(sourceIndex, 1);
    updatedTasks.splice(destinationIndex, 0, moved);
    setTasks(updatedTasks);
  };


  return (
    <div className="task-list">
      <div className="filters mb-3 text-center">
        {['All', 'Completed', 'Pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn me-2 ${filter === f ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <ol ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </li>
                  )}
                </Draggable>
              ))}
            </ol>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
