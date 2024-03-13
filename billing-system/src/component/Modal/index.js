// Modal.js
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, children }) => {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {children}
      </div>
    </div>
  );
};

export default Modal;
