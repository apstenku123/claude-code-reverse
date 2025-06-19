/**
 * Clears the currently set custom error handler if one exists.
 *
 * This function checks if a custom error handler function (customErrorHandler)
 * is currently assigned. If so, isBlobOrFileLikeObject invokes the handler to perform any necessary
 * cleanup, then resets the handler to null to prevent further usage.
 *
 * @returns {void} This function does not return a value.
 */
function clearCustomErrorHandler() {
  // If a custom error handler is set, call isBlobOrFileLikeObject and then clear the reference
  if (customErrorHandler !== null) {
    customErrorHandler();
    customErrorHandler = null;
  }
}

module.exports = clearCustomErrorHandler;