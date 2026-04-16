// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const FORGOT_PASSWORD_GENERIC_MESSAGE = 'Solicitação recebida. Verifique seu e-mail.';

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
  const token = localStorage.getItem('token');

  try{
    const response = await api.delete(`/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
    
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    throw error;
  }
};

export const sendForgotPasswordRequest = async (username) => {
  try {
    const response = await api.post('/users/forgot-password', { username });

    if (response.status !== 204) {
      throw new Error('Falha ao processar a solicitação.');
    }

    return { success: true, message: FORGOT_PASSWORD_GENERIC_MESSAGE };
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: true, message: FORGOT_PASSWORD_GENERIC_MESSAGE };
    }

    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Falha ao processar a solicitação.',
    };
  }
};

export const resetPasswordRequest = async (data) => {
  try {
    const response = await api.post('/users/reset-password', data);
    return { success: true, message: 'Password reset successful' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Password reset failed' };
  }
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.status;
};

export const verifyEmail = async (token) => {
  const response = await api.get(`/users/verify-email/${token}`);
  return response.status;
}

export const getLimit = async (token) => {
  const response = await api.get('/messages/limit');
  return response.data;
}
