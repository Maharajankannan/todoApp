import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Task } from "../todo";
interface EditModalProps {
  tasks?: Task[];
  show?: boolean;
  onHide?: () => void;
  value?: string;
  onEdit?: (newName: string) => void;
}
function RenameModal({ show, tasks, onHide, onEdit, value }: EditModalProps) {
  const [taskName, setTaskName] = useState(value || "");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(taskName);
      onHide && onHide();
    }
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your Task</Modal.Title>
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

export default RenameModal;
