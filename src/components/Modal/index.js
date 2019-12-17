import React from 'react';
import './style.scss';

export default ({ isOpen, children, onClose }) => {
  return isOpen && (
    <div className="containet-modal">
      <div className="modal">
        {children}
        <button
          onClick={onClose}
          className="btn btn-sm btn-secondary btn-close"
        >
          x
        </button>
      </div>
    </div>
  )
}
