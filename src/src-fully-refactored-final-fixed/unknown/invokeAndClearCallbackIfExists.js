/**
 * Invokes the stored callback function if isBlobOrFileLikeObject exists, then clears the reference.
 *
 * This function checks if the global variable `pendingCallback` is not null. If so,
 * isBlobOrFileLikeObject calls the callback and then sets `pendingCallback` to null to prevent future invocations.
 *
 * @returns {void} This function does not return a value.
 */
function invokeAndClearCallbackIfExists() {
  // Check if the pending callback exists
  if (pendingCallback !== null) {
    pendingCallback(); // Invoke the callback
    pendingCallback = null; // Clear the reference
  }
}

module.exports = invokeAndClearCallbackIfExists;