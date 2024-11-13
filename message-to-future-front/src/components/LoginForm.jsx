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

  const handleForgotPassword = () => {
    navigate('/forgot-password'); 
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

      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-xs text-gray-400 underline hover:text-gray-600 focus:outline-none"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
          }}
        >
          Esqueci a senha
        </button>
      </div>

      <button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Entrar
      </button>

      <div className="flex flex-col items-center w-full max-w-md">
        <hr className="w-full border-t border-gray-300 my-5" />
        <button
          onClick={() => navigate('/create-account')}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Criar Conta
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
