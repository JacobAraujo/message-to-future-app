import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import Animation from '../components/Animation';
import { getMessageByToken } from '../services/api';

function MessageViewPage() {
  const { token } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessageByToken(token)
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao obter a mensagem:', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500">Mensagem não encontrada ou link inválido.</p>
      </div>
    );
  }

  const [year, month, day, hour, minute] = message.openingDateTime;

  const currentTime = new Date();
  const openDate = new Date(year, month - 1, day, hour, minute);

  if (currentTime < openDate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-6">
        <CountdownTimer targetDate={openDate} />
        <p className="text-xl font-semibold text-gray-700 mt-4">
          Sua mensagem estará disponível em breve!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-6">
      <Animation narrative={message.narrative} />
      <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg mt-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Olá, {message.recipientName}!</h1>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{message.textMessage}</p>
      </div>
    </div>
  );
}

export default MessageViewPage;
