const asyncHandler = require('../utils/asyncHandler');
const ExpenseModel = require('../models/expenseModel');
const CategoryModel = require('../models/categoryModel');
const { buildDashboardSummary } = require('../services/dashboardService');

// @desc    Get all expenses for logged-in user (search, filter, paginate)
// @route   GET /api/expenses?search=&category=&month=&year=&page=&limit=
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const { search, category, month, year, page, limit } = req.query;

  const result = await ExpenseModel.findAllForUser(req.user.id, {
    search,
    categoryId: category || undefined,
    month: month || undefined,
    year: year || undefined,
    page: page || 1,
    limit: limit || 10
  });

  res.status(200).json({ success: true, data: result });
});

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
const getExpense = asyncHandler(async (req, res) => {
  const expense = await ExpenseModel.findByIdForUser(req.params.id, req.user.id);
  if (!expense) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }
  res.status(200).json({ success: true, data: { expense } });
});

// @desc    Create a new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category_id, expense_date, notes } = req.body;

  const category = await CategoryModel.findById(category_id);
  if (!category) {
    return res.status(422).json({ success: false, message: 'Selected category does not exist' });
  }

  const id = await ExpenseModel.create({
    userId: req.user.id,
    title,
    amount,
    categoryId: category_id,
    expenseDate: expense_date,
    notes
  });

  //const expense = await ExpenseModel.findByIdForUser(id, req.user.id);
  //res.status(201).json({ success: true, message: 'Expense added successfully', data: { expense } });
});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const existing = await ExpenseModel.findByIdForUser(req.params.id, req.user.id);
  if (!existing) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }

  const { title, amount, category_id, expense_date, notes } = req.body;

  const category = await CategoryModel.findById(category_id);
  if (!category) {
    return res.status(422).json({ success: false, message: 'Selected category does not exist' });
  }

  const expense = await ExpenseModel.update(req.params.id, req.user.id, {
    title,
    amount,
    categoryId: category_id,
    expenseDate: expense_date,
    notes
  });

  res.status(200).json({ success: true, message: 'Expense updated successfully', data: { expense } });
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const deleted = await ExpenseModel.delete(req.params.id, req.user.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Expense not found' });
  }
  res.status(200).json({ success: true, message: 'Expense deleted successfully' });
});

// @desc    Get dashboard summary stats + recent transactions
// @route   GET /api/expenses/dashboard/summary
// @access  Private
const getDashboardSummary = asyncHandler(async (req, res) => {
  const { stats, recentTransactions } = await buildDashboardSummary(req.user.id);
  res.status(200).json({ success: true, data: { stats, recentTransactions } });
});

// @desc    Get monthly bar chart data for a given year (defaults to current)
// @route   GET /api/expenses/charts/monthly?year=
// @access  Private
const getMonthlyChart = asyncHandler(async (req, res) => {
  const year = Number(req.query.year) || new Date().getFullYear();
  const rows = await ExpenseModel.getMonthlyBreakdown(req.user.id, year);

  const monthlyTotals = Array(12).fill(0);
  rows.forEach((row) => {
    monthlyTotals[row.month - 1] = Number(row.total);
  });

  res.status(200).json({ success: true, data: { year, monthlyTotals } });
});

// @desc    Get category pie chart data
// @route   GET /api/expenses/charts/categories
// @access  Private
const getCategoryChart = asyncHandler(async (req, res) => {
  const rows = await ExpenseModel.getCategoryBreakdown(req.user.id);
  res.status(200).json({
    success: true,
    data: {
      labels: rows.map((r) => r.category),
      totals: rows.map((r) => Number(r.total))
    }
  });
});

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getDashboardSummary,
  getMonthlyChart,
  getCategoryChart
};
