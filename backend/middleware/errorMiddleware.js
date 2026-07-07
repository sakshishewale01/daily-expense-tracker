/**
 * Handles requests to routes that don't exist.
 */
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

/**
 * Centralized error handler. Any error passed to next(err) or thrown inside
 * an async controller wrapped with asyncHandler ends up here.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);

  let statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  let message = err.message || 'Internal server error';

  // Duplicate entry (e.g. email already registered)
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}

module.exports = { notFound, errorHandler };
