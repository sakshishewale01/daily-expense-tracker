import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const categoryColors = {
  Food: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300',
  Travel: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300',
  Shopping: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-300',
  Bills: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300',
  Entertainment: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300',
  Education: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300',
  Medical: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300',
  Other: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300'
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-700 dark:text-slate-100">
                    {expense.title}
                  </p>

                  {expense.notes && (
                    <p className="mt-0.5 max-w-xs truncate text-xs text-slate-400">
                      {expense.notes}
                    </p>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      categoryColors[expense.category_name] || categoryColors.Other
                    }`}
                  >
                    {expense.category_name}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  {formatDate(expense.expense_date)}
                </td>

                <td className="px-5 py-4 text-right font-semibold text-slate-800 dark:text-white">
                  {formatCurrency(expense.amount)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800"
                      aria-label="Edit expense"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => onDelete(expense)}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-slate-800"
                      aria-label="Delete expense"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}