// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { div, p } from 'framer-motion/client';

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <form className="p-6 bg-white rounded shadow-md w-96 h-auto" onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <h2 className="mb-4 text-2xl font-bold text-center w-full">Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
