// src/services/user.js
import api from './api';

export const getUserData = async () => {
  const response = await api.get('/user');
  return response.data;
};
