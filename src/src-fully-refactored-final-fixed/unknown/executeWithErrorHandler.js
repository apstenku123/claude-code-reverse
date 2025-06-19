/**
 * Executes a provided operation and handles any errors by delegating to a custom error handler.
 *
 * @param {string} contextDescription - a description of the context or operation being executed (used for error reporting).
 * @param {Function} errorHandler - a function to call if an error occurs, receives contextDescription, userData, and the error.
 * @param {Function} operation - The operation to execute, which may throw an error.
 * @returns {void}
 */
function executeWithErrorHandler(contextDescription, errorHandler, operation) {
  try {
    // Attempt to execute the provided operation
    operation();
  } catch (error) {
    // If an error occurs, delegate to the provided error handler
    errorHandler(contextDescription, error, error);
  }
}

module.exports = executeWithErrorHandler;