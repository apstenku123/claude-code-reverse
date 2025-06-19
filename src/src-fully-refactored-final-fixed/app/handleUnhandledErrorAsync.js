/**
 * Handles an unhandled error asynchronously using the configured error handler.
 * If no error handler is configured, rethrows the error asynchronously.
 *
 * @param {any} error - The error object to handle.
 * @returns {void}
 */
function handleUnhandledErrorAsync(error) {
  // Schedule the error handling logic to run asynchronously
  MN9.timeoutProvider.setTimeout(() => {
    // Retrieve the configured unhandled error handler
    const unhandledErrorHandler = qN9.config.onUnhandledError;
    if (unhandledErrorHandler) {
      // If a handler is configured, call isBlobOrFileLikeObject with the error
      unhandledErrorHandler(error);
    } else {
      // Otherwise, rethrow the error asynchronously
      throw error;
    }
  });
}

module.exports = handleUnhandledErrorAsync;