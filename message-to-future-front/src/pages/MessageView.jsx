import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './MessageView.css';

const MessageView = () => {
  const { accessLink } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/v1/messages/${accessLink}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setError('The message is not yet available.');
        } else if (error.response && error.response.status === 404) {
          setError('Message not found.');
        } else {
          setError('An error occurred while retrieving the message.');
        }
      });
  }, [accessLink]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!message) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Message</h1>
      <p>{message.textMessage}</p>
      <p>Delivery Date: {new Date(message.deliveryDate).toLocaleString()}</p>
      <p>Format: {message.storytellingFormat}</p>
    </div>
  );
};

export default MessageView;
