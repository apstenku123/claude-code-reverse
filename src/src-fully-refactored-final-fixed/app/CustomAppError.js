/**
 * Custom error class for application-specific errors.
 * Extends the built-in Error object and adds custom properties.
 *
 * @class CustomAppError
 * @extends Error
 * @param {string} message - The error message describing what went wrong.
 * @param {string} type - a string representing the error type/category.
 * @param {Object} [errorCodeObject] - Optional object containing error code information (should have a 'code' property).
 */
function CustomAppError(message, type, errorCodeObject) {
  // Call the base Error constructor with the error message
  Error.call(this, message);

  /**
   * The error message.
   * @type {string}
   */
  this.message = message;

  /**
   * The error type/category.
   * @type {string}
   */
  this.type = type;

  // If an errorCodeObject is provided, set both code and errno properties
  if (errorCodeObject) {
    /**
     * The error code (if provided).
     * @type {any}
     */
    this.code = this.errno = errorCodeObject.code;
  }

  // Capture the stack trace for this error instance
  Error.captureStackTrace(this, this.constructor);
}

module.exports = CustomAppError;