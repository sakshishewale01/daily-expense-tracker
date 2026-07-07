const express = require('express');
const router = express.Router();

const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getDashboardSummary,
  getMonthlyChart,
  getCategoryChart
} = require('../controllers/expenseController');

const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { expenseValidation } = require('../utils/validators');

// All expense routes require authentication
router.use(protect);

// Static/aggregate routes first so "dashboard"/"charts" aren't parsed as an :id
router.get('/dashboard/summary', getDashboardSummary);
router.get('/charts/monthly', getMonthlyChart);
router.get('/charts/categories', getCategoryChart);

router.get('/', getExpenses);
router.post('/', expenseValidation, validate, createExpense);
router.get('/:id', getExpense);
router.put('/:id', expenseValidation, validate, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
