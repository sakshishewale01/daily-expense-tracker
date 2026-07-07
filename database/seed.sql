-- Daily Expense Tracker - Seed Data
-- Run after schema.sql: mysql -u root -p expense_tracker < seed.sql

USE expense_tracker;

INSERT INTO categories (name, icon, color) VALUES
  ('Food', 'FaUtensils', '#F97316'),
  ('Travel', 'FaPlane', '#0EA5E9'),
  ('Shopping', 'FaShoppingBag', '#EC4899'),
  ('Bills', 'FaFileInvoiceDollar', '#EF4444'),
  ('Entertainment', 'FaFilm', '#A855F7'),
  ('Education', 'FaGraduationCap', '#22C55E'),
  ('Medical', 'FaBriefcaseMedical', '#14B8A6'),
  ('Other', 'FaEllipsisH', '#6B7280')
ON DUPLICATE KEY UPDATE name = VALUES(name);
