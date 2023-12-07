import React, { useState } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
interface TodoProps {
  tasks: Task[];
  index: number;
  name?: string;
  currentTime?: string;
  currentDate?: string;
  done?: boolean;
  onToggle?: (done: boolean) => void;
  onDelete?: () => void;
  onRename?: (newName: string) => void;
}

import { MdDelete } from "react-icons/md";
import RenameModal from "../renameModal";
import { Task } from "../todo";
import DeleteModal from "../deleteModal";
function TodoCard({
  tasks,
  index,
  name,
  done,
  currentDate,
  currentTime,
  onToggle,
  onDelete,
  onRename,
}: TodoProps) {
  const [taskName, setTaskName] = useState(tasks[index].name);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);

  const handleEditTask = (newName: string) => {
    if (index !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index].name = newName;
      setTaskName(newName);
    }
  };

  return (
    <div className="todo-card d-flex justify-content-between mt-3 ">
      <div className="d-flex align-items-center gap-3">
        <div onClick={() => onToggle && onToggle(!done)}>
          {!done && <div className="visible "></div>}
          {done && (
            <div className="aftervisible ">
              <FaCheck className="" size={25} color="white" />
            </div>
          )}
        </div>
        <div className="todo-list ">
          <h4 className="mb-0">{taskName}</h4>

          <p className="text-uppercase mb-0">
            {currentTime}, {currentDate}
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className=" icons">
          <MdDelete
            className="icon-size"
            onClick={() => {
              handleDeleteShow();
            }}
          />
        </div>
        <div className=" icons">
          <BiSolidPencil className="icon-size" onClick={handleShow} />
        </div>
      </div>
      <RenameModal
        tasks={tasks}
        show={show}
        onHide={handleClose}
        value={taskName}
        onEdit={handleEditTask}
      />
      <DeleteModal
        show={deleteShow}
        onHide={handleDeleteClose}
        onConfirm={onDelete}
      />
    </div>
  );
}

export default TodoCard;
