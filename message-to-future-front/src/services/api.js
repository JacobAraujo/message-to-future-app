// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMessageByToken = async (token) => {
  const response = await api.get(`/messages/link/${token}`);
  return response.data;
};

export const sendMessage = async (messageData) => {
  const token = localStorage.getItem('token'); 

  try {
    const response = await api.post('/messages', messageData, {
      headers: {
        Authorization: `Bearer ${token}`,      
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error; 
  }
};

export const getMessages = async () => {
  const response = await api.get('/messages');
  return response.data;
};

export const deleteMessage = async (id) => {
  await api.delete(`/messages/${id}`);
};
