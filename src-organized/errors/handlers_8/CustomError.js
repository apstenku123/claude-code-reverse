/**
 * CustomError is a specialized error class that extends the built-in Error object.
 * It allows you to specify a custom error message, error type, and an optional error code.
 *
 * @class CustomError
 * @extends Error
 * @param {string} message - The error message describing what went wrong.
 * @param {string} type - a string representing the type/category of the error.
 * @param {Object} [errorCodeObject] - Optional object containing a 'code' property for error identification.
 */
function CustomError(message, type, errorCodeObject) {
  // Call the Error constructor with the provided message
  Error.call(this, message);

  // Assign the error message to this instance
  this.message = message;

  // Assign the error type/category
  this.type = type;

  // If an errorCodeObject is provided, assign its 'code' property to both 'code' and 'errno'
  if (errorCodeObject) {
    this.code = this.errno = errorCodeObject.code;
  }

  // Capture the stack trace for this error instance
  Error.captureStackTrace(this, this.constructor);
}

module.exports = CustomError;