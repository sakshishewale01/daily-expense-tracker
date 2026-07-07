const { pool } = require('../config/db');

const BASE_SELECT = `
  SELECT e.id, e.title, e.amount, e.expense_date, e.notes, e.created_at,
         c.id AS category_id, c.name AS category_name
  FROM expenses e
  JOIN categories c ON c.id = e.category_id
  WHERE e.user_id = ?
`;

const ExpenseModel = {
  async create({ userId, title, amount, categoryId, expenseDate, notes }) {
    const [result] = await pool.query(
      `INSERT INTO expenses (user_id, title, amount, category_id, expense_date, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, title, amount, categoryId, expenseDate, notes || null]
    );
    return result.insertId;
  },

  async findByIdForUser(id, userId) {
    const [rows] = await pool.query(`${BASE_SELECT} AND e.id = ?`, [userId, id]);
    return rows[0] || null;
  },

  /**
   * Returns a filtered, searchable, paginated list of expenses for a user.
   * filters: { search, categoryId, month (1-12), year }
   */
  async findAllForUser(userId, filters = {}) {
    const { search, categoryId, month, year, page = 1, limit = 10 } = filters;
    const conditions = [];
    const params = [userId];

    let query = BASE_SELECT;

    if (search) {
      conditions.push('e.title LIKE ?');
      params.push(`%${search}%`);
    }
    if (categoryId) {
      conditions.push('e.category_id = ?');
      params.push(categoryId);
    }
    if (month) {
      conditions.push('MONTH(e.expense_date) = ?');
      params.push(month);
    }
    if (year) {
      conditions.push('YEAR(e.expense_date) = ?');
      params.push(year);
    }

    if (conditions.length) {
      query += ' AND ' + conditions.join(' AND ');
    }

    // Get total count for pagination before adding LIMIT/OFFSET
    const countQuery = query.replace(
      /SELECT[\s\S]*FROM/,
      'SELECT COUNT(*) AS total FROM'
    );
    const [countRows] = await pool.query(countQuery, params);
    const total = countRows[0].total;

    query += ' ORDER BY e.expense_date DESC, e.id DESC LIMIT ? OFFSET ?';
    const offset = (Number(page) - 1) * Number(limit);
    const [rows] = await pool.query(query, [...params, Number(limit), offset]);

    return {
      expenses: rows,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    };
  },

  async getRecent(userId, count = 5) {
    const [rows] = await pool.query(
      `${BASE_SELECT} ORDER BY e.expense_date DESC, e.id DESC LIMIT ?`,
      [userId, count]
    );
    return rows;
  },

  async update(id, userId, { title, amount, categoryId, expenseDate, notes }) {
    await pool.query(
      `UPDATE expenses
       SET title = ?, amount = ?, category_id = ?, expense_date = ?, notes = ?
       WHERE id = ? AND user_id = ?`,
      [title, amount, categoryId, expenseDate, notes || null, id, userId]
    );
    return this.findByIdForUser(id, userId);
  },

  async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM expenses WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  async getDashboardStats(userId) {
    const [[totals]] = await pool.query(
      `SELECT
         COALESCE(SUM(amount), 0) AS totalExpenses,
         COUNT(*) AS totalTransactions
       FROM expenses WHERE user_id = ?`,
      [userId]
    );

    const [[today]] = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS todayExpenses
       FROM expenses WHERE user_id = ? AND expense_date = CURDATE()`,
      [userId]
    );

    const [[month]] = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS monthExpenses
       FROM expenses
       WHERE user_id = ? AND MONTH(expense_date) = MONTH(CURDATE())
         AND YEAR(expense_date) = YEAR(CURDATE())`,
      [userId]
    );

    return {
      totalExpenses: Number(totals.totalExpenses),
      totalTransactions: Number(totals.totalTransactions),
      todayExpenses: Number(today.todayExpenses),
      monthExpenses: Number(month.monthExpenses)
    };
  },

  async getMonthlyBreakdown(userId, year) {
    const [rows] = await pool.query(
      `SELECT MONTH(expense_date) AS month, COALESCE(SUM(amount), 0) AS total
       FROM expenses
       WHERE user_id = ? AND YEAR(expense_date) = ?
       GROUP BY MONTH(expense_date)
       ORDER BY month ASC`,
      [userId, year]
    );
    return rows;
  },

  async getCategoryBreakdown(userId) {
    const [rows] = await pool.query(
      `SELECT c.name AS category, COALESCE(SUM(e.amount), 0) AS total
       FROM categories c
       LEFT JOIN expenses e ON e.category_id = c.id AND e.user_id = ?
       GROUP BY c.id, c.name
       HAVING total > 0
       ORDER BY total DESC`,
      [userId]
    );
    return rows;
  }
};

module.exports = ExpenseModel;
