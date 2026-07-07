import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaChartPie,
  FaListUl,
  FaPlusCircle,
  FaUserCircle,
  FaCog,
  FaWallet,
  FaTimes
} from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Dashboard', icon: FaChartPie, end: true },
  { to: '/expenses', label: 'Expenses', icon: FaListUl },
  { to: '/expenses/add', label: 'Add Expense', icon: FaPlusCircle },
  { to: '/profile', label: 'Profile', icon: FaUserCircle },
  { to: '/settings', label: 'Settings', icon: FaCog }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 transform bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800
          transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-2 text-white shadow-glow">
              <FaWallet className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">ExpenseFlow</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 lg:hidden">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow'
                    : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-100 dark:border-slate-800 p-4">
          <p className="text-center text-xs text-slate-400">
            Daily Expense Tracker &copy; {new Date().getFullYear()}
          </p>
        </div>
      </aside>
    </>
  );
}
