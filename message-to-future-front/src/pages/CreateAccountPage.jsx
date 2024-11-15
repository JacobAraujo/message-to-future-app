// src/pages/CreateAccountPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';

function CreateAccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const result = await createUser({ username, password });
    } catch (error) {
      if (result === 201) {
        setMessage('Conta criada com sucesso');
        setTimeout(() => navigate('/login'), 500);
      } else {
        setError(result.message || "Falha ao criar conta.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Criar conta</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          className="w-full p-2 mb-4 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Cadastre-se
        </button>
      </form>
    </div>
  );
}

export default CreateAccountPage;
