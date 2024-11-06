// src/pages/MessageViewPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import Animation from '../components/Animation';
import { getMessageByToken } from '../services/api';

function MessageViewPage() {
  const { token } = useParams();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipientName, setRecipientName] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

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
    return <p>Carregando...</p>;
  }

  if (!message) {
    return <p>Mensagem não encontrada ou link inválido.</p>;
  }

  const currentTime = new Date();
  const openDate = new Date(message.openDate);

  const handleRecipientSubmit = (e) => {
    e.preventDefault();
    if (recipientName.trim().toLowerCase() === message.recipientName.trim().toLowerCase()) {
      setIsAuthorized(true);
    } else {
      alert('Nome do destinatário incorreto.');
    }
  };

  if (currentTime < openDate) {
    return (
      <div className="message-view-page">
        <CountdownTimer targetDate={openDate} />
        <p>Sua mensagem estará disponível em breve!</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="recipient-auth">
        <form onSubmit={handleRecipientSubmit}>
          <label>
            Insira seu nome para acessar a mensagem:
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Acessar Mensagem</button>
        </form>
      </div>
    );
  }

  return (
    <div className="message-view-page">
      <Animation narrative={message.narrative} />
      <div className="message-content">
        <h1>Olá, {message.recipientName}!</h1>
        <p>{message.textMessage}</p>
      </div>
    </div>
  );
}

export default MessageViewPage;
