import React, { useState, useEffect } from "react";
import DropDown from "../dropdown";
import TodoCard from "../todoCard";
import TaskModal from "../addTaskModal";

export interface Task {
  name?: string;
  done?: boolean;
  currentTime?: string;
  currentDate?: string;
}
function Todo() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const getCurrentDateTime = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    setCurrentDate(currentDate);
    setCurrentTime(currentTime);
  };
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  console.log(tasks);

  const updateTasksByFilter = (filter: string) => {
    setSelectedFilter(filter);
  };
  const filteredTasks = () => {
    if (selectedFilter === "All") {
      return tasks;
    } else if (selectedFilter === "Completed") {
      return tasks.filter((task) => task.done);
    } else if (selectedFilter === "Incomplete") {
      return tasks.filter((task) => !task.done);
    }
    return tasks;
  };
  //add task
  const addTask = (name: string) => {
    getCurrentDateTime();
    if (name) {
      setTasks((prev: Task[]) => {
        return [
          ...prev,
          {
            name: name,
            currentDate: currentDate,
            currentTime: currentTime,
            done: false,
          },
        ];
      });
    }
  };
  //remove task
  const removeTask = (removeIndex: number) => {
    setTasks((prev) => {
      return prev.filter((task, index) => index !== removeIndex);
    });
  };
  //edit task
  const editTask = (index: number, newName: string) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  };
  //Complete task
  const updateComplete = (taskIndex: number, newDone: boolean) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="mt-5 todo">
        <h1 className="text-center ">Todo List</h1>
        {tasks.length === 0 ? (
          <div className="todo-container mt-5 text-center">
            <button className="add-button" onClick={handleShow}>
              Add Task
            </button>
          </div>
        ) : (
          <div className="todo-container mt-5">
            <div className="d-flex justify-content-between align-items-end">
              <button className="add-button" onClick={handleShow}>
                Add Task
              </button>
              {tasks.length > 0 && (
                <DropDown
                  selectedFilter={selectedFilter}
                  updateTasksByFilter={updateTasksByFilter}
                />
              )}
            </div>
            {tasks.length > 0 && (
              <div className="todo-subContainer mt-2">
                {filteredTasks().map((task, ind) => (
                  <TodoCard
                    tasks={tasks}
                    index={ind}
                    key={ind}
                    {...task}
                    done={task.done}
                    name={task.name}
                    currentDate={task.currentDate}
                    currentTime={task.currentTime}
                    onDelete={() => removeTask(ind)}
                    onToggle={(done: boolean) => updateComplete(ind, done)}
                    onRename={(newName: string) => editTask(ind, newName)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <TaskModal show={show} onHide={handleClose} onAdd={addTask} />
    </div>
  );
}

export default Todo;
