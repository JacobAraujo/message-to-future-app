import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../services/api';
import PopupMessage from '../components/PopupMessage'; // ajuste o caminho se necessário

function ResetPasswordPage() {
  const { token } = useParams();          // token do link /reset/:token
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [lengthValid, setLengthValid] = useState(false);
  const [hasLetter, setHasLetter]   = useState(false);
  const [hasNumber, setHasNumber]   = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage]     = useState('');
  const [showPopup, setShowPopup]           = useState(false);
  const [isLoading, setIsLoading]           = useState(false);

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
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setErrorMessage('As senhas não conferem.');
      setShowPopup(true);
      setIsLoading(false);
      return;
    }

    if (!lengthValid || !hasLetter || !hasNumber) {
      setErrorMessage('A senha não atende aos requisitos.');
      setShowPopup(true);
      setIsLoading(false);
      return;
    }

    const { success, message } = await resetPasswordRequest({
      resetToken: token,
      newPassword,
      confirmPassword,
    });

    if (success) {
      setSuccessMessage(
        'Senha redefinida com sucesso! Você será redirecionado para o login.'
      );
      setShowPopup(true);
      setTimeout(() => navigate('/login'), 4000);
    } else {
      setErrorMessage(message || 'Erro ao redefinir a senha.');
      setShowPopup(true);
    }

    setIsLoading(false);

    };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="w-96 p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Redefinir Senha</h2>

        <input
          type="password"
          placeholder="Nova senha"
          className="w-full p-2 mb-4 border rounded"
          value={newPassword}
          onChange={handlePasswordChange}
          onFocus={() => setShowChecklist(true)}
          onBlur={() => !newPassword && setShowChecklist(false)}
          required
        />

        {showChecklist && (
          <div className="mb-4 text-xs text-gray-500 space-y-1">
            <ChecklistItem ok={lengthValid}>Pelo menos 8 caracteres</ChecklistItem>
            <ChecklistItem ok={hasLetter}>Pelo menos uma letra</ChecklistItem>
            <ChecklistItem ok={hasNumber}>Pelo menos um número</ChecklistItem>
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
          disabled={isLoading}
          className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Enviando…' : 'Redefinir senha'}
        </button>
      </form>

      {showPopup && (
        <PopupMessage
          variant={successMessage ? 'success' : 'error'}
          message={successMessage || errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

const ChecklistItem = ({ ok, children }) => (
  <div className={`flex items-center ${ok ? 'text-green-600' : 'text-red-600'}`}>
    {ok ? '✔' : '✖'}&nbsp;{children}
  </div>
);

export default ResetPasswordPage;
