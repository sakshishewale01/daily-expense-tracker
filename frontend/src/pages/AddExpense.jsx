import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpenseForm from '../components/ExpenseForm';
import Loader from '../components/Loader';
import * as expenseService from '../services/expenseService';
import * as categoryService from '../services/categoryService';

export default function AddExpense() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    categoryService
      .getCategories()
      .then(setCategories)
      .catch(() => toast.error('Could not load categories'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (payload) => {
  setSubmitting(true);

  try {
    await expenseService.createExpense(payload);

    // Directly navigate without any success message
    navigate('/expenses');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Could not add expense');
  } finally {
    setSubmitting(false);
  }
};

  if (loading) return <Loader label="Loading form..." />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Add Expense</h1>
        <p className="text-sm text-slate-400">Log a new expense to keep your budget accurate.</p>
      </div>
      <ExpenseForm
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        submitting={submitting}
      />
    </div>
  );
}
