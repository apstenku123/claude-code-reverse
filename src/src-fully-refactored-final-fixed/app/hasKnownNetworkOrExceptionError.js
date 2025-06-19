/**
 * Checks if the provided error message contains known network or exception error phrases.
 *
 * @param {string} errorMessage - The error message to inspect. Can be null or undefined.
 * @param {boolean} isErrorFlagged - Optional flag indicating if the error is already known/flagged.
 * @returns {boolean} True if the error is flagged, or if the error message contains known error phrases; otherwise, false.
 */
function hasKnownNetworkOrExceptionError(errorMessage, isErrorFlagged) {
  // Safely convert errorMessage to lowercase string, defaulting to empty string if null/undefined
  const normalizedMessage = (errorMessage?.toLowerCase()) ?? "";

  // Check for known error phrases in the message
  const containsUncaughtException = normalizedMessage.includes("uncaught exception");
  const containsFailedToFetch = normalizedMessage.includes("failed to fetch");
  const containsNetworkError = normalizedMessage.includes("networkerror when attempting to fetch resource");

  // Return true if already flagged, or if any known error phrase is present
  return Boolean(isErrorFlagged || containsUncaughtException || containsFailedToFetch || containsNetworkError);
}

module.exports = hasKnownNetworkOrExceptionError;