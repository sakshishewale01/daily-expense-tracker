const { validationResult } = require('express-validator');

/**
 * Runs after express-validator's validation chains. If any rule failed,
 * responds with a 422 and a clean list of field-level messages.
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

module.exports = { validate };
