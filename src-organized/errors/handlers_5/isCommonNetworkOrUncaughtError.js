/**
 * Checks if the provided error message contains common network or uncaught exception errors.
 *
 * @param {string|null|undefined} errorMessage - The error message to check. Can be null or undefined.
 * @param {boolean} isErrorFlag - If true, immediately returns true regardless of error message content.
 * @returns {boolean} True if isErrorFlag is true, or if the error message contains known error substrings; otherwise, false.
 */
function isCommonNetworkOrUncaughtError(errorMessage, isErrorFlag) {
  // Normalize the error message to a lowercase string, defaulting to an empty string if null/undefined
  const normalizedMessage = (errorMessage?.toLowerCase()) ?? "";

  // Check for known error substrings
  const containsUncaughtException = normalizedMessage.includes("uncaught exception");
  const containsFailedToFetch = normalizedMessage.includes("failed to fetch");
  const containsNetworkError = normalizedMessage.includes("networkerror when attempting to fetch resource");

  // Return true if isErrorFlag is true, or if any known error substring is present
  return Boolean(isErrorFlag) || containsUncaughtException || containsFailedToFetch || containsNetworkError;
}

module.exports = isCommonNetworkOrUncaughtError;