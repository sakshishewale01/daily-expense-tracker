import React, { useEffect, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const initialState = {
  title: '',
  amount: '',
  category_id: '',
  expense_date: new Date().toISOString().slice(0, 10),
  notes: ''
};

export default function ExpenseForm({ categories, initialValues, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || '',
        amount: initialValues.amount ?? '',
        category_id: initialValues.category_id ?? '',
        expense_date: initialValues.expense_date || initialState.expense_date,
        notes: initialValues.notes || ''
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    if (!form.amount || Number(form.amount) <= 0) next.amount = 'Enter an amount greater than 0';
    if (!form.category_id) next.category_id = 'Please select a category';
    if (!form.expense_date) next.expense_date = 'Please select a date';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      amount: Number(form.amount),
      category_id: Number(form.category_id)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card animate-slide-up space-y-5 p-6">
      <div>
        <label className="label-text" htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="input-field"
          placeholder="e.g. Grocery shopping"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="label-text" htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            className="input-field"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
          />
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
        </div>

        <div>
          <label className="label-text" htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            className="input-field"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
        </div>
      </div>

      <div>
        <label className="label-text" htmlFor="expense_date">Date</label>
        <input
          id="expense_date"
          name="expense_date"
          type="date"
          className="input-field"
          value={form.expense_date}
          onChange={handleChange}
        />
        {errors.expense_date && <p className="mt-1 text-xs text-red-500">{errors.expense_date}</p>}
      </div>

      <div>
        <label className="label-text" htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="input-field resize-none"
          placeholder="Any extra details..."
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          <FaTimes className="h-4 w-4" /> Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          <FaSave className="h-4 w-4" /> {submitting ? 'Saving...' : 'Save Expense'}
        </button>
      </div>
    </form>
  );
}
