import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import PopupMessage from './PopupMessage';

function CreateAccountForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Senhas não conferem.");
      setShowPopup(true);
      return;
    }

    try {
        const result = await createUser({ username, password });
        setSuccessMessage('Conta criada com sucesso!');
        setShowPopup(true);
        setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
        if (err.status === 409) {
            setErrorMessage('Este email já está em uso.');
        } else {
            setErrorMessage('Erro inesperado. Tente novamente mais tarde.');
        }
        setShowPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Criar conta</h2>

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

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Cadastre-se
        </button>
      </form>

      {showPopup && (
        <PopupMessage
          message={successMessage || errorMessage} // Mostra mensagem de sucesso ou erro
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default CreateAccountForm;
