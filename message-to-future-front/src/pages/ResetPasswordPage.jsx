// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../services/api';

function ResetPasswordPage() {
  const { token } = useParams(); // Captura o token da URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [lengthValid, setLengthValid] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const validatePassword = (value) => {
    setLengthValid(value.length >= 8);
    setHasLetter(/[A-Za-z]/.test(value));
    setHasNumber(/\d/.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setErrorMessage('Senhas não conferem.');
      setShowLoading(false);
      setShowPopup(true);
      return;
    }

    if (!lengthValid || !hasLetter || !hasNumber) {
      setErrorMessage('A senha não atende aos requisitos.');
      setShowLoading(false);
      setShowPopup(true);
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
          onChange={handlePasswordChange}
          required
        />

        {showChecklist && (
          <div className="text-xs mb-4 text-gray-500">
            <div className={`flex items-center ${lengthValid ? 'text-green-600' : 'text-red-600'}`}>
              {lengthValid ? '✔' : '✖'} Pelo menos 8 caracteres
            </div>
            <div className={`flex items-center ${hasLetter ? 'text-green-600' : 'text-red-600'}`}>
              {hasLetter ? '✔' : '✖'} Pelo menos uma letra
            </div>
            <div className={`flex items-center ${hasNumber ? 'text-green-600' : 'text-red-600'}`}>
              {hasNumber ? '✔' : '✖'} Pelo menos um número
            </div>
          </div>
        )}

        <input
          type="password"
          placeholder="Confirmar Senha"
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

      {showPopup && (
        <PopupMessage
          message={successMessage || errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default ResetPasswordPage;
