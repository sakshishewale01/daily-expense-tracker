const express = require('express');
const router = express.Router();

const { updateProfile, changePassword } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validateMiddleware');
const { updateProfileValidation, changePasswordValidation } = require('../utils/validators');

router.use(protect);

router.put('/', updateProfileValidation, validate, updateProfile);
router.put('/password', changePasswordValidation, validate, changePassword);

module.exports = router;
