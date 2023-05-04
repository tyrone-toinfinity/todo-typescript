import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

const initialTasks: Task[] = [];

function TaskForm(props: { addTask: (description: string) => void }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim()) {
      props.addTask(description);
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskItem(props: {
  task: Task;
  editTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  const { task, editTask, deleteTask } = props;

  return (
    <li>
      <span className={task.completed ? "completed" : ""}>
        {task.description}
      </span>
      <div className="task-buttons">
        {/* <button onClick={() => editTask(task.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button> */}
        <button onClick={() => deleteTask(task.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
}

function TaskList(props: {
  tasks: Task[];
  editTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <ul className="task-list">
      {props.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editTask={props.editTask}
          deleteTask={props.deleteTask}
        />
      ))}
    </ul>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(description: string) {
    const newTask: Task = {
      id: Date.now(),
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function editTask(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
}
