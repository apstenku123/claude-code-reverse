/**
 * Executes a provided function and handles SecurityError exceptions gracefully.
 *
 * If the executed function throws a SecurityError, this function sets the storage provider to a fallback
 * and returns null. Any other errors are re-thrown.
 *
 * @param {Function} callback - The function to execute. Typically, this is a utility function such as mapInteractionsToRouteNames or addActivityIfNotFinished.
 * @returns {*} The result of the callback function, or null if a SecurityError is caught.
 */
function executeWithSecurityErrorFallback(callback) {
  try {
    // Attempt to execute the provided callback function
    return callback();
  } catch (error) {
    // Check if the error is a SecurityError
    if (error instanceof Error && error.name === "SecurityError") {
      // Set the storage provider to a fallback and return null
      wCA.Storage._setProvider(fq1);
      return null;
    }
    // Re-throw any other errors
    throw error;
  }
}

module.exports = executeWithSecurityErrorFallback;
