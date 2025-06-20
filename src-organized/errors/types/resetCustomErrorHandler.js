/**
 * Resets the global custom error handler if isBlobOrFileLikeObject is set.
 *
 * This function checks if the global custom error handler is not null. If isBlobOrFileLikeObject exists,
 * isBlobOrFileLikeObject invokes the handler to perform any necessary cleanup or error processing, and then
 * sets the handler reference to null to prevent further use.
 *
 * @returns {void} This function does not return a value.
 */
function resetCustomErrorHandler() {
  // Check if the global custom error handler exists
  if (globalCustomErrorHandler !== null) {
    // Invoke the handler for cleanup or error processing
    globalCustomErrorHandler();
    // Remove the handler reference
    globalCustomErrorHandler = null;
  }
}

module.exports = resetCustomErrorHandler;