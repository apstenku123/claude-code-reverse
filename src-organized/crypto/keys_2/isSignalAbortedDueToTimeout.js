/**
 * Checks if the provided object has an aborted signal due to a timeout.
 *
 * @param {Object} sourceObject - The object that may contain an AbortSignal.
 * @returns {boolean} True if the signal is aborted and the reason includes 'Timeout', otherwise false.
 */
function isSignalAbortedDueToTimeout(sourceObject) {
  // Check if sourceObject exists and has a signal property that is aborted
  if (sourceObject?.signal?.aborted) {
    // Ensure the reason is a string and contains 'Timeout'
    return (
      typeof sourceObject.signal.reason === "string" &&
      sourceObject.signal.reason.includes("Timeout")
    );
  }
  return false;
}

module.exports = isSignalAbortedDueToTimeout;