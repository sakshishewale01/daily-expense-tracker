const { body } = require('express-validator');

// Reusable validation chains shared across routes.

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').trim().notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').trim().notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

const expenseValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('amount').notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('category_id').notEmpty().withMessage('Category is required')
    .isInt().withMessage('Category must be valid'),
  body('expense_date').notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Please provide a valid date (YYYY-MM-DD)')
];

const updateProfileValidation = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').notEmpty().withMessage('New password is required')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];

module.exports = {
  registerValidation,
  loginValidation,
  expenseValidation,
  updateProfileValidation,
  changePasswordValidation
};
