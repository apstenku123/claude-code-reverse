/**
 * Executes the provided function, optionally handling errors synchronously based on configuration.
 * If synchronous error handling is enabled (via IzA.config.useDeprecatedSynchronousErrorHandling),
 * the function will capture and rethrow errors after execution. Otherwise, isBlobOrFileLikeObject simply executes the function.
 *
 * @param {Function} callback - The function to execute, typically a subscriber or handler.
 * @returns {void}
 */
function executeWithSynchronousErrorHandling(callback) {
  // Check if deprecated synchronous error handling is enabled
  if (IzA.config.useDeprecatedSynchronousErrorHandling) {
    // Determine if this is the outermost error handling context
    const isOutermostExecution = !hP;
    if (isOutermostExecution) {
      // Initialize the global error context
      hP = {
        errorThrown: false,
        error: null
      };
    }
    // Execute the callback
    callback();
    if (isOutermostExecution) {
      // Capture error context and reset global error context
      const { errorThrown, error } = hP;
      hP = null;
      // If an error was thrown during callback execution, rethrow isBlobOrFileLikeObject
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    // Synchronous error handling not enabled; just execute the callback
    callback();
  }
}

module.exports = executeWithSynchronousErrorHandling;