import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../services/api';
import CopyLinkButton from './CopyLinkButton';
import FormattedDate from './FormatedDate';
import PopupMessage from './PopupMessage';

function MessageList( { onDeleteMessage } ) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleMessageShow = (message) => {
    setPopupMessage(message);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setPopupMessage('');
  };

  useEffect(() => {
    getMessages().then((data) => setMessages(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setMessages(messages.filter((msg) => msg.id !== id));
    if (onDeleteMessage) {
      onDeleteMessage();
    }
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
              <td className="p-4 text-gray-700"><FormattedDate dateArray={msg.openingDateTime} /></td>
              <td className="p-4">
                <button className="mr-2 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition-colors" onClick={() => {handleMessageShow(msg.messageText)}}>Exibir</button>
                {isOpen && <PopupMessage message={popupMessage} onClose={closePopup} />}
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
