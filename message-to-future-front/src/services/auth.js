// src/services/auth.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username, password) => {
  const url = `${API_BASE_URL}/auth`;
  const response = await axios.post(url, {
    username,
    password
  });
  return response.data;
};
