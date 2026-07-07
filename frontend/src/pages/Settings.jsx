import React from 'react';
import { FaMoon, FaSun, FaPalette } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-400">Customize your experience.</p>
      </div>

      <div className="card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <FaPalette className="h-4 w-4" /> Appearance
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
              theme === 'light'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="rounded-lg bg-amber-100 p-2 text-amber-600">
              <FaSun className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">Light Mode</p>
              <p className="text-xs text-slate-400">Bright and clean interface</p>
            </div>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
              theme === 'dark'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="rounded-lg bg-slate-700 p-2 text-slate-200">
              <FaMoon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">Dark Mode</p>
              <p className="text-xs text-slate-400">Easy on the eyes at night</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
