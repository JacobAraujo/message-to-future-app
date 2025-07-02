import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut } from 'react-icons/fi';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between w-full px-4 py-2 bg-[#1500B3]/80 dark:bg-slate-900/80 shadow-md text-white">
      <div className="flex items-center space-x-2">
        <FiUser className="text-2xl" />
        <span>Bem-vindo</span>
      </div>
      <button
        onClick={logout}
        className="flex items-center bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
        title="Sair da conta"
      >
        <FiLogOut className="mr-2" />
        Sair
      </button>
    </header>
  );
}

export default Header;
