import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../services/api';
import CopyLinkButton from './CopyLinkButton';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages().then((data) => setMessages(data));
  }, []);

  console.log(messages);

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left text-gray-600 font-semibold">Para</th>
            <th className="p-4 text-left text-gray-600 font-semibold">Data de Entrega</th>
            <th className="p-4 text-left text-gray-600 font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b hover:bg-gray-50">
              <td className="p-4 text-gray-700">{msg.recipientName}</td>
              <td className="p-4 text-gray-700">{msg.openDate}</td>
              <td className="p-4">
                <button className="mr-2 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition-colors" onClick={() => {/* Função de editar */}}>Editar</button>
                <CopyLinkButton link={`${window.location.origin}/message/${msg.linkToken}`} />
                <button className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 transition-colors" onClick={() => handleDelete(msg.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessageList;
