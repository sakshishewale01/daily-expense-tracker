const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');
const UserModel = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userId = await UserModel.create({ name, email, hashedPassword });
  const user = await UserModel.findById(userId);
  const token = generateToken(userId);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: { user, token }
  });
});

// @desc    Authenticate user & return token
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const token = generateToken(user.id);
  delete user.password;

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: { user, token }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
// JWTs are stateless, so "logout" is handled client-side by discarding the
// token. This endpoint exists for a consistent API surface and to allow
// future token blacklisting if ever needed.
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get currently authenticated user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
});

module.exports = { register, login, logout, getMe };
