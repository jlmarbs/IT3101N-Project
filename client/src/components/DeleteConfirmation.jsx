import React from "react";
import '../styles/DeleteConfirmation.css'

const DeleteConfirmation = ({ onDelete, onCancel }) => {
  return (
    <div className="delete-confirmation-wrapper">
      <div className="delete-confirmation-modal">
        <h5>Are you sure you want to delete your account?</h5>
        <p>This action is irreversible.</p>
        <div className="button-container">
          <button className="yes-button" onClick={onDelete}>YES</button>
          <button className="no-button" onClick={onCancel}>NO</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation
