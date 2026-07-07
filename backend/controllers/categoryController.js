const asyncHandler = require('../utils/asyncHandler');
const CategoryModel = require('../models/categoryModel');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.getAll();
  res.status(200).json({ success: true, data: { categories } });
});

module.exports = { getCategories };
