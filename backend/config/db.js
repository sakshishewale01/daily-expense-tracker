const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool. Pools automatically manage reconnects and
// concurrent queries, which is why we use one instead of a single connection.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expense_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});

// Simple helper to test the connection on startup so failures are obvious.
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Unable to connect to MySQL:', error.message);
    console.error('   Make sure MySQL is running and your .env values are correct.');
  }
}

module.exports = { pool, testConnection };
