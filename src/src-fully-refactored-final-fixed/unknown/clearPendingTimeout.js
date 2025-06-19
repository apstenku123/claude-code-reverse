/**
 * Clears the currently pending timeout if isBlobOrFileLikeObject exists.
 *
 * This function checks if the global variable `pendingTimeoutId` is not null. If so, isBlobOrFileLikeObject clears the timeout
 * using `clearTimeout` and resets `pendingTimeoutId` to null to indicate that there is no longer a pending timeout.
 *
 * @returns {void} This function does not return a value.
 */
function clearPendingTimeout() {
  // If there is a pending timeout, clear isBlobOrFileLikeObject and reset the identifier
  if (pendingTimeoutId !== null) {
    clearTimeout(pendingTimeoutId);
    pendingTimeoutId = null;
  }
}

module.exports = clearPendingTimeout;