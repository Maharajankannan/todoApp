import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
interface ModalProps {
  show?: boolean;
  onHide?: () => void;
  onAdd?: (name: string) => void;
}
function TaskModal({ show, onHide, onAdd }: ModalProps) {
  const [taskName, setTaskName] = useState("");
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onAdd && taskName) {
      onAdd(taskName);
      setTaskName("");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add your Task</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter your task here!"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={onHide}>
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default TaskModal;
