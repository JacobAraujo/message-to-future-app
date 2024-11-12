// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../services/api';

function ResetPasswordPage() {
  const { token } = useParams(); // Captura o token da URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const result = await resetPasswordRequest({ resetToken: token, newPassword, confirmPassword });

    if (result.success) {
      setMessage('Password reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 5000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="p-6 bg-white rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
