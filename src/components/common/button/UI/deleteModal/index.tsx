import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
interface ModalProps {
  show?: boolean;
  onHide?: () => void;
  onConfirm?: () => void;
}
function DeleteModal({ show, onHide, onConfirm }: ModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure, You want to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button type="submit" variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
