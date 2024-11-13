import React from 'react';

const PopupMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-xs">
        <p className="text-gray-800">{message}</p>
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