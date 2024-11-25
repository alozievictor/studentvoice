import React from "react";
import { RiCloseLargeLine } from "react-icons/ri";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <RiCloseLargeLine size={20} color="black" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
