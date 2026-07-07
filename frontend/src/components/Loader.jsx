import React from 'react';

export default function Loader({ label = 'Loading...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-light dark:bg-surface-dark">
        {content}
      </div>
    );
  }

  return content;
}
