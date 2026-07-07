import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpenseForm from '../components/ExpenseForm';
import Loader from '../components/Loader';
import * as expenseService from '../services/expenseService';
import * as categoryService from '../services/categoryService';

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [cats, exp] = await Promise.all([
          categoryService.getCategories(),
          expenseService.getExpense(id)
        ]);
        setCategories(cats);
        setExpense(exp);
      } catch (err) {
        toast.error('Could not load expense details');
        navigate('/expenses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      await expenseService.updateExpense(id, payload);
      toast.success('Expense updated successfully');
      navigate('/expenses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update expense');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading expense..." />;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Expense</h1>
        <p className="text-sm text-slate-400">Update the details of this expense.</p>
      </div>
      <ExpenseForm
        categories={categories}
        initialValues={expense}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        submitting={submitting}
      />
    </div>
  );
}
