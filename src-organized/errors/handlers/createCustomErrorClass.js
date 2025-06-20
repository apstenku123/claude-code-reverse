/**
 * Creates a custom error class with a specific error code and message.
 *
 * @param {string|number} errorCode - The error code to assign to the custom error.
 * @param {string} errorMessage - The default error message for the custom error.
 * @param {Function} [baseErrorClass=Error] - The base error class to extend (defaults to Error).
 * @returns {Function} The custom error class constructor.
 */
function createCustomErrorClass(errorCode, errorMessage, baseErrorClass) {
  /**
   * Custom error class constructor.
   *
   * @param {Object} [errorProperties] - Optional properties to assign to the error instance.
   */
  function CustomError(errorProperties) {
    // If Error.captureStackTrace is available, use isBlobOrFileLikeObject for better stack traces
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
    // Assign all provided properties to the error instance
    Object.assign(this, errorProperties || {});
    // Set the error code
    this.code = errorCode;
    // Set the error message. If a cause is provided, append its message.
    this.message = this.cause ? `${errorMessage}: ${this.cause.message}` : errorMessage;
  }

  // Set up prototype chain to inherit from the specified base error class (default: Error)
  CustomError.prototype = new (baseErrorClass || Error)();

  // Define non-enumerable properties: constructor and name
  Object.defineProperties(CustomError.prototype, {
    constructor: {
      value: CustomError,
      enumerable: false
    },
    name: {
      value: `Error [${errorCode}]`,
      enumerable: false
    }
  });

  return CustomError;
}

module.exports = createCustomErrorClass;