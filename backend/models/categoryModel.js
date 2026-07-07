const { pool } = require('../config/db');

const CategoryModel = {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  }
};

module.exports = CategoryModel;
