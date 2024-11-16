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
  const [showChecklist, setShowChecklist] = useState(false); 
  const navigate = useNavigate();

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
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Senhas não conferem.');
      setShowPopup(true);
      return;
    }

    if (!lengthValid || !hasLetter || !hasNumber) {
      setErrorMessage('A senha não atende aos requisitos.');
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
          onChange={handlePasswordChange} 
          onFocus={() => setShowChecklist(true)}
          onBlur={() => !password && setShowChecklist(false)}
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
          message={successMessage || errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>

  );
}

export default CreateAccountForm;
