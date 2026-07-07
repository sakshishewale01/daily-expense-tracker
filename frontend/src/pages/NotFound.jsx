import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaGhost } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-light px-4 text-center dark:bg-surface-dark">
      <div className="rounded-full bg-brand-50 p-6 text-brand-400 dark:bg-slate-800">
        <FaGhost className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white">404</h1>
      <p className="max-w-sm text-sm text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary">
        <FaHome className="h-4 w-4" /> Back to Dashboard
      </Link>
    </div>
  );
}
