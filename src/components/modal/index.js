import React from 'react';
import './style.css';

const Modal = ({ orderTime, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {orderTime > 0 && (
          <div>Your order will be delivered in {orderTime} minutes</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
