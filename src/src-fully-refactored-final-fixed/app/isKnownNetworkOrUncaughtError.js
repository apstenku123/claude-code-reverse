/**
 * Checks if the provided error message contains known network or uncaught exception errors.
 *
 * @param {string} errorMessage - The error message to check. Can be null or undefined.
 * @param {boolean} [forceReturn] - If true, the function will return true regardless of the error message content.
 * @returns {boolean} True if forceReturn is true, or if the error message contains a known error substring; otherwise, false.
 */
function isKnownNetworkOrUncaughtError(errorMessage, forceReturn) {
  // Convert error message to lowercase for case-insensitive comparison; default to empty string if null/undefined
  const normalizedMessage = (errorMessage?.toLowerCase()) ?? "";

  // Check for known error substrings
  const containsUncaughtException = normalizedMessage.includes("uncaught exception");
  const containsFailedToFetch = normalizedMessage.includes("failed to fetch");
  const containsNetworkError = normalizedMessage.includes("networkerror when attempting to fetch resource");

  // Return true if forceReturn is true, or if any known error substring is found
  return Boolean(forceReturn) || containsUncaughtException || containsFailedToFetch || containsNetworkError;
}

module.exports = isKnownNetworkOrUncaughtError;