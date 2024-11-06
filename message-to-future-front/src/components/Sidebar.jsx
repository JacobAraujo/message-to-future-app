import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        isOpen ? 'w-56' : 'w-0'
      } bg-gray-100 text-gray-800 shadow-md transition-all duration-300 flex flex-col items-center`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-600 text-white rounded-full focus:outline-none transition-transform duration-300"
        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
      >
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </button>

      {isOpen && (
        <nav className="mt-4 w-full px-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-200 text-blue-600'
                      : 'hover:bg-gray-200 hover:text-blue-600'
                  }`
                }
              >
                Enviar Mensagem
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manage"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-200 text-blue-600'
                      : 'hover:bg-gray-200 hover:text-blue-600'
                  }`
                }
              >
                Gerenciar Mensagens
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Sidebar;
