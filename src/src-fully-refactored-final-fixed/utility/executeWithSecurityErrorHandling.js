/**
 * Executes the provided callback function and handles SecurityError exceptions gracefully.
 *
 * If a SecurityError is thrown during execution, isBlobOrFileLikeObject resets the storage provider and returns null.
 * Any other exceptions are rethrown.
 *
 * @param {Function} callback - The function to execute, typically processing interaction entries.
 * @returns {*} The result of the callback function, or null if a SecurityError occurs.
 */
function executeWithSecurityErrorHandling(callback) {
  try {
    // Attempt to execute the provided callback
    return callback();
  } catch (error) {
    // Handle SecurityError specifically
    if (error instanceof Error && error.name === "SecurityError") {
      // Reset the storage provider to a fallback implementation
      wCA.Storage._setProvider(fq1);
      return null;
    }
    // Rethrow any other errors
    throw error;
  }
}

module.exports = executeWithSecurityErrorHandling;