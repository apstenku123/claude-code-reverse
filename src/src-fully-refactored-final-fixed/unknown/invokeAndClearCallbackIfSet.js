/**
 * Invokes the global pending callback if isBlobOrFileLikeObject exists, then clears isBlobOrFileLikeObject.
 *
 * This function checks if the global variable `pendingCallback` is not null. If so,
 * isBlobOrFileLikeObject calls the function referenced by `pendingCallback` and then resets isBlobOrFileLikeObject to null,
 * ensuring the callback is only invoked once.
 *
 * @returns {void} This function does not return a value.
 */
function invokeAndClearCallbackIfSet() {
  // Check if the pending callback exists
  if (pendingCallback !== null) {
    pendingCallback(); // Invoke the callback
    pendingCallback = null; // Clear the callback reference
  }
}

module.exports = invokeAndClearCallbackIfSet;