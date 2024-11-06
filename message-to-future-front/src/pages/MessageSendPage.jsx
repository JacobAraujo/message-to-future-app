import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';

function MessageSendPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-56' : 'ml-0'
        }`}
      >
        <Header />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Enviar Mensagem</h2>
          <MessageForm />
        </main>
      </div>
    </div>
  );
}

export default MessageSendPage;
