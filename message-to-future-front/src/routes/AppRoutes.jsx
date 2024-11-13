import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MessageSendPage from '../pages/MessageSendPage';
import MessageManagementPage from '../pages/MessageManagementPage';
import MessageViewPage from '../pages/MessageViewPage';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import CreateAccountPage from '../pages/CreateAccountPage';
import VerificationEmailPage from '../pages/VerificationEmailPage';

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

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="/create-account" element={<CreateAccountPage />} />

      <Route path="/verification-email/:token" element={<VerificationEmailPage />} />
    </Routes>
  );
}

export default AppRoutes;
