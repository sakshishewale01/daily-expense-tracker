import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = true
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl animate-pop-in">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-3 ${danger ? 'bg-red-50 text-red-500 dark:bg-red-500/10' : 'bg-brand-50 text-brand-500 dark:bg-brand-500/10'}`}>
            <FaExclamationTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={danger ? 'btn-danger' : 'btn-primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
