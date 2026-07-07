const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const UserModel = require('../models/userModel');

// @desc    Update logged-in user's name
// @route   PUT /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await UserModel.updateName(req.user.id, name);
  res.status(200).json({ success: true, message: 'Profile updated successfully', data: { user } });
});

// @desc    Change logged-in user's password
// @route   PUT /api/profile/password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await UserModel.findByEmail(req.user.email);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await UserModel.updatePassword(req.user.id, hashedPassword);

  res.status(200).json({ success: true, message: 'Password changed successfully' });
});

module.exports = { updateProfile, changePassword };
