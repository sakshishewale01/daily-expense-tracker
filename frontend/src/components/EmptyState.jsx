import React from 'react';
import { FaInbox } from 'react-icons/fa';

export default function EmptyState({
  icon: Icon = FaInbox,
  title = 'Nothing here yet',
  message = 'Once you add some data, it will show up here.',
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 px-6 py-16 text-center animate-fade-in">
      <div className="rounded-full bg-brand-50 dark:bg-slate-800 p-4 text-brand-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
      <p className="max-w-xs text-sm text-slate-400">{message}</p>
      {action}
    </div>
  );
}
