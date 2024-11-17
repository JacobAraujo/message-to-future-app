import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-8 bg-gray-50">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-blue-300 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default Loading;
