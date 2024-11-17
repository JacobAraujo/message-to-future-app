// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendForgotPasswordRequest } from '../services/api';
import Loading from '../components/Loading';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showLoading, setShowLoading] = useState(false);

  const handleSubmit = async (e) => {
    setShowLoading(true);

    e.preventDefault();
    setMessage('');
    setError('');

    const result = await sendForgotPasswordRequest(email);
    setShowLoading(false);
    
    if (result.success) {
      setMessage(result.message);
      setTimeout(() => navigate('/login'), 5000); // Redireciona após 5 segundos
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
        <h2 className="mb-4 text-2xl font-bold text-center">Recuperação de senha</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Digite seu e-mail"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Enviar
        </button>

        {showLoading && (
          <Loading />
        )}
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
