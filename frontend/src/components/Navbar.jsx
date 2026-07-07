import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 lg:px-8">
      <button onClick={onMenuClick} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 lg:hidden">
        <FaBars className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-slate-400">Welcome back,</p>
        <p className="font-semibold text-slate-800 dark:text-white">{user?.name || 'there'}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-xl border border-slate-200 dark:border-slate-700 p-2.5 text-slate-500 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <FaUserCircle className="h-5 w-5 text-brand-500" />
            <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Account'}</span>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-card animate-fade-in"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <FaSignOutAlt className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
