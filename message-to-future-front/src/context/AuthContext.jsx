// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const login = async (username, password) => {
    const token = await apiLogin(username, password);
    setToken(token);
    localStorage.setItem('token', token.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
