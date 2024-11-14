// src/components/PopupMessage.jsx
import React from 'react';

const PopupMessage = ({ message, onClose, children }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-lg w-full mx-4"> {/* Ajuste de largura */}
        <p className="text-gray-800 mb-4 text-lg">{message}</p>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
