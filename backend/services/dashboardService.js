const ExpenseModel = require('../models/expenseModel');

/**
 * Business logic for assembling the dashboard payload.
 * Kept separate from the controller so the aggregation logic can be
 * reused (e.g. by a future reporting endpoint) without duplicating code.
 */
async function buildDashboardSummary(userId) {
  const [stats, recentTransactions] = await Promise.all([
    ExpenseModel.getDashboardStats(userId),
    ExpenseModel.getRecent(userId, 5)
  ]);

  return { stats, recentTransactions };
}

module.exports = { buildDashboardSummary };
