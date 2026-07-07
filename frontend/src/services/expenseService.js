import api from './api';

export async function getExpenses(params = {}) {
  const { data } = await api.get('/expenses', { params });
  return data.data;
}

export async function getExpense(id) {
  const { data } = await api.get(`/expenses/${id}`);
  return data.data.expense;
}

export async function createExpense(payload) {
  const { data } = await api.post('/expenses', payload);
  return data.data.expense;
}

export async function updateExpense(id, payload) {
  const { data } = await api.put(`/expenses/${id}`, payload);
  return data.data.expense;
}

export async function deleteExpense(id) {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
}

export async function getDashboardSummary() {
  const { data } = await api.get('/expenses/dashboard/summary');
  return data.data;
}

export async function getMonthlyChart(year) {
  const { data } = await api.get('/expenses/charts/monthly', { params: { year } });
  return data.data;
}

export async function getCategoryChart() {
  const { data } = await api.get('/expenses/charts/categories');
  return data.data;
}
