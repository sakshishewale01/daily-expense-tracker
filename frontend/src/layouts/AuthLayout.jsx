import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaWallet } from 'react-icons/fa';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-light dark:bg-surface-dark px-4">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-3 text-white shadow-glow">
            <FaWallet className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Daily Expense Tracker</h1>
          <p className="text-sm text-slate-400">Track every rupee, dollar, and euro with ease.</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 shadow-card">
          <Outlet />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
}
