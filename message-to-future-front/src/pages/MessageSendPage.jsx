import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MessageForm from '../components/MessageForm';
import { getLimit } from '../services/api';
import { use } from 'framer-motion/client';

function MessageSendPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [limit, setLimit] = useState();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchLimit = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getLimit(token);
      setLimit(data);
    } catch (err) {
      console.error('Erro ao buscar limite de mensagens:', err);
    }
  };

  useEffect(() => {
    fetchLimit();
  }, []);

  return (
    <div className="flex min-h-screen text-gray-800">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-56' : 'ml-0'
        }`}
      >
        <Header />
        <main className="flex-1 p-6">
          <div className="flex justify-end mb-4">
            {/* <h2 className="text-2xl font-semibold">Enviar Mensagem</h2> */}
            <span className="text-sm font-medium text-gray-600 bg-blue-100 px-3 py-1 rounded-lg shadow-md">
              Mensagens disponíveis: {limit}
            </span>
          </div>
          <MessageForm onMessageSent={fetchLimit} />
        </main>
      </div>
    </div>
  );
}

export default MessageSendPage;
