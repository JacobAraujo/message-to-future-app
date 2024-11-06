// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MessageSendPage from '../pages/MessageSendPage';
import MessageManagementPage from '../pages/MessageManagementPage';
import MessageViewPage from '../pages/MessageViewPage';
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          isAuthenticated ? <MessageSendPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/manage"
        element={
          isAuthenticated ? <MessageManagementPage /> : <Navigate to="/login" />
        }
      />
      <Route path="/message/:token" element={<MessageViewPage />} />
    </Routes>
  );
}

export default AppRoutes;
