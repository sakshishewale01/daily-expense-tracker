import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch, FaPlus, FaChevronLeft, FaChevronRight, FaReceipt } from 'react-icons/fa';
import ExpenseTable from '../components/ExpenseTable';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import ConfirmDialog from '../components/ConfirmDialog';
import * as expenseService from '../services/expenseService';
import * as categoryService from '../services/categoryService';

const months = [
  { value: '', label: 'All months' },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2000, i, 1).toLocaleString('en-US', { month: 'long' })
  }))
];

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);

  const fetchExpenses = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await expenseService.getExpenses({
        search: search || undefined,
        category: category || undefined,
        month: month || undefined,
        page,
        limit: 8
      });
      setExpenses(result.expenses);
      setPagination(result.pagination);
    } catch (err) {
      toast.error('Could not load expenses');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, month]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchExpenses(1), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, month]);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await expenseService.deleteExpense(pendingDelete.id);
      toast.success('Expense deleted');
      setPendingDelete(null);
      fetchExpenses(pagination.page);
    } catch (err) {
      toast.error('Could not delete expense');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Expenses</h1>
          <p className="text-sm text-slate-400">{pagination.total} total transactions</p>
        </div>
        <Link to="/expenses/add" className="btn-primary w-fit">
          <FaPlus className="h-4 w-4" /> Add Expense
        </Link>
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="input-field pl-11"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-48" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select className="input-field sm:w-40" value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader label="Loading expenses..." />
      ) : expenses.length === 0 ? (
        <EmptyState
          icon={FaReceipt}
          title="No expenses found"
          message="Try adjusting your filters, or add a new expense."
          action={
            <Link to="/expenses/add" className="btn-primary mt-2">
              <FaPlus className="h-4 w-4" /> Add Expense
            </Link>
          }
        />
      ) : (
        <>
          <ExpenseTable
            expenses={expenses}
            onEdit={(expense) => navigate(`/expenses/${expense.id}/edit`)}
            onDelete={(expense) => setPendingDelete(expense)}
          />

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-slate-400">
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  className="btn-secondary"
                  disabled={pagination.page <= 1}
                  onClick={() => fetchExpenses(pagination.page - 1)}
                >
                  <FaChevronLeft className="h-3 w-3" /> Prev
                </button>
                <button
                  className="btn-secondary"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchExpenses(pagination.page + 1)}
                >
                  Next <FaChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this expense?"
        message={`"${pendingDelete?.title}" will be permanently removed. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
