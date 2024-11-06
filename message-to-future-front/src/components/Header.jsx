import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut } from 'react-icons/fi';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 rounded-b-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <FiUser className="text-2xl" /> {/* Ícone de usuário */}
        <p className="text-lg font-medium">Bem-vindo, {user?.name || 'Usuário'}</p>
      </div>
      <button
        onClick={logout}
        className="flex items-center bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
        title="Sair da conta" // Tooltip ao passar o mouse
      >
        <FiLogOut className="mr-2" /> {/* Ícone de logout */}
        Sair
      </button>
    </header>
  );
}

export default Header;
