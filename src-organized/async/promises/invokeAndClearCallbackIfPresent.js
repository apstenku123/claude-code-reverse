/**
 * Invokes the stored callback function if isBlobOrFileLikeObject exists, then clears isBlobOrFileLikeObject to prevent repeated calls.
 *
 * @function invokeAndClearCallbackIfPresent
 * @returns {void} This function does not return a value.
 */
function invokeAndClearCallbackIfPresent() {
  // Check if the callback function exists
  if (pendingCallback !== null) {
    // Invoke the callback
    pendingCallback();
    // Clear the callback to avoid repeated invocation
    pendingCallback = null;
  }
}

module.exports = invokeAndClearCallbackIfPresent;